import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Check, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
    setQuantity(1);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-brand-dark/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="relative max-w-3xl w-full bg-brand-espresso border border-brand-gold/30 rounded-3xl p-6 sm:p-8 text-brand-cream shadow-2xl z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-brand-roast text-brand-cream/70 hover:text-brand-cream z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Image */}
            <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-brand-gold/30 shadow-luxury bg-brand-dark">
              <img
                src={quickViewProduct.images.poster}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-gold block">
                  {quickViewProduct.category} • {quickViewProduct.weight}
                </span>
                <h3 className="font-serif text-3xl font-bold text-brand-cream mt-1">
                  {quickViewProduct.name}
                </h3>
                <p className="font-serif italic text-sm text-brand-goldLight">
                  {quickViewProduct.flavour}
                </p>
              </div>

              <p className="text-xs text-brand-cream/80 leading-relaxed font-light">
                {quickViewProduct.description}
              </p>

              {/* Taste Notes */}
              <div className="flex flex-wrap gap-2 pt-1">
                {quickViewProduct.tasteNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-brand-dark border border-brand-gold/20 text-brand-goldLight"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Ingredients */}
              <div className="pt-2">
                <span className="text-[10px] uppercase tracking-widest text-brand-cream/60 block mb-1">
                  Ingredients
                </span>
                <p className="text-[11px] text-brand-cream/70">
                  {quickViewProduct.ingredients.join(', ')}
                </p>
              </div>

              {/* Price & Quantity Adder */}
              <div className="pt-4 border-t border-brand-gold/20 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-cream/60 block">Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-brand-goldLight">
                      ₹{quickViewProduct.price * quantity}
                    </span>
                    <span className="text-xs line-through text-brand-cream/40">
                      ₹{quickViewProduct.originalPrice * quantity}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-roast border border-brand-gold/30 text-xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="hover:text-brand-gold"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-4 text-center font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="hover:text-brand-gold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold text-brand-dark bg-gold-gradient shadow-gold-glow hover:brightness-110 flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
