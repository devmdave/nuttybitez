import React from 'react';
import { ArrowLeft, Award, Sparkles, HeartHandshake } from 'lucide-react';

interface OurStoryPageProps {
  onNavigate: (path: string) => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-24 bg-brand-dark min-h-screen text-brand-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-brand-goldLight hover:text-brand-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold block">
            HERITAGE & CRAFTSMANSHIP
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl font-bold text-brand-cream">
            THE NUTTYBITEZ STORY
          </h1>
          <div className="w-16 h-[2px] bg-brand-gold mx-auto" />
          <p className="text-brand-cream/80 text-xl font-serif italic">
            "Reimagining Indian snacking through luxury dragée artistry."
          </p>
        </div>

        {/* Hero Image Spread */}
        <div className="aspect-21/9 rounded-3xl overflow-hidden border-2 border-brand-gold/40 shadow-2xl mb-16 relative bg-brand-espresso">
          <img
            src="/assets/original_theme_poster.jpeg"
            alt="NuttyBitez Founder Poster"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-70" />
        </div>

        {/* Story Body */}
        <div className="space-y-12 text-brand-cream/85 leading-relaxed font-light text-base sm:text-lg">
          
          <div className="p-8 rounded-3xl bg-brand-espresso/80 border border-brand-gold/25 space-y-4 backdrop-blur-md">
            <h3 className="font-serif text-3xl font-bold text-brand-cream">
              The Genesis of a Craft
            </h3>
            <p>
              In a world flooded with generic chocolate bars and hyper-processed salty chips, NuttyBitez was founded with a singular ambition: to elevate everyday nuts into artisanal dragée masterpieces. We believe that true indulgence comes from honest, uncompromised ingredients handled with culinary respect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-brand-espresso/60 border border-brand-gold/20 space-y-3">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-gold block">01. THE NUTS</span>
              <h4 className="font-serif text-2xl font-bold text-brand-cream">Priscilla California Almonds</h4>
              <p className="text-xs text-brand-cream/70 leading-relaxed">
                We source whole, high-grade California almonds and Mangalore cashews. Each kernel undergoes slow air-roasting to extract deep nutty essential oils without burning.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-brand-espresso/60 border border-brand-gold/20 space-y-3">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-gold block">02. THE COATINGS</span>
              <h4 className="font-serif text-2xl font-bold text-brand-cream">Indian Flavour Innovation</h4>
              <p className="text-xs text-brand-cream/70 leading-relaxed">
                Our dragée technique coats roasted nuts in micro-layers of white chocolate infused with betel leaf paan, Arabica espresso dust, 70% dark cocoa, or fiery peri-peri spices.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gold-gradient text-brand-dark space-y-4 shadow-gold-glow">
            <h3 className="font-serif text-3xl font-bold">Our Promise to You</h3>
            <p className="text-sm font-medium leading-relaxed">
              Every jar of NuttyBitez is 100% vegetarian, free from artificial hydrogenated fats, and hand-packed in airtight 100g glass containers to ensure that first crisp bite feels as fresh as our chocolate kitchen.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
