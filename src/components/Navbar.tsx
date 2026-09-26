import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';

interface NavbarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath = '/', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { setIsSearchOpen } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { label: 'Our Products', path: '/shop' },
    { label: 'Our Story', path: '/our-story' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-brand-espresso/95 backdrop-blur-md py-4 shadow-luxury'
          : 'bg-gradient-to-b from-brand-dark/90 via-brand-dark/40 to-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => handleNavClick('/', e)}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full p-[3px] bg-gradient-to-br from-brand-goldLight via-brand-gold to-brand-roast shadow-lg group-hover:scale-105 transition-transform duration-300">
              <img
                src="/assets/logo.jpeg"
                alt="NuttyBitez Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold tracking-tight text-gold-gradient leading-none">
                NuttyBitez
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-brand-goldLight font-medium mt-1.5">
                PREMIUM MUNCHING FOREVER
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleNavClick(link.path, e)}
                  className={`relative text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 py-1 ${
                    isActive
                      ? 'text-brand-goldLight'
                      : 'text-brand-cream/80 hover:text-brand-goldLight'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-brand-cream/80 hover:text-brand-goldLight transition-colors rounded-full hover:bg-brand-roast/40"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-brand-cream/80 hover:text-brand-goldLight transition-colors rounded-full hover:bg-brand-roast/40"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-gold text-brand-dark text-[10px] font-bold flex items-center justify-center shadow-md animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Shop Now CTA */}
            <a
              href="/shop"
              onClick={(e) => handleNavClick('/shop', e)}
              className="hidden sm:inline-flex items-center px-4 py-2 text-xs uppercase tracking-[0.15em] font-semibold text-brand-dark bg-gold-gradient rounded-full shadow-md hover:brightness-110 hover:shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Shop Now
            </a>

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
