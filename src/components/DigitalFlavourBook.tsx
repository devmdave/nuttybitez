import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Sparkles, BookOpen, Eye } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

interface DigitalFlavourBookProps {
  onNavigate?: (path: string) => void;
}

export const DigitalFlavourBook: React.FC<DigitalFlavourBookProps> = ({ onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { addToCart, setQuickViewProduct } = useCart();
  const currentProduct = products[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section id="flavour-book" className="py-24 bg-brand-dark relative overflow-hidden">
      
      {/* Background Subtle Paper Ambient Texture */}
      <div className="absolute inset-0 opacity-10 bg-dark-paper pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-brand-gold/30 bg-brand-espresso">
            <BookOpen className="w-3.5 h-3.5 text-brand-goldLight" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-goldLight">
              Digital Flavour Book Vol. I
            </span>
          </div>
          
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-brand-cream">
            OUR PRODUCTS
          </h2>
          <div className="w-16 h-[2px] bg-brand-gold mx-auto" />
          <p className="text-brand-cream/70 font-serif text-xl italic">
            "Every flavour has a story."
          </p>
        </div>

        {/* Flavour Book Tab Selector Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-6 mb-8 no-scrollbar">
          {products.map((product, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={product.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                  isSelected
                    ? 'bg-gold-gradient text-brand-dark font-bold shadow-gold-glow scale-105'
                    : 'bg-brand-espresso border border-brand-gold/20 text-brand-cream/70 hover:text-brand-cream hover:border-brand-gold/40'
                }`}
              >
                <span>0{idx + 1}.</span>
                <span>{product.name}</span>
              </button>
            );
          })}
        </div>

        {/* Book Spread Magazine Container */}
        <div className="relative max-w-5xl mx-auto bg bg-paper-texture rounded-3xl p-6 sm:p-10 lg:p-12 text-brand-espresso shadow-2xl border-4 border-brand-gold/40">
          
          {/* Gold Foil Editorial Corner Accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-brand-gold" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-brand-gold" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-brand-gold" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-brand-gold" />

          {/* Book Header Line */}
          <div className="flex items-center justify-between border-b border-brand-roast/20 pb-4 mb-8 text-xs font-serif uppercase tracking-widest text-brand-roast/70">
            <span>NUTTYBITEZ • FLAVOUR SPREAD #{activeIndex + 1}</span>
            <span>NET WEIGHT: {currentProduct.weight}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Product Artwork Spread */}
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-luxury border-2 border-brand-gold/30 bg-brand-dark group">
                  <img
                    src={currentProduct.images.poster}
                    alt={currentProduct.name}
                    className="w-full h-full object-cover img-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-60" />
                  
                  {/* Flavour Badge Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-brand-dark/90 border border-brand-gold/40 backdrop-blur-md text-brand-cream">
                    <span className="text-[10px] uppercase tracking-widest text-brand-goldLight font-bold block mb-1">
                      Taste Profile
                    </span>
                    <p className="font-serif italic text-sm text-brand-cream/90">
                      {currentProduct.tasteNotes.join(' • ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Product Description */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Product Name */}
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] font-bold text-brand-gold text-gold-gradient block mb-1">
                    {currentProduct.category}
                  </span>
                  <h3 className="font-serif text-4xl sm:text-5xl font-bold text-brand-roast tracking-tight">
                    {currentProduct.name}
                  </h3>
                  <p className="font-script text-2xl text-brand-gold mt-1">
                    {currentProduct.flavour}
                  </p>
                </div>

                {/* Description */}
                <p className="text-brand-roast/80 text-sm sm:text-base leading-relaxed font-sans font-normal">
                  {currentProduct.description}
                </p>

                {/* Ingredients & Key Features */}
                <div className="space-y-3 pt-2 border-t border-brand-roast/15">
                  <span className="text-[11px] uppercase tracking-widest font-bold text-brand-roast/70 block">
                    Key Ingredients
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentProduct.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-[11px] bg-brand-roast/10 border border-brand-roast/20 text-brand-roast font-medium"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Taste Radar Indicators */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-brand-roast/15 text-center">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-brand-roast/60 block">Crunch</span>
                    <div className="w-full bg-brand-roast/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-brand-gold h-full rounded-full" style={{ width: `${currentProduct.tasteProfile.crunch}%` }} />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-brand-roast/60 block">Richness</span>
                    <div className="w-full bg-brand-roast/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-brand-gold h-full rounded-full" style={{ width: `${currentProduct.tasteProfile.richness}%` }} />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-brand-roast/60 block">Aroma</span>
                    <div className="w-full bg-brand-roast/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-brand-gold h-full rounded-full" style={{ width: `${currentProduct.tasteProfile.aroma}%` }} />
                    </div>
                  </div>
                </div>

                {/* Pricing & Order CTAs */}
                <div className="pt-6 border-t border-brand-roast/20 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-brand-roast/60 block">Price / 100g</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-3xl font-bold text-brand-roast">₹{currentProduct.price}</span>
                      <span className="text-sm line-through text-brand-roast/40 font-sans">₹{currentProduct.originalPrice}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuickViewProduct(currentProduct)}
                      className="p-3 rounded-full border border-brand-roast/30 text-brand-roast hover:bg-brand-roast/10 transition-colors"
                      aria-label="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => addToCart(currentProduct, 1)}
                      className="px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold text-brand-dark bg-gold-gradient shadow-md hover:brightness-110 flex items-center gap-2 transition-all transform hover:scale-105"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-brand-roast/20">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-brand-roast hover:text-brand-gold transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Flavour</span>
            </button>

            <span className="font-serif text-sm font-bold text-brand-roast/60">
              PAGE {activeIndex + 1} OF {products.length}
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-brand-roast hover:text-brand-gold transition-colors"
            >
              <span>Next Flavour</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
