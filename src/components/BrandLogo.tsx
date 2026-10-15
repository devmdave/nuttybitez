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
    <div className="hidden md:block fixed top-0 left-0 z-[60] pointer-events-none p-4 sm:p-5 lg:p-6">
      <a
        href="/"
        onClick={(e) => handleNavClick('/', e)}
        className="flex items-center group cursor-pointer pointer-events-auto"
        aria-label="NuttyBitez Home"
      >
        <div className="w-[120px] h-[120px] sm:w-[144px] sm:h-[144px] lg:w-[168px] lg:h-[168px] rounded-full p-[3px] bg-gradient-to-br from-brand-goldLight via-brand-gold to-brand-roast shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(199,154,74,0.35)] group-hover:scale-105 transition-transform duration-300">
          <img
            src="/assets/logo.jpeg"
            alt="NuttyBitez Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </a>
    </div>
  );
};
