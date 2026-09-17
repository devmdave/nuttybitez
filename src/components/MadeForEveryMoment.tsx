import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Coffee, Car, Moon, Gift } from 'lucide-react';

const moments = [
  {
    id: 'movie-night',
    title: 'MOVIE NIGHT',
    icon: Film,
    pairing: 'Choco Crunch Dragées',
    tagline: 'Replace generic popcorn with crunchy roasted almonds wrapped in velvety chocolate.',
    image: '/assets/all_packagings.jpeg'
  },
  {
    id: 'work-break',
    title: 'WORK BREAK',
    icon: Coffee,
    pairing: 'Coffee Tiramisu Dragées',
    tagline: 'Re-energize your afternoon with Arabica coffee dust and sweet tiramisu cream.',
    image: '/assets/coffee_tiramisu_poster.jpeg'
  },
  {
    id: 'road-trip',
    title: 'ROAD TRIP',
    icon: Car,
    pairing: 'Peri Peri Cashew Snacks',
    tagline: 'Keep cravings at bay on long drives with spicy, crunchy roasted cashews.',
    image: '/assets/peri_peri_poster.jpeg'
  },
  {
    id: 'after-dinner',
    title: 'AFTER DINNER',
    icon: Moon,
    pairing: 'Paan Shot Dragées',
    tagline: 'The ultimate royal mouth-freshener dragée infused with rose and sweet betel paan.',
    image: '/assets/paan_shot_poster.jpeg'
  },
  {
    id: 'gifting',
    title: 'FESTIVE GIFTING',
    icon: Gift,
    pairing: 'Full 4-Jar Founder Set',
    tagline: 'Gift your loved ones pure indulgence packaged in handcrafted luxury jars.',
    image: '/assets/original_theme_poster.jpeg'
  }
];

export const MadeForEveryMoment: React.FC = () => {
  const [activeMoment, setActiveMoment] = useState(0);
  const current = moments[activeMoment];

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden border-t border-brand-gold/20">
      
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 bg-dark-paper pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-goldLight block">
            LIFESTYLE & OCCASIONS
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-brand-cream">
            MADE FOR EVERY MOMENT
          </h2>
          <p className="text-brand-cream/70 text-lg font-light">
            Elevating your daily routines into moments of pure indulgence.
          </p>
        </div>

        {/* Moment Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
          {moments.map((m, idx) => {
            const Icon = m.icon;
            const isActive = idx === activeMoment;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMoment(idx)}
                className={`p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center gap-3 ${
                  isActive
                    ? 'bg-gold-gradient text-brand-dark border-brand-gold shadow-gold-glow scale-105 font-bold'
                    : 'bg-brand-espresso/80 border-brand-gold/20 text-brand-cream/70 hover:text-brand-cream hover:border-brand-gold/40'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  {m.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Moment Presentation Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-brand-espresso/90 border border-brand-gold/30 p-8 sm:p-12 backdrop-blur-md shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-brand-gold/30 shadow-luxury bg-brand-dark">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover img-zoom"
                />
              </div>

              <div className="md:col-span-7 space-y-4">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold text-brand-goldLight bg-brand-roast border border-brand-gold/30 inline-block">
                  Perfect Pairing: {current.pairing}
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream">
                  {current.title}
                </h3>

                <p className="text-brand-cream/80 text-base leading-relaxed font-light">
                  {current.tagline}
                </p>

                <div className="pt-4 border-t border-brand-gold/20">
                  <a
                    href="/shop"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-brand-goldLight hover:text-brand-gold transition-colors"
                  >
                    <span>Order for your next {current.title.toLowerCase()}</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
