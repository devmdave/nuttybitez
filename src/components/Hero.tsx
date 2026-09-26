import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onNavigate?: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const handleAction = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background Cinematic Food Photography Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero_ingredients_bg_1789677986247.png"
          alt="Luxury ingredients roasted almonds chocolate cocoa coffee"
          className="w-full h-full object-cover object-center opacity-35 scale-105 filter contrast-125"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/80" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
      </div>

      {/* Floating Decorative Gold Foil Accents */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-brand-gold/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-brand-spice/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Editorial Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >

            {/* Main Headline */}
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-brand-cream tracking-tight leading-[0.95]">
              CRAVE THE <br />
              <span className="text-gold-gradient italic font-normal">CRUNCH.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-brand-cream/80 max-w-2xl font-light leading-relaxed">
              Premium nuts. Bold flavours. Made to be remembered. Handcrafted with slow-roasted California almonds, single-origin cacao, and royal Indian botanicals.
            </p>

            {/* Founder's Offer Banner */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-brand-roast/60 border border-brand-gold/20 text-xs text-brand-cream/90">
              <span className="px-2 py-0.5 rounded bg-brand-gold text-brand-dark font-bold text-[10px] uppercase tracking-wider">
                Founder's Offer
              </span>
              <span>All 100g Jars at introductory price of <strong className="text-brand-goldLight text-sm font-serif">₹149</strong></span>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => handleAction('/shop')}
                className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold text-brand-dark bg-gold-gradient rounded-full shadow-gold-glow hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleAction('/our-story')}
                className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold text-brand-cream border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-roast/40 rounded-full transition-all duration-300"
              >
                Our Story
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex items-center justify-center lg:justify-start gap-8 border-t border-brand-gold/15 text-xs text-brand-cream/60">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-goldLight" />
                <span>100% Pure Vegetarian</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                <span>Zero Artificial Colors</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                <span>Fresh Small Batches</span>
              </div>
            </div>
          </motion.div>

          {/* Right Product Showcase Hero Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Gold Rim Backdrop Card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-espresso to-brand-roast rounded-3xl transform rotate-3 scale-98 border border-brand-gold/30 shadow-luxury" />

              {/* Product Hero Container */}
              <div className="relative bg-brand-espresso/90 border border-brand-gold/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl overflow-hidden group">

                {/* Product Packaging Image */}
                <div className="relative z-10 aspect-square w-full rounded-2xl overflow-hidden shadow-inner bg-brand-dark">
                  <img
                    src="/assets/all_packagings.jpeg"
                    alt="NuttyBitez Dragée Collection Jars"
                    className="w-full h-full object-cover img-zoom"
                  />

                  {/* Floating Flavour Badges */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-brand-dark/90 border border-brand-gold/40 rounded-full text-[10px] font-semibold text-brand-goldLight tracking-wider uppercase backdrop-blur-md">
                    4 Signature Flavours
                  </div>
                </div>

                {/* Floating Highlight Pill */}
                <div className="mt-5 p-4 rounded-xl bg-brand-dark/80 border border-brand-gold/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-brand-goldLight font-medium block">
                      Featured Dragée
                    </span>
                    <h3 className="font-serif text-lg font-bold text-brand-cream">
                      Paan Shot & Coffee Tiramisu
                    </h3>
                  </div>
                  <span className="font-serif text-xl font-bold text-brand-goldLight">
                    ₹149 <span className="text-xs line-through text-brand-cream/40 font-sans">₹199</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
