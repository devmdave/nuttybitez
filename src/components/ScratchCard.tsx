import React, { useState, useRef, useEffect } from 'react';

interface ScratchCardProps {
  customFlavour: string;
  isUnlocked: boolean;
  imageSrc: string;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ customFlavour, isUnlocked, imageSrc }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  
  useEffect(() => {
    if (!isUnlocked || !canvasRef.current || !containerRef.current || isScratched) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      const { width, height } = containerRef.current!.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      
      // Draw metallic scratch coating
      ctx.fillStyle = '#8b6f52'; // Metallic gold/roast colour
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some texture/pattern
      ctx.fillStyle = '#a88965';
      for (let i = 0; i < 200; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Text
      ctx.font = 'bold 24px serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SCRATCH TO REVEAL', canvas.width / 2, canvas.height / 2);
    };
    
    // Initial draw
    resizeCanvas();
    
    // Scratch logic
    let isDrawing = false;
    
    const getCoordinates = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ('touches' in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      }
      return {
        x: (e as MouseEvent).clientX - rect.left,
        y: (e as MouseEvent).clientY - rect.top
      };
    };

    const handleDown = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      const { x, y } = getCoordinates(e);
      scratch(x, y);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();
      const { x, y } = getCoordinates(e);
      scratch(x, y);
    };

    const handleUp = () => {
      if (!isDrawing) return;
      isDrawing = false;
      checkScratchPercentage();
    };

    const scratch = (x: number, y: number) => {
      if (!ctx) return;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2);
      ctx.fill();
    };
    
    const checkScratchPercentage = () => {
      if (!ctx) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;
      
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }
      
      const percentage = (transparentPixels / (pixels.length / 4)) * 100;
      if (percentage > 40 && !isScratched) {
        setIsScratched(true);
      }
    };

    canvas.addEventListener('mousedown', handleDown);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleUp);
    canvas.addEventListener('mouseleave', handleUp);
    
    canvas.addEventListener('touchstart', handleDown, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleUp);
    
    return () => {
      canvas.removeEventListener('mousedown', handleDown);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleUp);
      canvas.removeEventListener('mouseleave', handleUp);
      canvas.removeEventListener('touchstart', handleDown);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleUp);
    };
  }, [isUnlocked, isScratched]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center rounded-2xl overflow-hidden border-2 border-brand-gold/50 shadow-luxury bg-brand-cream group">
      {/* Underlying Jar Image */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <img src={imageSrc} alt="Custom Flavour Jar" className="w-full h-full object-cover img-zoom" />
        
        {/* Dynamic Flavour Name Overlay */}
        {isUnlocked && customFlavour && (
          <div className="absolute top-[68%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[60%] text-center px-2 py-1 z-10 flex flex-col justify-center items-center">
            <p className="font-serif text-brand-cream text-lg sm:text-xl md:text-2xl font-bold leading-tight drop-shadow-md break-words w-full" style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)',
              transform: 'rotate(-2deg) scaleY(1.1)'
            }}>
              {customFlavour.toUpperCase()}
            </p>
          </div>
        )}
      </div>
      
      {/* Scratch Layer */}
      {isUnlocked && !isScratched && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-20"
        />
      )}
      
      {/* Locked State Overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-roast/95 text-brand-goldLight p-8 text-center z-30 transition-opacity duration-700">
          <div className="w-16 h-16 border border-brand-gold/40 rounded-full flex items-center justify-center mb-6 bg-brand-dark/50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h3 className="font-serif text-2xl tracking-widest uppercase mb-3 text-gold-shine">Unlock Flavour</h3>
          <p className="text-sm font-sans opacity-80 leading-relaxed max-w-xs">
            Create your custom flavour on the opposite page to reveal your personalized NuttyBiteZ jar.
          </p>
        </div>
      )}
    </div>
  );
};

export default ScratchCard;
