import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { BrandLogo } from './components/BrandLogo';
import { Sidebar } from './components/Sidebar';
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
      
      if (hash.startsWith('/#')) {
        const targetId = hash.substring(2);
        setCurrentPath('/');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            if (lenisRef.current) {
              lenisRef.current.scrollTo(element);
            } else {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 100);
        return;
      }
      
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
    if (path.startsWith('/#')) {
      const targetId = path.substring(2);
      window.location.hash = path;
      setCurrentPath('/');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(element);
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
      return;
    }

    window.location.hash = path;
    setCurrentPath(path);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const renderPage = () => {
    if (currentPath === '/shop' || currentPath === '/our-products') {
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
          <BrandLogo onNavigate={navigate} />
          <Sidebar currentPath={currentPath} onNavigate={navigate} />
          
          <div className="flex-1 transition-all duration-300">
            {renderPage()}
          </div>



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

