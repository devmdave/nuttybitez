import React, { useState } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Eye, Sparkles, Filter, Check } from 'lucide-react';
import { Product } from '../types/product';

interface ShopPageProps {
  onNavigate: (path: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const { addToCart, setQuickViewProduct } = useCart();

  const categories = ['All', 'Dragées', 'Spicy Snacks', 'Coffee & Dark'];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'All') return true;
    return product.category === selectedCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="pt-28 pb-24 bg-brand-dark min-h-screen text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-brand-goldLight block">
            ARTISANAL SELECTION
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl font-bold text-brand-cream">
            THE NUTTYBITEZ STORE
          </h1>
          <p className="text-brand-cream/70 text-lg font-light">
            Handcrafted almond dragées and roasted spiced cashews. Sealed fresh in signature 100g glass jars.
          </p>
        </div>

        {/* Category Tabs & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-12 border-b border-brand-gold/20">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold-gradient text-brand-dark shadow-gold-glow scale-105'
                    : 'bg-brand-espresso border border-brand-gold/20 text-brand-cream/70 hover:text-brand-cream'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-3 text-xs">
            <span className="text-brand-cream/60">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-brand-espresso border border-brand-gold/30 rounded-lg px-3 py-2 text-brand-cream focus:outline-none focus:border-brand-gold cursor-pointer"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-3xl bg-brand-espresso/80 border border-brand-gold/25 p-6 backdrop-blur-md hover:border-brand-gold/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div
                  onClick={() => onNavigate(`/product/${product.slug}`)}
                  className="relative aspect-square rounded-2xl overflow-hidden border border-brand-gold/20 bg-brand-dark mb-6 cursor-pointer"
                >
                  <img
                    src={product.images.poster}
                    alt={product.name}
                    className="w-full h-full object-cover img-zoom"
                  />
                  
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-brand-dark/90 border border-brand-gold/40 text-[10px] uppercase font-bold text-brand-goldLight backdrop-blur-md">
                    {product.weight}
                  </div>

                  <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="p-3 rounded-full bg-brand-espresso border border-brand-gold/40 text-brand-cream hover:text-brand-gold hover:scale-110 transition-transform"
                      aria-label="Quick preview"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(`/product/${product.slug}`);
                      }}
                      className="px-4 py-2.5 rounded-full bg-gold-gradient text-brand-dark text-xs uppercase font-bold hover:scale-105 transition-transform"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-brand-gold font-bold">
                    <span>{product.category}</span>
                    <span>100% Veg</span>
                  </div>

                  <h3
                    onClick={() => onNavigate(`/product/${product.slug}`)}
                    className="font-serif text-2xl font-bold text-brand-cream hover:text-brand-goldLight transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-brand-cream/70 line-clamp-2 font-light">
                    {product.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {product.tasteNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] bg-brand-dark border border-brand-gold/20 text-brand-cream/80"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer / Price & Add */}
              <div className="pt-4 border-t border-brand-gold/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-cream/50 block">Special Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-brand-goldLight">₹{product.price}</span>
                    <span className="text-xs line-through text-brand-cream/40">₹{product.originalPrice}</span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product, 1)}
                  className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold text-brand-dark bg-gold-gradient shadow-md hover:brightness-110 flex items-center gap-2 transition-transform transform hover:scale-105"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
