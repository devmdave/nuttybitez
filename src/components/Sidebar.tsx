import React from 'react';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate }) => {
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Our Products', path: '/#flavour-book' },
    { label: 'Our Story', path: '/our-story' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-full w-64 z-40 pointer-events-none flex-col justify-center">
      <nav className="flex flex-col gap-4 pointer-events-auto w-full">
        {navLinks.map((link) => {
          const isActive = currentPath === link.path;
          return (
            <a
              key={link.path}
              href={link.path}
              onClick={(e) => handleNavClick(link.path, e)}
              className={`
                relative flex items-center py-4 pl-8 pr-12
                rounded-r-3xl transition-all duration-500 ease-out
                font-medium uppercase tracking-[0.2em] text-sm
                border-y border-r border-transparent
                ${isActive
                  ? 'bg-brand-dark/40 text-brand-goldLight translate-x-2 scale-105 shadow-[0_0_20px_rgba(212,175,55,0.15)] backdrop-blur-md border-brand-gold/30'
                  : 'bg-transparent text-brand-cream/80 hover:bg-brand-dark/30 hover:text-brand-goldLight hover:translate-x-1 hover:scale-105 hover:shadow-lg hover:backdrop-blur-sm hover:border-brand-gold/20'
                }
              `}
              style={{ width: 'fit-content', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
};
