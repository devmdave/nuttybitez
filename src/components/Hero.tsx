import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onNavigate?: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const handleAction = (path: string) => {
    const flavourBookElem = document.getElementById('flavour-book');
    if (flavourBookElem) {
      flavourBookElem.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-brand-dark">
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

      <div className="relative z-10 w-full mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT SIDE: Editorial Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="lg:col-span-6  space-y-6 text-center lg:text-center z-10 mt-10 lg:mt-0 lg:pl-4 xl:pl-12"
          >
            <div className="space-y-4">

              {/* Main Headline */}
              <h1 className="font-serif text-5xl sm:text-5xl lg:text-5xl xl:text-5xl font-bold text-brand-cream tracking-tight leading-[1.05]">
                Premium Munching Forever<br />

              </h1>

            </div>

            {/* Subheading */}
            <p className="text-lg sm:text-xl ml-[20%] text-brand-cream/80 text-left font-light leading-tight">

              It all started with our love for snacking. 😄 <br /><br />

              With full-time jobs, we’ve always loved trying new flavours with interesting combinations and sharing it with people around us.<br /><br />

              Then came a simple thought — “Why not create something of our own?” <br /><br />

              What started as a small idea after office hours slowly became Nutty Bitez!<br /><br />

              We carry a passion for food and a wish to make everyday snacking a little more exciting. <br /><br />

              We began experimenting with flavours, getting feedback from friends and colleagues and are building it one step at a time! <br /><br />

              Today, every Nutty Bitez jar carries a little piece of that journey. ❤️<br /><br />

              And we’re just getting started. ✨
            </p>

            {/* CTAs */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center  gap-4">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => handleAction('/shop')}
                aria-label="Explore Our Products - Open the Flavour Book"
                className="relative group w-full sm:w-auto px-10 py-4 text-xs sm:text-sm uppercase font-bold text-brand-dark rounded-full shadow-gold-glow overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-goldLight focus:ring-offset-2 focus:ring-offset-brand-dark"
              >
                {/* Gold Base Layer */}
                <div className="absolute inset-0 bg-gold-gradient transition-all duration-300 group-hover:brightness-110" />

                {/* Expanding Outer Ring on Hover */}
                <div className="absolute -inset-1 rounded-full border border-brand-goldLight/70 opacity-0 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-500 ease-out pointer-events-none" />

                {/* Shimmer / Gold Highlight Sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                {/* Content Container */}
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {/* Morphing Text Container */}
                  <div className="relative h-5 overflow-hidden flex items-center justify-center min-w-[200px] sm:min-w-[220px]">
                    <span className="block text-center transition-all duration-300 ease-out transform group-hover:-translate-y-7 group-hover:opacity-0 font-bold tracking-[0.2em] whitespace-nowrap">
                      EXPLORE OUR PRODUCTS
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center text-center transition-all duration-300 ease-out transform translate-y-7 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 font-bold tracking-[0.18em] whitespace-nowrap">
                      OPEN THE FLAVOUR BOOK
                    </span>
                  </div>

                  {/* Icon */}
                  <ArrowRight className="w-4 h-4 text-brand-dark group-hover:translate-x-1.5 transition-transform duration-300 ease-out flex-shrink-0" />
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Floating Product Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-6 relative z-10 mt-8 lg:mt-0"
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
                className="w-11/12 mx-auto h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] filter contrast-105"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

