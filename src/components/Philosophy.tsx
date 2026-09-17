import React from 'react';
import { Award, Leaf, Flame, HeartHandshake } from 'lucide-react';

export const Philosophy: React.FC = () => {
  const principles = [
    {
      icon: Award,
      title: 'PREMIUM NUTS',
      desc: 'Hand-sorted jumbo California almonds and Mangalore cashews roasted to optimal crunch.'
    },
    {
      icon: Leaf,
      title: 'QUALITY INGREDIENTS',
      desc: 'Single-origin 70% cocoa, fine Arabica espresso, real betel leaves, and pink rose petals.'
    },
    {
      icon: Flame,
      title: 'BOLD FLAVOURS',
      desc: 'Uncompromising recipes that harmonally blend traditional Indian palates with modern dragée craft.'
    },
    {
      icon: HeartHandshake,
      title: 'MADE WITH CARE',
      desc: 'Crafted in small artisanal batches with zero hydrogenated fats or harsh chemical additives.'
    }
  ];

  return (
    <section className="py-24 bg-brand-espresso border-y border-brand-gold/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-goldLight block">
            THE NUTTYBITEZ STANDARDS
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-brand-cream leading-tight">
            GOOD INGREDIENTS. <br />
            <span className="text-gold-gradient italic font-normal">BOLD IDEAS.</span>
          </h2>
          <div className="w-16 h-[1px] bg-brand-gold mx-auto" />
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-brand-dark/60 border border-brand-gold/20 hover:border-brand-gold/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full border border-brand-gold/30 bg-brand-roast/50 flex items-center justify-center text-brand-goldLight mb-6 group-hover:scale-110 group-hover:bg-gold-gradient group-hover:text-brand-dark transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-cream mb-3 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-brand-cream/70 text-xs leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
