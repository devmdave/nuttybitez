import React from 'react';
import { Instagram, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
    }
  };

  return (
    <footer className="bg-brand-dark text-brand-cream border-t border-brand-gold/30 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-brand-gold/15">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-br from-brand-gold to-brand-roast">
                <img
                  src="/assets/logo.jpeg"
                  alt="NuttyBitez Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-gold-gradient">
                  NuttyBitez
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-brand-goldLight">
                  PREMIUM MUNCHING FOREVER
                </span>
              </div>
            </div>

            <p className="text-brand-cream/70 text-xs leading-relaxed max-w-sm font-light">
              Crafting premium flavoured nuts and artisanal dragées. Slow-roasted California almonds, single-origin cacao, and authentic Indian flavour traditions.
            </p>

            <div className="flex items-center gap-3 text-xs text-brand-cream/80">
              <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-[10px] text-emerald-400 font-bold">
                🟢
              </span>
              <span>100% Pure Vegetarian Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-base font-bold text-brand-goldLight tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-cream/70 font-light">
              <li>
                <a href="/" onClick={(e) => handleNavClick('/', e)} className="hover:text-brand-gold transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/#flavour-book" onClick={(e) => handleNavClick('/#flavour-book', e)} className="hover:text-brand-gold transition-colors">
                  Our Products
                </a>
              </li>
              <li>
                <a href="/our-story" onClick={(e) => handleNavClick('/our-story', e)} className="hover:text-brand-gold transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleNavClick('/contact', e)} className="hover:text-brand-gold transition-colors">
                  Contact & Bulk Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif text-base font-bold text-brand-goldLight tracking-wider uppercase">
              Connect & Order
            </h4>
            <ul className="space-y-3 text-xs text-brand-cream/80 font-light">
              <li className="flex items-center gap-3">
                <Instagram className="w-4 h-4 text-brand-gold" />
                <a href="https://instagram.com/nuttybitez" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  @nuttybitez
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <a href="https://wa.me/918488971879" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  WhatsApp: +91 8488971879
                </a>
              </li>
            </ul>

            {/* Newsletter Box */}
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-widest text-brand-goldLight block mb-2">
                Join NuttyBitez Flavour Club
              </span>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded-full bg-brand-espresso border border-brand-gold/30 text-xs text-brand-cream placeholder:text-brand-cream/40 focus:outline-none focus:border-brand-gold"
                />
                <button
                  type="submit"
                  className="p-2 rounded-full bg-gold-gradient text-brand-dark hover:brightness-110"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-brand-cream/50">
          <p>© {new Date().getFullYear()} NuttyBitez. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-cream transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-cream transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-cream transition-colors">Shipping & Returns</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
