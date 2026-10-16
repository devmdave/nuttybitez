import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';
import type { IncomingMessage, ServerResponse } from 'http';

// ─── Dev-only plugin: serves /api/contact without a separate Vercel CLI process
// api/contact.js is loaded as an ES module via import — zero duplication.
// On Vercel production the file is used directly; this plugin only activates during
// `npm run dev` (apply: 'serve').
function apiContactDevPlugin(): Plugin {
  return {
    name: 'api-contact-dev',
    apply: 'serve',

    configureServer(server) {
      // Load .env into process.env once, before any request arrives.
      // dotenv is a devDependency; it is never bundled into the client.
      dotenv.config();                  // reads .env from cwd

      server.middlewares.use(
        '/api/contact',
        (req: IncomingMessage, res: ServerResponse) => {
          // Accumulate the raw body (Vite gives us a plain Node HTTP request)
          const chunks: Buffer[] = [];
          req.on('data', (chunk: Buffer) => chunks.push(chunk));
          req.on('end', async () => {
            try {
              // Parse JSON body
              const raw = Buffer.concat(chunks).toString('utf8');
              let parsed: Record<string, unknown> = {};
              try { parsed = raw ? JSON.parse(raw) : {}; } catch { /* invalid json handled by handler */ }

              // ── Minimal Express-compatible req shim ────────────────────────
              const reqShim = {
                method:  req.method,
                headers: req.headers,
                body:    parsed,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                socket:  { remoteAddress: (req.socket as any)?.remoteAddress },
              };

              // ── Minimal Express-compatible res shim ────────────────────────
              let statusCode = 200;
              const resShim = {
                status(code: number) { statusCode = code; return resShim; },
                setHeader(name: string, value: string) {
                  res.setHeader(name, value);
                  return resShim;
                },
                json(data: unknown) {
                  if (!res.headersSent) {
                    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
                  }
                  res.end(JSON.stringify(data));
                },
                end() {
                  if (!res.headersSent) res.writeHead(statusCode);
                  res.end();
                },
              };

              // ── Delegate to api/contact.js (ES module handler) ────────────
              const { default: handler } = await import('./api/contact.js');
              await handler(reqShim, resShim);

            } catch (err: unknown) {
              const msg = err instanceof Error ? err.message : String(err);
              console.error('[api-contact-dev]', msg);
              if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
              }
              res.end(JSON.stringify({ error: 'Internal server error.' }));
            }
          });
        },
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    apiContactDevPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
