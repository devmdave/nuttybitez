import React, { useState, useEffect } from 'react';

interface SidebarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>('home');

  const navLinks = [
    { label: 'Home', sectionId: 'home' },
    { label: 'Our Products', sectionId: 'flavour-book' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  useEffect(() => {
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
  }, []);

  const handleNavClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(sectionId);

    const targetElem = document.getElementById(sectionId);
    if (targetElem) {
      targetElem.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate(`/#${sectionId}`);
    }
  };

  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-full w-64 z-40 pointer-events-none flex-col justify-center">
      <nav className="flex flex-col gap-4 pointer-events-auto w-full">
        {navLinks.map((link) => {
          const isActive = activeSection === link.sectionId;
          return (
            <a
              key={link.sectionId}
              href={`#${link.sectionId}`}
              onClick={(e) => handleNavClick(link.sectionId, e)}
              className={`
                relative flex items-center py-4 pl-8 pr-12
                rounded-r-3xl transition-all duration-500 ease-out
                font-medium uppercase tracking-[0.2em] text-base
                border-y border-r border-l-0 border-transparent origin-left
                before:content-[''] before:absolute before:-top-[1px] before:-bottom-[1px] before:-left-16 before:w-16
                before:bg-inherit before:border-y before:border-inherit before:border-l-0
                ${isActive
                  ? 'bg-brand-dark/40 text-brand-goldLight translate-x-6 scale-115 shadow-[0_0_25px_rgba(212,175,55,0.25)] backdrop-blur-md border-brand-gold/35 hover:translate-x-7 hover:scale-120'
                  : 'bg-transparent text-brand-cream/80 hover:bg-brand-dark/30 hover:text-brand-goldLight hover:translate-x-3 hover:scale-105 hover:shadow-lg hover:backdrop-blur-sm hover:border-brand-gold/20'
                }
              `}
              style={{ width: 'fit-content', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeft: 'none' }}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
};
