import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
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
          className="w-full h-full object-cover object-center opacity-25 scale-105 filter contrast-125"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-dark/90" />
        <div className="absolute inset-0 bg-radial-vignette opacity-90" />
      </div>

      {/* Floating Decorative Gold Foil Accents */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-brand-gold/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-brand-spice/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Bottom Gradient Transition to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-dark to-transparent z-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT SIDE: Editorial Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-6 text-center lg:text-left z-10 mt-10 lg:mt-0"
          >
            <div className="space-y-4">
              {/* Eyebrow */}
              <h3 className="text-brand-goldLight text-sm sm:text-base font-bold tracking-[0.3em] uppercase">
                NUTTYBITEZ
              </h3>

              {/* Main Headline */}
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-7xl font-bold text-brand-cream tracking-tight leading-[1.05]">
                THE CRAVING <br />
                <span className="text-gold-gradient italic font-normal">BEGINS.</span>
              </h1>

              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-2 mt-4 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-goldLight" />
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-brand-goldLight">
                  PREMIUM MUNCHING FOREVER
                </span>
              </div>
            </div>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-brand-cream/80 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed pt-2">
              Experience the finest hand-crafted dragees. Premium roasted nuts enveloped in bold, distinctive flavours, meticulously curated for the ultimate sensory indulgence.
            </p>

            {/* CTAs */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => handleAction('/shop')}
                className="w-full sm:w-auto px-10 py-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-brand-dark bg-gold-gradient rounded-full shadow-gold-glow hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span>EXPLORE OUR PRODUCTS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Floating Product Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-7 relative z-10 mt-8 lg:mt-0"
          >
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 0.5, -0.5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mx-auto w-full max-w-2xl lg:max-w-none flex justify-center items-center"
            >
              {/* Atmospheric Backglows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-gold/10 rounded-full blur-[80px] -z-10 mix-blend-screen pointer-events-none" />
              <div className="absolute top-1/3 right-1/4 w-3/4 h-3/4 bg-brand-spice/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none" />

              {/* Main Floating Composition */}
              <img
                src="/assets/hero_section_right_image.png"
                alt="NuttyBitez Premium Dragees - Floating Jars Composition"
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] filter contrast-105"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

