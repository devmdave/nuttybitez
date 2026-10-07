import React from 'react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-brand-dark border-t border-brand-gold/20 py-5 relative overflow-hidden z-20 mt-px">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-[11px] sm:text-xs text-brand-cream/50 tracking-widest font-light uppercase">
          © {new Date().getFullYear()} NuttyBitez
        </p>
        <p className="text-[10px] sm:text-[11px] text-brand-goldLight/70 font-serif italic tracking-[0.2em] uppercase">
          Premium Munching Forever
        </p>
      </div>
    </footer>
  );
};
