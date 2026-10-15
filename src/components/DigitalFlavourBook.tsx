import React, { useState, useRef, useEffect, useCallback } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Sparkles,
  BookOpen,
  Eye,
  Volume2,
  VolumeX,
  Bookmark,
  RotateCcw,
  Compass,
  ArrowRight,
  Flame,
  Coffee,
  CheckCircle2,
  Award,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ScratchCard from './ScratchCard';

interface DigitalFlavourBookProps {
  onNavigate?: (path: string) => void;
}

// ForwardRef Page Wrapper for StPageFlip engine
const Page = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    density?: 'hard' | 'soft';
    className?: string;
    pageNumber?: number;
    bgStyle?: React.CSSProperties;
  }
>((props, ref) => {
  return (
    <div
      className={`page w-full h-full relative bg-[#FAF3E8] overflow-hidden select-none border-r border-brand-roast/10 ${props.className || ''}`}
      ref={ref}
      data-density={props.density || 'soft'}
      style={props.bgStyle}
    >
      {props.children}
    </div>
  );
});
Page.displayName = 'Page';


const Book3D: React.FC<{
  children: React.ReactNode;
  currentSpread: number;
  bookDimensions: { width: number; height: number };
  windowWidth: number;
}> = ({ children, currentSpread, bookDimensions, windowWidth }) => {
  const pages = React.Children.toArray(children);
  const sheets = [];
  for (let i = 0; i < pages.length; i += 2) {
    sheets.push({
      front: pages[i],
      back: pages[i + 1] || null
    });
  }

  const isClosed = currentSpread === 0;
  const isBackClosed = currentSpread === sheets.length;
  const translateX = isClosed ? '-25%' : isBackClosed ? '25%' : '0%';
  const mobileScale = (windowWidth < 640 && !isClosed && !isBackClosed)
    ? Math.min(1, Math.max(0.48, (windowWidth - 28) / (bookDimensions.width * 2)))
    : 1;

  return (
    <div
      className="relative mx-auto transition-transform duration-1000 ease-in-out"
      style={{
        width: bookDimensions.width * 2,
        height: bookDimensions.height,
        transform: `translateX(${translateX}) scale(${mobileScale})`,
        perspective: '3500px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Center Spine Shadow (Only visible when book is open) */}
      <div
        className={`absolute top-0 bottom-0 left-1/2 w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/20 to-transparent z-0 pointer-events-none transition-opacity duration-1000 ${isClosed || isBackClosed ? 'opacity-0' : 'opacity-100'}`}
      />

      {sheets.map((sheet, i) => {
        const isFlipped = i < currentSpread;
        const zIndex = isFlipped ? 10 + i : 50 - i;

        return (
          <div
            key={i}
            className="absolute top-0 right-0 h-full"
            style={{
              width: '50%',
              transformOrigin: 'left center',
              transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.9s cubic-bezier(0.4, 0.0, 0.2, 1)',
              zIndex,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* FRONT FACE (Right Page) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden rounded-r-xl border-l border-brand-roast/20"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
              }}
            >
              {sheet.front}
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/15 to-transparent pointer-events-none" />
            </div>

            {/* BACK FACE (Left Page when flipped) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden rounded-l-xl border-r border-brand-roast/20"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              {sheet.back}
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/15 to-transparent pointer-events-none" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const DigitalFlavourBook: React.FC<DigitalFlavourBookProps> = ({ onNavigate }) => {
  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const totalSpreads = 7;
  const currentPage = currentSpread === 0 ? 0 : currentSpread === 7 ? 13 : currentSpread * 2;
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [bookDimensions, setBookDimensions] = useState({ width: 400, height: 550 });
  const { addToCart, setQuickViewProduct } = useCart();
  const [addedAnimationProduct, setAddedAnimationProduct] = useState<string | null>(null);

  // Custom Flavour State
  const [customFlavourInput, setCustomFlavourInput] = useState('');
  const [submittedFlavour, setSubmittedFlavour] = useState('');
  const [isCustomFlavourScratched, setIsCustomFlavourScratched] = useState(false);

  // Responsive Book Sizing calculation
  useEffect(() => {
    const handleResize = () => {
      const wWidth = window.innerWidth;
      setWindowWidth(wWidth);
      if (wWidth < 640) {
        // Mobile portrait single/scaled view
        const w = Math.min(wWidth - 32, 320);
        setBookDimensions({
          width: w,
          height: Math.round(w * 1.38)
        });
      } else if (wWidth < 1024) {
        // Tablet view
        setBookDimensions({
          width: 320,
          height: 450
        });
      } else if (wWidth < 1440) {
        // Standard Desktop
        setBookDimensions({
          width: 370,
          height: 510
        });
      } else {
        // Wide Desktop (1440px+)
        setBookDimensions({
          width: 400,
          height: 550
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Web Audio Synthesized Page Flip Sound
  const playPageFlipSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const bufferSize = audioCtx.sampleRate * 0.12; // 120ms paper rustle
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000;
      filter.Q.value = 1.5;

      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);

      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      whiteNoise.start();
    } catch (e) {
      // Audio context fallbacks silently
    }
  }, [soundEnabled]);



  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSpread]);

  // Jump to specific page
  const turnToPage = (pageIndex: number) => {
    let spreadIndex = Math.floor(pageIndex / 2);
    if (pageIndex === 0) spreadIndex = 0;
    else if (pageIndex >= 13) spreadIndex = 7;
    setCurrentSpread(spreadIndex);
  };

  const handleNext = () => {
    setCurrentSpread(s => Math.min(s + 1, totalSpreads));
    playPageFlipSound();
  };

  const handlePrev = () => {
    setCurrentSpread(s => Math.max(s - 1, 0));
    playPageFlipSound();
  };

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimationProduct(product.id);
    setTimeout(() => setAddedAnimationProduct(null), 1800);
  };

  const handleAddAllToCart = () => {
    products.forEach((p) => addToCart(p, 1));
    setAddedAnimationProduct('all-products');
    setTimeout(() => setAddedAnimationProduct(null), 2000);
  };

  // Find products by ID for precise matching
  const paanShot = products.find(p => p.id === 'paan-shot') || products[1];
  const coffeeTiramisu = products.find(p => p.id === 'coffee-tiramisu') || products[2];
  const chocoCrunch = products.find(p => p.id === 'choco-crunch') || products[0];
  const darkChocolate = products.find(p => p.id === 'dark-chocolate') || products[3];
  const periPeriCashew = products.find(p => p.id === 'peri-peri-cashew') || products[4];

  // Tab Item Definitions
  const navigationTabs = [
    { label: 'Cover', page: 0 },
    { label: 'Introduction', page: 1 },
    { label: 'Paan Shot', page: 3 },
    { label: 'Coffee Tiramisu', page: 5 },
    { label: 'Choco Crunch', page: 7 },
    { label: 'Dark Chocolate', page: 9 },
    { label: 'Peri Peri Cashew', page: 11 },
    { label: 'Brand Ethos', page: 13 },
  ];

  const currentTabActive = (targetPage: number) => {
    if (targetPage === 0 && currentPage === 0) return true;
    if (targetPage === 1 && (currentPage === 1 || currentPage === 2)) return true;
    if (targetPage === 3 && (currentPage === 3 || currentPage === 4)) return true;
    if (targetPage === 5 && (currentPage === 5 || currentPage === 6)) return true;
    if (targetPage === 7 && (currentPage === 7 || currentPage === 8)) return true;
    if (targetPage === 9 && (currentPage === 9 || currentPage === 10)) return true;
    if (targetPage === 11 && (currentPage === 11 || currentPage === 12)) return true;
    if (targetPage === 13 && (currentPage >= 13)) return true;
    return false;
  };

  return (
    <section id="flavour-book" className="py-14 sm:py-18 lg:py-20 bg-brand-dark relative overflow-hidden select-none">

      {/* Background Subtle Texture & Ambient Glow */}
      <div className="absolute inset-0 opacity-15 bg-dark-paper pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-cream tracking-wide">
            FLIP THROUGH THE MENU
          </h2>
        </div>



        {/* 3D BOOK CONTAINER WRAPPER */}
        <div className="relative max-w-6xl mx-auto flex flex-col items-center">

          {/* Stacked Pages Bottom Shadow Base */}
          <div className="w-full flex justify-center items-center pt-4 pb-14 sm:pb-16 md:py-4 relative">

            {/* The 3D FlipBook Render */}
            <div className="relative rounded-2xl overflow-visible">

              {/* Spine Line Gradient Overlay */}
              <div
                className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 z-30 book-spine-shadow pointer-events-none hidden sm:block transition-opacity duration-1000 ${(currentSpread === 0 || currentSpread === totalSpreads) ? 'opacity-0' : 'opacity-100'}`}
              />



              {/* HTMLFlipBook Engine */}
              <Book3D currentSpread={currentSpread} bookDimensions={bookDimensions} windowWidth={windowWidth}>

                {/* ==========================================
                    PAGE 0: FRONT COVER (HARDCOVER)
                ========================================== */}
                <Page density="hard" className="bg-brand-dark shadow-2xl border-4 border-brand-gold/50">
                  <div
                    className="w-full h-full p-6 sm:p-8 flex flex-col justify-between relative bg-cover bg-center text-brand-cream"
                    style={{ backgroundImage: `linear-gradient(rgba(26, 14, 10, 0.75), rgba(36, 21, 15, 0.85)), url('/assets/book_cover_leather.png')` }}
                  >
                    {/* Gold Foil Filigree Corner Frames */}
                    <div className="absolute top-3.5 left-3.5 w-8 h-8 border-t-2 border-l-2 border-brand-gold" />
                    <div className="absolute top-3.5 right-3.5 w-8 h-8 border-t-2 border-r-2 border-brand-gold" />
                    <div className="absolute bottom-3.5 left-3.5 w-8 h-8 border-b-2 border-l-2 border-brand-gold" />
                    <div className="absolute bottom-3.5 right-3.5 w-8 h-8 border-b-2 border-r-2 border-brand-gold" />

                    {/* Cover Top Header */}
                    <div className="text-center pt-4 space-y-1.5">
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] font-bold text-brand-goldLight gold-foil-emboss">
                        PREMIUM MUNCHING FOREVER
                      </span>
                      <div className="w-10 h-[1px] bg-brand-gold/60 mx-auto" />
                    </div>

                    {/* Cover Center Title & Emblem */}
                    <div className="text-center space-y-4 my-auto px-3">
                      <div className="w-18 h-18 sm:w-20 sm:h-20 mx-auto rounded-full border-2 border-brand-gold/60 p-1.5 shadow-gold-glow bg-brand-dark/80 flex items-center justify-center">
                        <img
                          src="/assets/logo.jpeg"
                          alt="NuttyBitez Logo"
                          className="w-full h-full object-contain rounded-full border border-brand-gold/40"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <h1 className="font-serif text-2xl sm:text-3.5xl font-bold tracking-wider text-gold-shine">
                          NUTTYBITEZ
                        </h1>
                        <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-semibold text-brand-cream/80">
                          Digital Flavour Book
                        </p>
                        <p className="font-serif italic text-xs text-brand-goldLight/90">
                          Volume I • First Edition
                        </p>
                      </div>
                    </div>

                    {/* Cover Footer & Flip Hint */}
                    <div className="text-center space-y-2 pb-3">
                      <p className="text-[9px] uppercase tracking-widest text-brand-cream/50">
                        PREMIUM MUNCHING FOREVER
                      </p>
                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 1: PAAN SHOT (LEFT: PAGE 1)
                ========================================== */}
                <Page density="hard" className="paper-inner-crease-left">
                  <div
                    className="w-full h-full p-5 sm:p-7 flex flex-col justify-between text-brand-cream relative bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(26, 41, 17, 0.85), rgba(15, 26, 10, 0.95)), url('${paanShot.images.ingredients}')` }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-gold/30 pb-2.5 text-[9px] uppercase font-serif tracking-widest text-brand-goldLight">
                      <span>Botanical Green</span>
                      <span>PAGE 01</span>
                    </div>

                    {/* Left Page Photography Hero */}
                    <div className="my-auto space-y-3">
                      <div className="relative aspect-square rounded-xl overflow-hidden border border-brand-gold/50 shadow-luxury group">
                        <img
                          src="/assets/prodcut_images/paan_shot_jar_img.png"
                          alt={paanShot.name}
                          className="w-full h-full object-cover img-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-botanicalDark via-transparent to-transparent opacity-80" />

                      </div>
                    </div>

                    <div className="border-t border-brand-gold/30 mt-2.5" />
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 2: PAAN SHOT (RIGHT: PAGE 4)
                ========================================== */}
                <Page density="hard" className="paper-inner-crease-right">
                  <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between text-brand-roast relative bg-paper-texture">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-roast/20 pb-2.5 text-[9px] uppercase font-serif tracking-widest text-brand-roast/70">
                      <span>PAAN SHOT DRAGÉE</span>
                      <span>PAGE 02</span>
                    </div>

                    {/* Right Page Editorial Content */}
                    <div className="flex-1 flex flex-col justify-start mt-4 sm:mt-6 mb-auto">
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-brand-roast tracking-tight leading-none">
                          Paan Shot
                        </h3>
                        <p className="font-script text-[1.05rem] sm:text-[1.15rem] lg:text-[1.22rem] text-brand-roast mt-3 sm:mt-4 w-[95%] sm:w-[92%] leading-[1.3] sm:leading-[1.35] text-pretty break-words">
                          A refreshing Indian paan-inspired almond dragée combining aromatic paan flavours, subtle sweetness, and crunchy almonds. A unique, refreshing twist that brings the familiar essence of paan into every bite, remembering “Khaike Paan Banaras Wala”!!
                        </p>
                      </div>

                    </div>

                    {/* Price & Cart Actions */}
                    <div className="pt-3 sm:pt-4 border-t border-brand-roast/20 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-xs uppercase text-brand-roast/60 font-bold block mb-0.5">Net Weight {paanShot.weight}</span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-roast">₹{paanShot.price}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 2: COFFEE TIRAMISU (LEFT: PAGE 3)
                ========================================== */}
                <Page density="hard" className="paper-inner-crease-left">
                  <div
                    className="w-full h-full p-5 sm:p-7 flex flex-col justify-between text-brand-cream relative bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(36, 21, 15, 0.85), rgba(20, 10, 5, 0.95)), url('/assets/coffee_tiramisu_ingredients.png')` }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-gold/30 pb-2.5 text-[9px] uppercase font-serif tracking-widest text-brand-goldLight">
                      <span>Espresso Tones</span>
                      <span>PAGE 03</span>
                    </div>

                    {/* Left Page Photography Hero */}
                    <div className="my-auto space-y-3">
                      <div className="relative aspect-square rounded-xl overflow-hidden border border-brand-gold/50 shadow-luxury group">
                        <img
                          src="/assets/prodcut_images/coffee_tiramisu_jar_img.jpeg"
                          alt={coffeeTiramisu.name}
                          className="w-full h-full object-cover img-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso via-transparent to-transparent opacity-80" />

                      </div>
                    </div>

                    <div className="border-t border-brand-gold/30 mt-2.5" />
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 2: COFFEE TIRAMISU (RIGHT: PAGE 4)
                ========================================== */}
                <Page density="hard" className="paper-inner-crease-right">
                  <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between text-brand-roast relative bg-paper-texture">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-roast/20 pb-2.5 text-[9px] uppercase font-serif tracking-widest text-brand-roast/70">
                      <span>COFFEE TIRAMISU DRAGÉE</span>
                      <span>PAGE 04</span>
                    </div>

                    {/* Right Page Content */}
                    <div className="flex-1 flex flex-col justify-start mt-4 sm:mt-6 mb-auto">
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-brand-roast tracking-tight leading-none">
                          Coffee Tiramisu
                        </h3>
                        <p className="font-script text-[1.05rem] sm:text-[1.15rem] lg:text-[1.22rem] text-brand-roast mt-3 sm:mt-4 w-[95%] sm:w-[92%] leading-[1.3] sm:leading-[1.35] text-pretty break-words">
                          A delightful blend of rich coffee and tiramisu-inspired flavours wrapped around crunchy almonds. Creamy and indulgent, it’s the perfect pick-me-up for coffee and dessert lovers alike.
                        </p>
                      </div>

                    </div>

                    {/* Price & Cart Actions */}
                    <div className="pt-3 sm:pt-4 border-t border-brand-roast/20 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-xs uppercase text-brand-roast/60 font-bold block mb-0.5">Net Weight {coffeeTiramisu.weight}</span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-roast">₹{coffeeTiramisu.price}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 3: CHOCO CRUNCH (LEFT: PAGE 5)
                ========================================== */}
                <Page density="hard" className="paper-inner-crease-left">
                  <div
                    className="w-full h-full p-5 sm:p-7 flex flex-col justify-between text-brand-cream relative bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(46, 27, 18, 0.85), rgba(26, 14, 10, 0.95)), url('${chocoCrunch.images.ingredients}')` }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-gold/30 pb-2.5 text-[9px] uppercase font-serif tracking-widest text-brand-goldLight">
                      <span>Dark Choclate</span>
                      <span>PAGE 05</span>
                    </div>

                    {/* Left Page Photography Hero */}
                    <div className="my-auto space-y-3">
                      <div className="relative aspect-square rounded-xl overflow-hidden border border-brand-gold/50 shadow-luxury group">
                        <img
                          src="/assets/prodcut_images/choco_crunch_jar_img.jpeg"
                          alt={chocoCrunch.name}
                          className="w-full h-full object-cover img-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80" />

                      </div>
                    </div>

                    <div className="border-t border-brand-gold/30 mt-2.5" />
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 3: CHOCO CRUNCH (RIGHT: PAGE 6)
                ========================================== */}
                <Page density="hard" className="paper-inner-crease-right">
                  <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between text-brand-roast relative bg-paper-texture">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-roast/20 pb-2.5 text-[9px] uppercase font-serif tracking-widest text-brand-roast/70">
                      <span>CHOCO CRUNCH DRAGÉE</span>
                      <span>PAGE 06</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-start mt-4 sm:mt-6 mb-auto">
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-brand-roast tracking-tight leading-none">
                          Choco Crunch
                        </h3>
                        <p className="font-script text-[1.05rem] sm:text-[1.15rem] lg:text-[1.22rem] text-brand-roast mt-3 sm:mt-4 w-[95%] sm:w-[92%] leading-[1.3] sm:leading-[1.35] text-pretty break-words">
                          A rich chocolate-coated almond dragée delivering a satisfying crunch with every bite. Smooth, indulgent chocolate and premium almonds come together for a timeless treat made for chocolate lovers.
                        </p>
                      </div>

                    </div>

                    {/* Price & Cart Actions */}
                    <div className="pt-3 sm:pt-4 border-t border-brand-roast/20 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-xs uppercase text-brand-roast/60 font-bold block mb-0.5">Net Weight {chocoCrunch.weight}</span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-roast">₹{chocoCrunch.price}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 4: DARK CHOCOLATE (LEFT: PAGE 7)
                ========================================== */}
                <Page density="hard" className="paper-inner-crease-left">
                  <div
                    className="w-full h-full p-5 sm:p-7 flex flex-col justify-between text-brand-cream relative bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(26, 14, 10, 0.9), rgba(15, 8, 5, 0.95)), url('/assets/dark_chocolate_ingredients.png')` }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-gold/30 pb-2.5 text-[9px] uppercase font-serif tracking-widest text-brand-goldLight">
                      <span>Aromatic Fragrance of Rose</span>
                      <span>PAGE 07</span>
                    </div>

                    {/* Left Page Photography Hero */}
                    <div className="my-auto space-y-3">
                      <div className="relative aspect-square rounded-xl overflow-hidden border border-brand-gold/50 shadow-luxury group">
                        <img
                          src="/assets/prodcut_images/rose_petal_jar_img.jpeg"
                          alt={darkChocolate.name}
                          className="w-full h-full object-cover img-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80" />

                      </div>
                    </div>

                    <div className="border-t border-brand-gold/30 mt-2.5" />
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 4: DARK CHOCOLATE (RIGHT: PAGE 8)
                ========================================== */}
                <Page density="hard" className="paper-inner-crease-right">
                  <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between text-brand-roast relative bg-paper-texture">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-roast/20 pb-2.5 text-[9px] uppercase font-serif tracking-widest text-brand-roast/70">
                      <span>DARK CHOCOLATE DRAGÉE</span>
                      <span>PAGE 08</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-start mt-4 sm:mt-6 mb-auto">
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-brand-roast tracking-tight leading-none">
                          Rose Petal
                        </h3>
                        <p className="font-script text-[1.05rem] sm:text-[1.15rem] lg:text-[1.22rem] text-brand-roast mt-3 sm:mt-4 w-[95%] sm:w-[92%] leading-[1.3] sm:leading-[1.35] text-pretty break-words">
                          Delicate rose flavours meet crunchy almonds in this elegant dragée, beautifully complemented by real rose-petal notes. Floral, mildly sweet, and irresistibly aromatic, it adds a graceful twist to snacking.
                        </p>
                      </div>

                    </div>

                    {/* Price & Cart Actions */}
                    <div className="pt-3 sm:pt-4 border-t border-brand-roast/20 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-xs uppercase text-brand-roast/60 font-bold block mb-0.5">Net Weight {darkChocolate.weight}</span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-roast">₹{darkChocolate.price}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 5: PERI PERI CASHEW (LEFT: PAGE 9)
                ========================================== */}
                <Page density="hard" className="paper-inner-crease-left">
                  <div
                    className="w-full h-full p-5 sm:p-7 flex flex-col justify-between text-brand-cream relative bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(34, 14, 8, 0.85), rgba(20, 8, 4, 0.95)), url('${periPeriCashew.images.ingredients}')` }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-gold/30 pb-2.5 text-[9px] uppercase font-serif tracking-widest text-brand-goldLight">
                      <span>Traditional Middle Eastern Desert </span>
                      <span>PAGE 09</span>
                    </div>

                    {/* Left Page Photography Hero */}
                    <div className="my-auto space-y-3">
                      <div className="relative aspect-square rounded-xl overflow-hidden border border-brand-spice/60 shadow-luxury group">
                        <img
                          src="/assets/prodcut_images/royal_kunafa_jar_img.jpeg"
                          alt={periPeriCashew.name}
                          className="w-full h-full object-cover img-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-spice/80 via-transparent to-transparent opacity-70" />

                      </div>
                    </div>

                    <div className="border-t border-brand-gold/30 mt-2.5" />
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 5: PERI PERI CASHEW (RIGHT: PAGE 10)
                ========================================== */}
                <Page density="hard" className="paper-inner-crease-right">
                  <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between text-brand-roast relative bg-paper-texture">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-roast/20 pb-2.5 text-[9px] uppercase font-serif tracking-widest text-brand-roast/70">
                      <span>PERI PERI CASHEW SNACK</span>
                      <span>PAGE 10</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-start mt-4 sm:mt-6 mb-auto">
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-brand-roast tracking-tight leading-none">
                          Royal Kunafa
                        </h3>
                        <p className="font-script text-[1.05rem] sm:text-[1.15rem] lg:text-[1.22rem] text-brand-roast mt-3 sm:mt-4 w-[95%] sm:w-[92%] leading-[1.3] sm:leading-[1.35] text-pretty break-words">
                          A royal combination of crunchy almonds, delicate kunafa-inspired flavours, and pistachio goodness. Rich, nutty, and indulgent, this unique dragée transforms the beloved Middle Eastern dessert into an irresistible snack.
                        </p>
                      </div>

                    </div>

                    {/* Price & Cart Actions */}
                    <div className="pt-3 sm:pt-4 border-t border-brand-roast/20 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-xs uppercase text-brand-roast/60 font-bold block mb-0.5">Net Weight {periPeriCashew.weight}</span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-roast">₹{periPeriCashew.price}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 6: CUSTOM FLAVOUR (LEFT: PAGE 11)
                ========================================== */}
                <Page density="hard" className="paper-inner-crease-left">
                  <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between text-brand-cream relative bg-brand-dark overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-gold/30 pb-2.5 text-[9px] uppercase font-serif tracking-widest text-brand-goldLight">
                      <span>FLAVOUR SPREAD • CUSTOM DISCOVERY</span>
                      <span>PAGE 11</span>
                    </div>

                    {/* Left Page Scratch Card Hero */}
                    <div className="my-auto w-full space-y-4">
                      <div className="relative aspect-square w-full max-w-[240px] sm:max-w-[270px] mx-auto">
                        <ScratchCard
                          customFlavour={submittedFlavour}
                          isUnlocked={!!submittedFlavour}
                          imageSrc="/assets/empty_jar_img.png"
                          onScratchComplete={() => setIsCustomFlavourScratched(true)}
                        />
                      </div>

                      {/* Portfolio Message (Revealed after scratching) */}
                      <div className={`text-center transition-opacity duration-1000 ${isCustomFlavourScratched ? 'opacity-100' : 'opacity-0'}`}>
                        <p className="font-serif text-brand-goldLight text-sm sm:text-base leading-relaxed">
                          We will try to add the<br />
                          <span className="font-script text-xl sm:text-2xl text-brand-gold mt-0.5 mb-0.5 inline-block drop-shadow-sm">
                            "{submittedFlavour}"
                          </span><br />
                          in our portfolio.
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-brand-gold/30 mt-2.5" />
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 6: CUSTOM FLAVOUR (RIGHT: PAGE 12)
                ========================================== */}
                <Page density="hard" className="paper-inner-crease-right">
                  <div className="w-full h-full p-5 sm:p-7 flex flex-col justify-between text-brand-roast relative bg-paper-texture">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-roast/20 pb-2.5 text-[9px] uppercase font-serif tracking-widest text-brand-roast/70">
                      <span>CUSTOM FLAVOUR CREATION</span>
                      <span>PAGE 12</span>
                    </div>

                    {/* Right Page Input Form */}
                    <div className="my-auto space-y-4 sm:space-y-5">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-roast tracking-tight">
                        Want a flavour of your choice?
                      </h3>

                      <div className="space-y-3 sm:space-y-4">
                        <input
                          type="text"
                          placeholder="Enter your flavour name..."
                          className="w-full px-3.5 py-2.5 sm:py-3 rounded-lg border-2 border-brand-roast/20 bg-transparent text-brand-roast font-serif text-lg sm:text-xl focus:outline-none focus:border-brand-roast/50 placeholder:text-brand-roast/40 transition-colors"
                          value={customFlavourInput}
                          onChange={(e) => setCustomFlavourInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && customFlavourInput.trim()) {
                              setSubmittedFlavour(customFlavourInput.trim());
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            if (customFlavourInput.trim()) {
                              setSubmittedFlavour(customFlavourInput.trim());
                            }
                          }}
                          disabled={!customFlavourInput.trim()}
                          className="w-full py-2.5 sm:py-3 rounded-full bg-brand-roast text-brand-goldLight font-bold tracking-widest uppercase text-xs sm:text-sm hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Submit
                        </button>
                      </div>

                      {submittedFlavour && (
                        <p className="text-lg font-script text-brand-roast mt-3 text-center">
                          Flavour submitted! Discover it on the left page.
                        </p>
                      )}
                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    PAGE 14: BACK COVER (HARDCOVER)
                ========================================== */}
                <Page density="hard" className="bg-brand-dark shadow-2xl border-4 border-brand-gold/50">
                  <div
                    className="w-full h-full p-6 sm:p-8 flex flex-col justify-between relative bg-cover bg-center text-brand-cream"
                    style={{ backgroundImage: `linear-gradient(rgba(26, 14, 10, 0.8), rgba(36, 21, 15, 0.9)), url('/assets/book_cover_leather.png')` }}
                  >
                    {/* Gold Foil Filigree Corner Frames */}
                    <div className="absolute top-3.5 left-3.5 w-8 h-8 border-t-2 border-l-2 border-brand-gold" />
                    <div className="absolute top-3.5 right-3.5 w-8 h-8 border-t-2 border-r-2 border-brand-gold" />
                    <div className="absolute bottom-3.5 left-3.5 w-8 h-8 border-b-2 border-l-2 border-brand-gold" />
                    <div className="absolute bottom-3.5 right-3.5 w-8 h-8 border-b-2 border-r-2 border-brand-gold" />

                    {/* Back Cover Header */}
                    <div className="text-center pt-4 space-y-1">
                      <span className="text-[9px] uppercase tracking-[0.28em] font-bold text-brand-goldLight">
                        End of Edition Vol. I
                      </span>
                      <div className="w-10 h-[1px] bg-brand-gold/50 mx-auto" />
                    </div>

                    {/* Back Cover Center Branding */}
                    <div className="text-center space-y-3 my-auto px-3">
                      <div className="w-16 h-16 mx-auto rounded-full border border-brand-gold/40 p-1.5 shadow-gold-glow bg-brand-dark/80 flex items-center justify-center">
                        <img
                          src="/assets/logo.jpeg"
                          alt="NuttyBitez Seal"
                          className="w-full h-full object-contain rounded-full"
                        />
                      </div>

                      <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-gold-shine">
                        NUTTYBITEZ
                      </h2>
                      <p className="font-serif italic text-[11px] sm:text-xs text-brand-cream/80 leading-relaxed max-w-xs mx-auto">
                        "Crafted with relentless passion for true food lovers & gourmet connoisseurs."
                      </p>

                      <div className="pt-1.5">
                        <button
                          onClick={() => turnToPage(0)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-brand-gold/40 bg-brand-dark/80 text-brand-goldLight text-xs tracking-wider hover:bg-brand-roast transition-all"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reopen Cover</span>
                        </button>
                      </div>
                    </div>

                    {/* Back Cover Footer */}
                    <div className="text-center space-y-1.5 pb-3 text-[9px] text-brand-cream/60 tracking-widest">
                      <p>© {new Date().getFullYear()} NuttyBitez • All Rights Reserved</p>
                      <p className="font-mono text-[8.5px] text-brand-gold/60">ISBN 978-0-999-NUTTYBITEZ-1</p>
                    </div>
                  </div>
                </Page>

              </Book3D>
            </div>

            {/* Navigation Controls: Floating on sides on desktop (>= md), Positioned beneath book outer corners on mobile (< md) */}
            <button
              onClick={handlePrev}
              className="absolute p-2 sm:p-2.5 md:p-3 rounded-full border border-brand-gold/35 bg-brand-dark/90 text-brand-goldLight hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 ease-in-out z-50 shadow-luxury focus:outline-none"
              style={{
                top: windowWidth >= 768 ? '50%' : 'auto',
                bottom: windowWidth >= 768 ? 'auto' : '8px',
                left: windowWidth >= 768
                  ? '50%'
                  : `max(12px, calc(50% - ${bookDimensions.width / 2}px))`,
                transform: windowWidth >= 768
                  ? `translate(calc(-50% - ${(currentSpread === 0 || currentSpread === totalSpreads) ? bookDimensions.width / 2 + 36 : bookDimensions.width + 36}px), -50%)`
                  : 'none'
              }}
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute p-2 sm:p-2.5 md:p-3 rounded-full border border-brand-gold/35 bg-brand-dark/90 text-brand-goldLight hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 ease-in-out z-50 shadow-luxury focus:outline-none"
              style={{
                top: windowWidth >= 768 ? '50%' : 'auto',
                bottom: windowWidth >= 768 ? 'auto' : '8px',
                left: windowWidth >= 768 ? '50%' : 'auto',
                right: windowWidth >= 768
                  ? 'auto'
                  : `max(12px, calc(50% - ${bookDimensions.width / 2}px))`,
                transform: windowWidth >= 768
                  ? `translate(calc(-50% + ${(currentSpread === 0 || currentSpread === totalSpreads) ? bookDimensions.width / 2 + 36 : bookDimensions.width + 36}px), -50%)`
                  : 'none'
              }}
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default DigitalFlavourBook;
