import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { ContactPage } from './pages/ContactPage';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || '/';
  });

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPath(hash || '/');
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const renderPage = () => {
    if (currentPath === '/shop') {
      return <ShopPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '');
      return <ProductDetailPage slug={slug} onNavigate={navigate} />;
    }
    if (currentPath === '/our-story') {
      return <OurStoryPage onNavigate={navigate} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    return <HomePage onNavigate={navigate} />;
  };

  return (
    <CartProvider>
      <SearchProvider>
        <div className="min-h-screen bg-brand-dark flex flex-col font-sans selection:bg-brand-gold selection:text-brand-dark">
          <Navbar currentPath={currentPath} onNavigate={navigate} />
          
          <div className="flex-1">
            {renderPage()}
          </div>

          <Footer onNavigate={navigate} />

          {/* Global Modals & Overlays */}
          <CartDrawer />
          <SearchModal />
          <QuickViewModal />
        </div>
      </SearchProvider>
    </CartProvider>
  );
};

export default App;

