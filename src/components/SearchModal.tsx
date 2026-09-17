import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useSearch();
  const { addToCart, setQuickViewProduct } = useCart();

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.flavour.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tasteNotes.some((t) => t.toLowerCase().includes(q)) ||
      p.ingredients.some((i) => i.toLowerCase().includes(q))
    );
  });

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-dark/95 backdrop-blur-xl p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-brand-gold/30">
            <div className="flex items-center gap-3">
              <Search className="w-6 h-6 text-brand-goldLight" />
              <span className="font-serif text-2xl font-bold text-brand-cream">
                Search NuttyBitez Products
              </span>
            </div>
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
              className="p-2 rounded-full hover:bg-brand-roast text-brand-cream/70 hover:text-brand-cream"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Input */}
          <div className="py-8">
            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Search by flavour, ingredient (e.g. Paan, Coffee, Peri Peri, Cashews)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-brand-espresso border-2 border-brand-gold/40 text-lg font-serif text-brand-cream placeholder:font-sans placeholder:text-sm placeholder:text-brand-cream/40 focus:outline-none focus:border-brand-gold shadow-2xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs uppercase tracking-widest text-brand-goldLight"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-xs text-brand-cream/60 py-1">Popular searches:</span>
            {['Paan Shot', 'Coffee Tiramisu', 'Peri Peri', 'Cashews', 'White Chocolate'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-3 py-1 rounded-full text-xs bg-brand-espresso border border-brand-gold/20 text-brand-goldLight hover:bg-brand-roast transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Results Grid */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-cream/50 block">
              {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''} Found
            </span>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 text-brand-cream/60 space-y-2">
                <p className="font-serif text-2xl font-light">No flavours match your search.</p>
                <p className="text-xs">Try searching for "Paan", "Cashews", or "Dragées".</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 rounded-2xl bg-brand-espresso/90 border border-brand-gold/20 hover:border-brand-gold/40 transition-all flex gap-4 items-center group"
                  >
                    <img
                      src={product.images.poster}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-xl border border-brand-gold/30"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-brand-gold block">
                        {product.category}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-brand-cream truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-brand-cream/70 line-clamp-1">
                        {product.flavour}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-serif text-base font-bold text-brand-goldLight">
                          ₹{product.price}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setIsSearchOpen(false);
                              setQuickViewProduct(product);
                            }}
                            className="text-[11px] uppercase tracking-wider text-brand-cream/80 hover:text-brand-gold underline"
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => {
                              addToCart(product, 1);
                              setIsSearchOpen(false);
                            }}
                            className="px-3 py-1 rounded-full text-[10px] uppercase font-bold text-brand-dark bg-gold-gradient"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </AnimatePresence>
  );
};
