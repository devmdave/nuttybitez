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

      <div className="relative z-10 w-full px-4 sm:px-8 lg:pl-[16vw] lg:pr-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-32 lg:pt-0">

          {/* LEFT SIDE: Editorial Content (moved left, wider) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="w-full lg:w-[45%] space-y-8 text-left z-10"
          >
            <div className="space-y-2">
              {/* Main Headline */}
              <h1 className="font-parisienne leading-[1.05] tracking-tight whitespace-nowrap">
                <span className="text-[8vw] sm:text-[6vw] lg:text-[3.25vw] xl:text-[3.5vw] font-normal text-[#E6C37A] mr-[0.3em]">
                  Premium
                </span>
                <span className="text-[8vw] sm:text-[6vw] lg:text-[3.25vw] xl:text-[3.5vw] font-normal text-[#E6C37A]">
                  Munching Forever
                </span>
              </h1>
              {/* Decorative line below headline */}
              <div className="w-64 h-[3px] bg-gradient-to-r from-brand-gold via-brand-goldLight to-transparent rounded-full mt-3 opacity-90" />
            </div>

            {/* Story / Body Copy */}
            <div className="text-[1rem] sm:text-[1.05rem] lg:text-[1.125rem] text-brand-ivory/85 font-light leading-[1.85] tracking-[0.015em] space-y-6 max-w-[50ch] text-pretty my-10">
              <p className="text-[1.1rem] sm:text-[1.15rem] lg:text-[1.25rem] text-brand-ivory font-normal tracking-[0.03em] pb-1">
                It all started with our love for snacking. <img src="/assets/happy.png" alt="Happy" className="inline-block h-[1.4em] w-auto align-[-0.25em] object-contain" />
              </p>
              
              <p>With full-time jobs, we’ve always loved trying new flavours with interesting combinations and sharing it with people around us.</p>
              
              <p>Then came a simple thought — "Why not create something of our own?"</p>
              
              <p>What started as a small idea after office hours slowly became Nutty Bitez!</p>
              
              <p>We carry a passion for food and a wish to make everyday snacking a little more exciting.</p>
              
              <p>We began experimenting with flavours, getting feedback from friends and colleagues and are building it one step at a time!</p>
              
              <p>Today, every Nutty Bitez jar carries a little piece of that journey. <img src="/assets/heart.png" alt="Heart" className="inline-block h-[1.4em] w-auto align-[-0.25em] object-contain" /></p>
              
              <p className="text-[1.1rem] sm:text-[1.15rem] lg:text-[1.25rem] text-[#E6C37A] font-normal tracking-[0.03em] pt-1">
                And we’re just getting started. <img src="/assets/star.png" alt="Sparkles" className="inline-block h-[1.4em] w-auto align-[-0.25em] object-contain" />
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => handleAction('/shop')}
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#E6C37A] hover:bg-[#F3D79A] text-black font-bold text-[14px] tracking-[0.15em] uppercase rounded-full transition-all shadow-[0_0_25px_rgba(230,195,122,0.3)] hover:shadow-[0_0_35px_rgba(230,195,122,0.45)]"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Floating Product Composition (Significantly Larger) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="w-full lg:w-[55%] relative z-10 mt-12 lg:mt-0 flex justify-end"
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-[120%] lg:w-[130%] right-[0%] lg:right-[4%] xl:right-[2%] flex justify-center items-center"
            >
              {/* Atmospheric Backglows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-brand-gold/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
              
              {/* Main Floating Composition (Scaled Up) */}
              <img
                src="/assets/hero_section_right_image.png"
                alt="NuttyBitez Premium Dragees - Floating Jars Composition"
                className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] filter contrast-[1.05] brightness-105"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

