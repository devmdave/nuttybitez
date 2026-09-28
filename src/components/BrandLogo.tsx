import React from 'react';

interface BrandLogoProps {
  onNavigate: (path: string) => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ onNavigate }) => {
  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center">
          <a
            href="/"
            onClick={(e) => handleNavClick('/', e)}
            className="flex items-center group cursor-pointer pointer-events-auto"
          >
            <div className="w-64 h-64 rounded-full p-[3px] bg-gradient-to-br from-brand-goldLight via-brand-gold to-brand-roast shadow-lg group-hover:scale-105 transition-transform duration-300">
              <img
                src="/assets/logo.jpeg"
                alt="NuttyBitez Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
