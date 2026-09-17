import React from 'react';
import { ArrowRight } from 'lucide-react';

interface OurStorySectionProps {
  onNavigate?: (path: string) => void;
}

export const OurStorySection: React.FC<OurStorySectionProps> = ({ onNavigate }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/our-story');
    } else {
      window.location.hash = '/our-story';
    }
  };

  return (
    <section className="py-24 bg-paper-texture text-brand-espresso relative overflow-hidden">
      
      {/* Decorative Gold Frame Borders */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Photo Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden border-4 border-brand-gold/40 shadow-2xl bg-brand-dark group">
              <img
                src="/assets/original_theme_poster.jpeg"
                alt="NuttyBitez Brand Heritage Poster"
                className="w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent opacity-50" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-brand-dark/90 border border-brand-gold/30 text-brand-cream backdrop-blur-md">
                <p className="font-serif italic text-lg text-brand-goldLight">
                  "Four Flavours. Endless Indulgence."
                </p>
                <span className="text-[10px] uppercase tracking-widest text-brand-cream/60 mt-1 block">
                  Artisanal Dragée Collection
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold block">
                OUR PHILOSOPHY
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold text-brand-roast leading-tight">
                MORE THAN A <br />
                <span className="italic text-brand-gold font-normal">SNACK.</span>
              </h2>
            </div>

            <p className="text-brand-roast/80 text-base leading-relaxed font-sans">
              NuttyBitez was born out of a simple, obsessive desire: to transform ordinary everyday snacking into an extraordinary sensory experience. We combined high-grade California almonds and Mangalore cashews with rich chocolates and nostalgic Indian flavour profiles.
            </p>

            <p className="text-brand-roast/80 text-base leading-relaxed font-sans">
              Whether it is the refreshing after-dinner sensation of our signature <strong className="text-brand-roast font-semibold">Paan Shot</strong>, the comforting richness of <strong className="text-brand-roast font-semibold">Coffee Tiramisu</strong>, or the fiery kick of <strong className="text-brand-roast font-semibold">Peri Peri Cashews</strong>, every jar is crafted to be remembered.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-brand-roast/20 text-xs">
              <div>
                <span className="font-serif text-2xl font-bold text-brand-roast block">100g</span>
                <span className="text-brand-roast/60 uppercase tracking-wider">Airtight Glass Jars</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-brand-roast block">100%</span>
                <span className="text-brand-roast/60 uppercase tracking-wider">Vegetarian & Pure</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="/our-story"
                onClick={handleClick}
                className="inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold text-brand-cream bg-brand-roast rounded-full shadow-lg hover:bg-brand-dark transition-all duration-300 group"
              >
                <span>Read Full Brand Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
