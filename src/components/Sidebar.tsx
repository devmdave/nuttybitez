import React, { useState, useEffect } from 'react';

interface SidebarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath = '/', onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>('home');

  const navLinks = [
    { label: 'Home', sectionId: 'home', path: '/' },
    { label: 'Our Products', sectionId: 'flavour-book', path: '/#flavour-book' },
    { label: 'Contact', sectionId: 'contact', path: '/contact' },
  ];

  useEffect(() => {
    // If we are on a separate route page like /contact, sync active state from path
    if (currentPath === '/contact') {
      setActiveSection('contact');
      return;
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.15,
    });

    navLinks.forEach((link) => {
      const el = document.getElementById(link.sectionId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPath]);

  const handleNavClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(link.sectionId);

    const targetElem = document.getElementById(link.sectionId);
    if (targetElem) {
      targetElem.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate(link.path);
    } else {
      window.location.hash = link.path;
    }
  };

  return (
    <>
      {/* Compact Mobile Top Navigation Header (< md) */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#140804]/95 backdrop-blur-md border-b border-brand-gold/25 shadow-[0_4px_25px_rgba(0,0,0,0.7)] px-2.5 min-[360px]:px-3.5 sm:px-5 py-2">
        <div className="flex items-center justify-between max-w-xl mx-auto gap-2">
          
          {/* Logo on Left */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(navLinks[0], e);
            }}
            className="flex items-center group cursor-pointer shrink-0"
            aria-label="NuttyBitez Home"
          >
            <div className="w-[44px] h-[44px] min-[360px]:w-[48px] min-[360px]:h-[48px] rounded-full p-[2px] bg-gradient-to-br from-brand-goldLight via-brand-gold to-brand-roast shadow-[0_2px_8px_rgba(0,0,0,0.5),0_0_10px_rgba(199,154,74,0.3)] group-hover:scale-105 transition-transform duration-300">
              <img
                src="/assets/logo.jpeg"
                alt="NuttyBitez Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </a>

          {/* 3 Navigation Tabs to the Right */}
          <nav className="flex items-center justify-end gap-1.5 min-[360px]:gap-2 flex-1 min-w-0" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <a
                  key={link.sectionId}
                  href={link.path}
                  onClick={(e) => handleNavClick(link, e)}
                  className={`
                    px-2.5 py-1.5 min-[360px]:px-3 min-[360px]:py-2
                    rounded-full text-[10.5px] min-[360px]:text-[11px] sm:text-xs font-semibold uppercase tracking-wider
                    transition-all duration-200 whitespace-nowrap select-none
                    border text-center flex items-center justify-center
                    ${isActive
                      ? 'bg-brand-dark/95 text-brand-goldLight border-brand-gold/60 shadow-[0_0_12px_rgba(212,175,55,0.3)] font-bold'
                      : 'bg-brand-espresso/60 text-brand-cream/80 border-brand-gold/20 hover:text-brand-goldLight hover:border-brand-gold/40'
                    }
                  `}
                >
                  {link.sectionId === 'flavour-book' ? (
                    <span>
                      <span className="hidden min-[360px]:inline">Our </span>Products
                    </span>
                  ) : (
                    link.label
                  )}
                </a>
              );
            })}
          </nav>

        </div>
      </header>

      {/* Desktop Sidebar Navigation (>= md) */}
      <aside className="hidden md:flex fixed top-0 left-0 h-full w-56 lg:w-60 z-40 pointer-events-none flex-col justify-center">
        <nav className="flex flex-col gap-2.5 pointer-events-auto items-start">
          {navLinks.map((link) => {
            const isActive = activeSection === link.sectionId;
            return (
              <a
                key={link.sectionId}
                href={link.path}
                onClick={(e) => handleNavClick(link, e)}
                className={`
                  group relative flex items-center h-11 sm:h-12 pl-6 sm:pl-7
                  rounded-r-2xl rounded-l-none
                  transition-all duration-300 ease-out
                  font-medium uppercase whitespace-nowrap
                  border-y border-r border-l-0
                  select-none outline-none
                  ${isActive
                    ? 'w-48 lg:w-52 text-xs sm:text-[13px] tracking-[0.16em] font-semibold bg-brand-dark/65 text-brand-goldLight border-brand-gold/45 shadow-[0_0_20px_rgba(212,175,55,0.25)] backdrop-blur-md'
                    : 'w-32 sm:w-36 text-[11px] sm:text-xs tracking-[0.15em] bg-transparent text-brand-cream/75 border-transparent hover:w-44 lg:hover:w-48 hover:bg-brand-dark/45 hover:text-brand-goldLight hover:border-brand-gold/30 hover:backdrop-blur-sm'
                  }
                `}
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
