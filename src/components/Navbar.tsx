import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';

interface NavbarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath = '/', onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { setIsSearchOpen } = useSearch();

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.hash = path;
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Our Products', path: '/#flavour-book' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-md py-6 shadow-luxury">
      <div className="w-full px-4 sm:px-6 lg:px-8 relative">


        {/* Independent Navigation Row */}
        <div className="absolute top-8 left-0 right-0 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-none">
          {/* Spacer to offset the logo's visual weight and keep navigation centered */}
          <div className="hidden md:block w-64 invisible" />


          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-3 sm:gap-5 pointer-events-auto">

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-brand-cream hover:text-brand-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Overlay Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[88px] bg-brand-espresso/98 border-b border-brand-gold/30 backdrop-blur-xl px-6 py-8 shadow-2xl animate-fadeIn">
          <div className="flex flex-col gap-6 text-center">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleNavClick(link.path, e)}
                className="font-serif text-2xl tracking-wide text-brand-cream hover:text-brand-goldLight transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-brand-gold/20 flex flex-col items-center gap-4">
              <a
                href="/shop"
                onClick={(e) => handleNavClick('/shop', e)}
                className="w-full py-3 text-xs uppercase tracking-[0.2em] font-bold text-brand-dark bg-gold-gradient rounded-full text-center shadow-lg"
              >
                Explore All Products
              </a>
              <p className="text-[11px] text-brand-goldLight/70 tracking-widest uppercase">
                WhatsApp Order: 8488971879
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
