import React, { useState } from 'react';
import { getProductBySlug, products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowLeft, ShieldCheck, Truck, Plus, Minus, Eye } from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onNavigate }) => {
  const product = getProductBySlug(slug) || products[0];
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    window.location.hash = '/shop';
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 bg-brand-dark min-h-screen text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <button
          onClick={() => onNavigate('/shop')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-brand-goldLight hover:text-brand-gold transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products Store</span>
        </button>

        {/* Product Details Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Left Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden border-2 border-brand-gold/40 shadow-2xl bg-brand-espresso">
              <img
                src={product.images.poster}
                alt={product.name}
                className="w-full h-full object-cover img-zoom"
              />
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-3 gap-3.5">
              {[product.images.poster, product.images.jar, product.images.ingredients].map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-lg overflow-hidden border border-brand-gold/30 bg-brand-dark cursor-pointer hover:border-brand-gold"
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Product Specifications */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Tagline */}
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-bold text-brand-gold block mb-1">
                {product.category} • {product.weight} Jar
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-cream">
                {product.name}
              </h1>
              <p className="font-script text-xl sm:text-2xl text-brand-goldLight mt-0.5">
                {product.flavour}
              </p>
            </div>

            {/* Description */}
            <p className="text-brand-cream/80 text-sm sm:text-base leading-relaxed font-light">
              {product.description}
            </p>

            {/* Pricing Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-brand-espresso border border-brand-gold/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-cream/60 block">Introductory Offer</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-brand-goldLight">₹{product.price}</span>
                  <span className="text-xs line-through text-brand-cream/40">₹{product.originalPrice}</span>
                  <span className="px-1.5 py-0.5 rounded bg-brand-gold text-brand-dark text-[10px] font-bold uppercase">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-medium">In Stock • Fresh Batch</span>
            </div>

            {/* Quantity Counter & Action Buttons */}
            <div className="space-y-3.5 pt-1">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-brand-cream/70 font-semibold">Quantity:</span>
                <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-espresso border border-brand-gold/30">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="hover:text-brand-gold text-brand-cream"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center font-bold font-serif text-base text-brand-cream">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="hover:text-brand-gold text-brand-cream"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="w-full py-3.5 rounded-full text-xs uppercase tracking-[0.18em] font-bold text-brand-dark bg-gold-gradient shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 transition-transform transform hover:scale-102"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart (₹{product.price * quantity})</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 rounded-full text-xs uppercase tracking-[0.18em] font-semibold text-brand-cream border border-brand-gold/40 hover:bg-brand-roast flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Buy Now Instant</span>
                </button>
              </div>
            </div>

            {/* Taste Profile Radar Bars */}
            <div className="p-6 rounded-2xl bg-brand-espresso/60 border border-brand-gold/20 space-y-3">
              <h4 className="font-serif text-lg font-bold text-brand-cream border-b border-brand-gold/15 pb-2">
                Sensory Profile Radar
              </h4>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-brand-cream/80 mb-1">
                    <span>Crunch Factor</span>
                    <span>{product.tasteProfile.crunch}%</span>
                  </div>
                  <div className="w-full bg-brand-dark h-2 rounded-full overflow-hidden">
                    <div className="bg-brand-gold h-full rounded-full" style={{ width: `${product.tasteProfile.crunch}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-brand-cream/80 mb-1">
                    <span>Flavour Richness</span>
                    <span>{product.tasteProfile.richness}%</span>
                  </div>
                  <div className="w-full bg-brand-dark h-2 rounded-full overflow-hidden">
                    <div className="bg-brand-gold h-full rounded-full" style={{ width: `${product.tasteProfile.richness}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-brand-cream/80 mb-1">
                    <span>Botanical Aroma</span>
                    <span>{product.tasteProfile.aroma}%</span>
                  </div>
                  <div className="w-full bg-brand-dark h-2 rounded-full overflow-hidden">
                    <div className="bg-brand-gold h-full rounded-full" style={{ width: `${product.tasteProfile.aroma}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredients Disclosure */}
            <div className="space-y-2 pt-2">
              <h4 className="font-serif text-lg font-bold text-brand-cream">
                Ingredients & Sourcing
              </h4>
              <p className="text-xs text-brand-cream/70 leading-relaxed font-light">
                {product.ingredients.join(' • ')}
              </p>
            </div>

          </div>

        </div>

        {/* Related Products Section */}
        <div className="pt-16 border-t border-brand-gold/20 space-y-8">
          <h3 className="font-serif text-3xl font-bold text-brand-cream text-center">
            You Might Also Crave
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate(`/product/${rel.slug}`)}
                className="p-4 rounded-2xl bg-brand-espresso border border-brand-gold/20 hover:border-brand-gold/40 cursor-pointer transition-all space-y-3"
              >
                <img
                  src={rel.images.poster}
                  alt={rel.name}
                  className="w-full aspect-square object-cover rounded-xl border border-brand-gold/20"
                />
                <h4 className="font-serif text-xl font-bold text-brand-cream">{rel.name}</h4>
                <p className="text-xs text-brand-cream/60 line-clamp-1">{rel.shortDescription}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-serif text-lg font-bold text-brand-goldLight">₹{rel.price}</span>
                  <span className="text-xs text-brand-gold hover:underline">Explore →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
