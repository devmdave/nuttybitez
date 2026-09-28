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
    <aside className="hidden md:flex fixed top-0 left-0 h-full w-72 z-40 pointer-events-none flex-col justify-center">
      <nav className="flex flex-col gap-3 pointer-events-auto items-start">
        {navLinks.map((link) => {
          const isActive = activeSection === link.sectionId;
          return (
            <a
              key={link.sectionId}
              href={link.path}
              onClick={(e) => handleNavClick(link, e)}
              className={`
                group relative flex items-center h-14 pl-8
                rounded-r-3xl rounded-l-none
                transition-all duration-300 ease-out
                font-medium uppercase tracking-[0.18em] whitespace-nowrap
                border-y border-r border-l-0
                select-none outline-none
                ${isActive
                  ? 'w-64 text-lg font-semibold bg-brand-dark/50 text-brand-goldLight border-brand-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.2)] backdrop-blur-md'
                  : 'w-48 text-base bg-transparent text-brand-cream/80 border-transparent hover:w-56 hover:bg-brand-dark/35 hover:text-brand-goldLight hover:border-brand-gold/25 hover:backdrop-blur-sm'
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
  );
};
