import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';

interface WhatsYourFlavourProps {
  onNavigate?: (path: string) => void;
}

const moodCategories = [
  {
    id: 'RICH & INDULGENT',
    title: 'Rich & Indulgent',
    subtitle: 'Decadent milk chocolate and 70% dark cocoa dragées.',
    bgColor: 'from-[#2A160F] to-[#1A0E0A]',
    accentHex: '#C79A4A',
    productId: 'choco-crunch'
  },
  {
    id: 'COFFEE LOVERS',
    title: 'Coffee Lovers',
    subtitle: 'Smooth tiramisu cream and Arabica coffee dust.',
    bgColor: 'from-[#24150F] to-[#160B06]',
    accentHex: '#D8B36A',
    productId: 'coffee-tiramisu'
  },
  {
    id: 'FRESH & AROMATIC',
    title: 'Fresh & Aromatic',
    subtitle: 'Royal betel paan, pink rose petals & sweet fennel.',
    bgColor: 'from-[#1A2911] to-[#0D1608]',
    accentHex: '#4A5A20',
    productId: 'paan-shot'
  },
  {
    id: 'BOLD & SPICY',
    title: 'Bold & Spicy',
    subtitle: 'Roasted cashews tossed in fiery birdseye peri-peri.',
    bgColor: 'from-[#2C1008] to-[#180703]',
    accentHex: '#E84B16',
    productId: 'peri-peri-cashew'
  }
];

export const WhatsYourFlavour: React.FC<WhatsYourFlavourProps> = ({ onNavigate }) => {
  const [selectedMood, setSelectedMood] = useState(moodCategories[0]);
  const { addToCart, setQuickViewProduct } = useCart();

  const activeProduct: Product = products.find(p => p.id === selectedMood.productId) || products[0];

  return (
    <section className="py-24 bg-brand-dark relative transition-colors duration-700 overflow-hidden">
      
      {/* Dynamic Background Atmosphere */}
      <div className={`absolute inset-0 bg-gradient-to-b ${selectedMood.bgColor} opacity-90 transition-all duration-700 pointer-events-none`} />
      <div className="absolute inset-0 bg-dark-paper opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-brand-gold/30 bg-brand-espresso/80 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-goldLight" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-goldLight">
              Interactive Flavour Finder
            </span>
          </div>
          
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-brand-cream tracking-tight">
            WHAT'S YOUR FLAVOUR?
          </h2>
          <p className="text-brand-cream/80 text-lg font-light">
            Find the craving that matches your mood today.
          </p>
        </div>

        {/* Mood Category Switcher Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {moodCategories.map((mood) => {
            const isActive = mood.id === selectedMood.id;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood)}
                className={`p-5 rounded-2xl text-left border transition-all duration-500 relative overflow-hidden group ${
                  isActive
                    ? 'border-brand-gold bg-brand-espresso/90 shadow-gold-glow scale-102'
                    : 'border-brand-gold/20 bg-brand-espresso/40 hover:bg-brand-espresso/70 hover:border-brand-gold/40'
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full mb-3 transition-transform duration-300 group-hover:scale-125"
                  style={{ backgroundColor: mood.accentHex }}
                />
                <span className="text-xs uppercase tracking-widest font-bold text-brand-cream block">
                  {mood.title}
                </span>
                <p className="text-[11px] text-brand-cream/60 mt-1 line-clamp-2">
                  {mood.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Product Showcase Card */}
        <div className="relative rounded-3xl p-8 sm:p-12 border border-brand-gold/30 bg-brand-espresso/80 backdrop-blur-md shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Product Imagery */}
              <div className="lg:col-span-6 relative">
                <div className="aspect-square rounded-2xl overflow-hidden border border-brand-gold/30 shadow-luxury bg-brand-dark">
                  <img
                    src={activeProduct.images.poster}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover img-zoom"
                  />
                </div>
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase font-bold text-brand-dark shadow-md"
                  style={{ backgroundColor: selectedMood.accentHex }}
                >
                  Matched for {selectedMood.title}
                </div>
              </div>

              {/* Product Info & Action */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-goldLight block mb-1">
                    {activeProduct.flavour}
                  </span>
                  <h3 className="font-serif text-4xl sm:text-5xl font-bold text-brand-cream">
                    {activeProduct.name}
                  </h3>
                  <p className="font-serif italic text-xl text-brand-goldLight/90 mt-1">
                    "{activeProduct.tagline}"
                  </p>
                </div>

                <p className="text-brand-cream/80 text-sm leading-relaxed">
                  {activeProduct.description}
                </p>

                {/* Taste Profile Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeProduct.tasteNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs bg-brand-dark/60 border border-brand-gold/20 text-brand-cream/90"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                {/* Pricing & CTA */}
                <div className="pt-6 border-t border-brand-gold/20 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-brand-cream/60 block">Price / Jar (100g)</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-3xl font-bold text-brand-goldLight">₹{activeProduct.price}</span>
                      <span className="text-sm line-through text-brand-cream/40">₹{activeProduct.originalPrice}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuickViewProduct(activeProduct)}
                      className="px-4 py-3 rounded-full border border-brand-gold/30 text-xs uppercase tracking-widest font-semibold text-brand-cream hover:bg-brand-roast/40 transition-colors"
                    >
                      Quick View
                    </button>
                    <button
                      onClick={() => addToCart(activeProduct, 1)}
                      className="px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold text-brand-dark bg-gold-gradient shadow-gold-glow hover:brightness-110 flex items-center gap-2 transition-transform transform hover:scale-105"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
