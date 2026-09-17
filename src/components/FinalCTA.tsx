import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';

interface FinalCTAProps {
  onNavigate?: (path: string) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onNavigate }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/shop');
    } else {
      window.location.hash = '/shop';
    }
  };

  return (
    <section className="py-28 bg-gradient-to-b from-brand-espresso via-brand-dark to-[#120906] relative overflow-hidden text-center border-t border-brand-gold/30">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Product Packaging Image Showcase */}
        <div className="relative w-36 h-36 mx-auto rounded-full p-1 bg-gradient-to-br from-brand-gold via-brand-roast to-brand-gold shadow-gold-glow overflow-hidden">
          <img
            src="/assets/logo.jpeg"
            alt="NuttyBitez Brand Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-goldLight block">
            INDULGE TODAY
          </span>
          <h2 className="font-serif text-4xl sm:text-7xl font-bold text-brand-cream leading-tight">
            WHICH FLAVOUR ARE YOU <br />
            <span className="text-gold-gradient italic font-normal">CRAVING?</span>
          </h2>
          <p className="text-brand-cream/80 text-lg font-light max-w-xl mx-auto">
            Discover your next favourite bite. Handcrafted almond dragées and spicy peri-peri cashews delivered fresh to your doorstep.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/shop"
            onClick={handleClick}
            className="w-full sm:w-auto px-10 py-5 text-xs uppercase tracking-[0.2em] font-bold text-brand-dark bg-gold-gradient rounded-full shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-3 transition-transform transform hover:scale-105"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <p className="text-[11px] text-brand-cream/50 uppercase tracking-widest pt-6">
          Introductory Founder's Price: ₹149 / 100g Jar • 100% Pure Veg
        </p>

      </div>
    </section>
  );
};
