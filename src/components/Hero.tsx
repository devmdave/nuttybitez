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
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0503]">
      {/* Background Cinematic Food Photography Layer & Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero_ingredients_bg_1789677986247.png"
          alt="Luxury ingredients roasted almonds chocolate cocoa coffee"
          className="w-full h-full object-cover object-center opacity-10 scale-105"
        />
        {/* Richer cinematic chocolate-brown background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#140804] via-[#1a0a05]/95 to-[#331607]/80" />
        
        {/* Warm glow on the right side behind the products */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37]/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        {/* Vignette toward edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0a0503_100%)] pointer-events-none opacity-80" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 md:pl-56 lg:pl-64 xl:pl-72 2xl:pl-80 lg:pr-8 xl:pr-12 max-w-[1540px] mx-auto pt-20 pb-16 sm:py-24 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 pt-4 sm:pt-6 lg:pt-0">

          {/* LEFT SIDE: Editorial Content (order-2 on mobile, order-1 on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="w-full lg:w-[48%] space-y-5 sm:space-y-6 lg:space-y-7 text-left z-10 order-2 lg:order-1"
          >
            <div className="space-y-1.5">
              {/* Main Headline */}
              <h1 className="font-parisienne leading-[1.1] tracking-tight">
                <span className="text-[2.1rem] sm:text-[3rem] lg:text-[2.5rem] xl:text-[2.9rem] font-normal text-[#E6C37A] mr-[0.25em] inline-block">
                  Premium
                </span>
                <span className="text-[2.1rem] sm:text-[3rem] lg:text-[2.5rem] xl:text-[2.9rem] font-normal text-[#E6C37A] inline-block sm:whitespace-nowrap">
                  Munching Forever
                </span>
              </h1>
              {/* Decorative line below headline */}
              <div className="w-44 sm:w-56 h-[2.5px] bg-gradient-to-r from-brand-gold via-brand-goldLight to-transparent rounded-full mt-2.5 opacity-90" />
            </div>

            {/* Story / Body Copy */}
            <div className="text-[13.5px] sm:text-[14.5px] lg:text-[15px] text-brand-ivory/90 font-light leading-[1.65] tracking-[0.012em] space-y-3 sm:space-y-3.5 max-w-[48ch] text-pretty my-5 sm:my-6">
              <p className="text-[14.5px] sm:text-[15.5px] lg:text-[16px] text-brand-ivory font-normal tracking-[0.025em] pb-0.5">
                It all started with our love for snacking. <img src="/assets/happy.png" alt="Happy" className="inline-block h-[1.3em] w-auto align-[-0.2em] object-contain" />
              </p>
              
              <p>With full-time jobs, we’ve always loved trying new flavours with interesting combinations and sharing it with people around us.</p>
              
              <p>Then came a simple thought — "Why not create something of our own?"</p>
              
              <p>What started as a small idea after office hours slowly became <span className="font-parisienne text-[#E6C37A] text-[1.2em] align-baseline brightness-110 [text-shadow:0_0_12px_rgba(230,195,122,0.3),0_0_4px_rgba(230,195,122,0.4)]">Nutty Bitez</span>!</p>
              
              <p>We carry a passion for food and a wish to make everyday snacking a little more exciting.</p>
              
              <p>We began experimenting with flavours, getting feedback from friends and colleagues and are building it one step at a time!</p>
              
              <p>Today, every <span className="font-parisienne text-[#E6C37A] text-[1.2em] align-baseline brightness-110 [text-shadow:0_0_12px_rgba(230,195,122,0.3),0_0_4px_rgba(230,195,122,0.4)]">Nutty Bitez</span> jar carries a little piece of that journey. <img src="/assets/heart.png" alt="Heart" className="inline-block h-[1.3em] w-auto align-[-0.2em] object-contain" /></p>
              
              <p className="text-[14.5px] sm:text-[15.5px] lg:text-[16px] text-[#E6C37A] font-normal tracking-[0.025em] pt-0.5">
                And we’re just getting started. <img src="/assets/star.png" alt="Sparkles" className="inline-block h-[1.3em] w-auto align-[-0.2em] object-contain" />
              </p>
            </div>

            {/* CTA */}
            <div className="pt-1">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => handleAction('/shop')}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#E6C37A] hover:bg-[#F3D79A] text-black font-bold text-xs sm:text-[13px] tracking-[0.14em] uppercase rounded-full transition-all shadow-[0_0_20px_rgba(230,195,122,0.3)] hover:shadow-[0_0_30px_rgba(230,195,122,0.45)]"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Floating Product Composition (order-1 on mobile, order-2 on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="w-full lg:w-[52%] relative z-10 mt-2 sm:mt-4 lg:mt-0 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[550px] xl:max-w-[600px] flex justify-center items-center"
            >
              {/* Atmospheric Backglows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] bg-brand-gold/15 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none" />
              
              {/* Main Floating Composition */}
              <img
                src="/assets/hero_section_right_image.png"
                alt="NuttyBitez Premium Dragees - Floating Jars Composition"
                className="w-full h-auto max-h-[44vh] sm:max-h-[52vh] lg:max-h-[65vh] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] filter contrast-[1.05] brightness-105"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

