import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

export const SocialInstagram: React.FC = () => {
  const posts = [
    { image: '/assets/original_theme_poster.jpeg', likes: '1.4k', caption: 'Four Flavours. Endless Indulgence.' },
    { image: '/assets/paan_shot_poster.jpeg', likes: '980', caption: 'Paan Shot: Fresh betel leaf & white chocolate dragée' },
    { image: '/assets/coffee_tiramisu_poster.jpeg', likes: '1.2k', caption: 'Coffee Tiramisu: Arabica coffee dust & creamy cocoa' },
    { image: '/assets/peri_peri_poster.jpeg', likes: '890', caption: 'Peri Peri Cashew: Fiery birdseye chili spiced cashews' },
    { image: '/assets/all_packagings.jpeg', likes: '2.1k', caption: 'The complete NuttyBitez 100g Jar Collection' },
    { image: '/assets/hero_ingredients_bg_1789677986247.png', likes: '1.1k', caption: 'California almonds slow-roasted to golden perfection' }
  ];

  return (
    <section className="py-24 bg-brand-espresso border-t border-brand-gold/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-dark">
            <Instagram className="w-3.5 h-3.5 text-brand-goldLight" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-goldLight">
              @nuttybitez
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-brand-cream">
            FOLLOW THE CRAVING.
          </h2>
          <p className="text-brand-cream/70 text-base font-light">
            Join our community of gourmet snack lovers. Tag us with your NuttyBitez moment!
          </p>
        </div>

        {/* Instagram Visual Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-brand-gold/20 shadow-md bg-brand-dark cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-brand-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-brand-cream text-center">
                <Instagram className="w-6 h-6 mx-auto text-brand-goldLight mt-2" />
                <p className="text-[10px] text-brand-cream/90 font-light line-clamp-3">
                  "{post.caption}"
                </p>
                <span className="text-[9px] uppercase tracking-wider text-brand-gold font-bold mb-2">
                  ♥ {post.likes}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Order Direct Banner */}
        <div className="p-6 rounded-2xl bg-brand-dark/90 border border-brand-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-brand-cream">
                Prefer ordering via WhatsApp?
              </h4>
              <p className="text-xs text-brand-cream/70">
                Direct order & instant support line: <strong className="text-brand-goldLight font-mono">8488971879</strong>
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/918488971879?text=Hi%20NuttyBitez!%20I%20would%20like%20to%20place%20an%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold text-brand-dark bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-md whitespace-nowrap"
          >
            Chat on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
