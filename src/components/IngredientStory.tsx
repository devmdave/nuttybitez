import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'THE WHOLE NUT',
    subTitle: 'California Almonds & Mangalore Cashews',
    desc: 'Only top-grade whole kernels are selected. Slow-roasted in small batches to unleash maximum aroma and pristine crunch.',
    image: '/assets/hero_ingredients_bg_1789677986247.png'
  },
  {
    step: '02',
    title: 'THE ARTISANAL COATING',
    subTitle: 'Infused Chocolates & Spice Dusting',
    desc: 'Layered meticulously with single-origin cocoa, sweet betel paan botanicals, espresso coffee dust, or fiery peri-peri spices.',
    image: '/assets/paan_ingredients_1789678003258.png'
  },
  {
    step: '03',
    title: 'THE NUTTYBITEZ DRAGÉE',
    subTitle: 'Sealed Fresh in 100g Glass Jars',
    desc: 'Packaged immediately into dark-cap airtight containers to preserve freshness, aroma, and signature crisp texture.',
    image: '/assets/all_packagings.jpeg'
  }
];

export const IngredientStory: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep];

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      
      {/* Subtle Texture */}
      <div className="absolute inset-0 opacity-10 bg-dark-paper pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-brand-gold/30 bg-brand-espresso">
            <Sparkles className="w-3.5 h-3.5 text-brand-goldLight" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-goldLight">
              Craftsmanship & Journey
            </span>
          </div>
          
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-brand-cream">
            IT STARTS WITH THE NUT.
          </h2>
          <p className="text-brand-cream/70 text-lg font-light">
            From raw natural harvest to signature dragée indulgence.
          </p>
        </div>

        {/* Step Tabs Indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((item, idx) => {
            const isActive = idx === activeStep;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`px-6 py-3 rounded-full text-xs uppercase tracking-[0.15em] font-bold transition-all duration-300 flex items-center gap-3 ${
                  isActive
                    ? 'bg-gold-gradient text-brand-dark shadow-gold-glow scale-105'
                    : 'bg-brand-espresso border border-brand-gold/20 text-brand-cream/60 hover:text-brand-cream'
                }`}
              >
                <span>{item.step}</span>
                <span className="hidden sm:inline">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Story Interactive Transformation Spread */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-brand-espresso/80 border border-brand-gold/30 p-8 sm:p-12 backdrop-blur-md shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Macro Photography Frame */}
              <div className="lg:col-span-6 relative aspect-4/3 rounded-2xl overflow-hidden border border-brand-gold/30 shadow-luxury bg-brand-dark">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-brand-dark/90 border border-brand-gold/40 flex items-center justify-center font-serif text-lg font-bold text-brand-goldLight">
                  {current.step}
                </div>
              </div>

              {/* Story Content */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] font-bold text-brand-goldLight block mb-1">
                    {current.subTitle}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream">
                    {current.title}
                  </h3>
                </div>

                <p className="text-brand-cream/80 text-base leading-relaxed font-light">
                  {current.desc}
                </p>

                <div className="pt-4 border-t border-brand-gold/20 flex items-center justify-between">
                  <span className="text-xs text-brand-goldLight/80 font-serif italic">
                    Stage {activeStep + 1} of 3
                  </span>

                  {activeStep < steps.length - 1 ? (
                    <button
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="px-5 py-2.5 rounded-full border border-brand-gold/30 text-xs uppercase tracking-widest font-semibold text-brand-cream hover:bg-brand-roast flex items-center gap-2 transition-colors"
                    >
                      <span>Next Process</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <a
                      href="/shop"
                      className="px-5 py-2.5 rounded-full bg-gold-gradient text-brand-dark text-xs uppercase tracking-widest font-bold shadow-md hover:brightness-110 flex items-center gap-2"
                    >
                      <span>Explore Finished Jars</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
