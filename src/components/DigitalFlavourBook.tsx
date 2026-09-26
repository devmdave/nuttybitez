import React, { useState, useRef, useEffect, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
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
      className={`page relative bg-[#FAF3E8] overflow-hidden select-none border-r border-brand-roast/10 ${props.className || ''}`}
      ref={ref}
      data-density={props.density || 'soft'}
      style={props.bgStyle}
    >
      {props.children}
    </div>
  );
});
Page.displayName = 'Page';

export const DigitalFlavourBook: React.FC<DigitalFlavourBookProps> = ({ onNavigate }) => {
  const flipBookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(15);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [bookDimensions, setBookDimensions] = useState({ width: 480, height: 660 });
  const { addToCart, setQuickViewProduct } = useCart();
  const [addedAnimationProduct, setAddedAnimationProduct] = useState<string | null>(null);

  // Responsive Book Sizing calculation
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 640) {
        // Mobile portrait single/scaled view
        setBookDimensions({
          width: Math.min(windowWidth - 32, 360),
          height: Math.min(windowWidth * 1.35, 520)
        });
      } else if (windowWidth < 1024) {
        // Tablet view
        setBookDimensions({
          width: 380,
          height: 540
        });
      } else if (windowWidth < 1400) {
        // Standard Desktop
        setBookDimensions({
          width: 460,
          height: 640
        });
      } else {
        // Wide Desktop
        setBookDimensions({
          width: 500,
          height: 680
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

  // Handle Page Turn Events
  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
    playPageFlipSound();
  }, [playPageFlipSound]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!flipBookRef.current) return;
      const pageFlipInstance = flipBookRef.current.pageFlip();
      if (!pageFlipInstance) return;

      if (e.key === 'ArrowRight') {
        pageFlipInstance.flipNext();
      } else if (e.key === 'ArrowLeft') {
        pageFlipInstance.flipPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Jump to specific page
  const turnToPage = (pageIndex: number) => {
    if (!flipBookRef.current) return;
    const pageFlipInstance = flipBookRef.current.pageFlip();
    if (pageFlipInstance) {
      pageFlipInstance.turnToPage(pageIndex);
    }
  };

  const handleNext = () => {
    if (!flipBookRef.current) return;
    flipBookRef.current.pageFlip().flipNext();
  };

  const handlePrev = () => {
    if (!flipBookRef.current) return;
    flipBookRef.current.pageFlip().flipPrev();
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
    <section id="flavour-book" className="py-20 sm:py-24 bg-brand-dark relative overflow-hidden select-none">

      {/* Background Subtle Texture & Ambient Glow */}
      <div className="absolute inset-0 opacity-15 bg-dark-paper pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-brand-cream tracking-wide">
            OUR PRODUCTS
          </h2>
          <div className="w-24 h-[2px] bg-gold-gradient mx-auto" />
          <p className="text-brand-cream/80 font-serif text-lg sm:text-xl italic">
            "Flip through our artisanal pages. Drag a corner to turn the page."
          </p>
        </div>



        {/* 3D BOOK CONTAINER WRAPPER */}
        <div className="relative max-w-6xl mx-auto flex flex-col items-center">

          {/* Stacked Pages Bottom Shadow Base */}
          <div className="w-full flex justify-center items-center py-4 relative">

            {/* The 3D FlipBook Render */}
            <div className="relative rounded-2xl overflow-visible book-container-shadow">

              {/* Spine Line Gradient Overlay */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 z-30 book-spine-shadow pointer-events-none hidden sm:block" />

              {/* Bookmark Ribbon Hanging from Top */}
              <div className="absolute top-0 right-12 z-40 hidden sm:block pointer-events-none">
                <div className="w-4 h-16 bg-brand-gold shadow-md relative">
                  <div className="absolute -bottom-2 left-0 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-brand-gold" />
                </div>
              </div>

              {/* HTMLFlipBook Engine */}
              <HTMLFlipBook
                ref={flipBookRef}
                width={bookDimensions.width}
                height={bookDimensions.height}
                size="fixed"
                minWidth={300}
                maxWidth={600}
                minHeight={400}
                maxHeight={800}
                maxShadowOpacity={0.6}
                showCover={true}
                mobileScrollSupport={true}
                clickEventForward={true}
                useMouseEvents={true}
                usePortrait={false}
                startPage={0}
                drawShadow={true}
                flippingTime={800}
                startZIndex={1}
                autoSize={true}
                showPageCorners={true}
                disableFlipByClick={false}
                swipeDistance={30}
                onFlip={onFlip}
                className="mx-auto rounded-lg shadow-2xl"
                style={{ margin: '0 auto' }}
              >

                {/* ==========================================
                    PAGE 0: FRONT COVER (HARDCOVER)
                ========================================== */}
                <Page density="hard" className="bg-brand-dark shadow-2xl border-4 border-brand-gold/50">
                  <div
                    className="w-full h-full p-8 sm:p-12 flex flex-col justify-between relative bg-cover bg-center text-brand-cream"
                    style={{ backgroundImage: `linear-gradient(rgba(26, 14, 10, 0.75), rgba(36, 21, 15, 0.85)), url('/assets/book_cover_leather.png')` }}
                  >
                    {/* Gold Foil Filigree Corner Frames */}
                    <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-brand-gold" />
                    <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-brand-gold" />
                    <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-brand-gold" />
                    <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-brand-gold" />

                    {/* Cover Top Header */}
                    <div className="text-center pt-6 space-y-2">
                      <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-brand-goldLight gold-foil-emboss">
                        PREMIUM MUNCHING FOREVER
                      </span>
                      <div className="w-12 h-[1px] bg-brand-gold/60 mx-auto" />
                    </div>

                    {/* Cover Center Title & Emblem */}
                    <div className="text-center space-y-6 my-auto px-4">
                      <div className="w-24 h-24 mx-auto rounded-full border-2 border-brand-gold/60 p-2 shadow-gold-glow bg-brand-dark/80 flex items-center justify-center">
                        <img
                          src="/assets/logo.jpeg"
                          alt="NuttyBitez Logo"
                          className="w-full h-full object-contain rounded-full border border-brand-gold/40"
                        />
                      </div>

                      <div className="space-y-2">
                        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-wider text-gold-shine">
                          NUTTYBITEZ
                        </h1>
                        <p className="text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-brand-cream/80">
                          Digital Flavour Book
                        </p>
                        <p className="font-serif italic text-sm text-brand-goldLight/90">
                          Volume I • First Edition
                        </p>
                      </div>
                    </div>

                    {/* Cover Footer & Flip Hint */}
                    <div className="text-center space-y-3 pb-4">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/40 bg-brand-dark/90 text-brand-goldLight text-xs tracking-wider animate-bounce">
                        <Compass className="w-4 h-4" />
                        <span>Click or Drag Corner to Open</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-brand-cream/50">
                        PREMIUM MUNCHING FOREVER
                      </p>
                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    PAGE 1: INSIDE COVER / INTRODUCTION (LEFT)
                ========================================== */}
                <Page density="soft" className="paper-inner-crease-left border-r border-brand-roast/15">
                  <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between text-brand-roast relative bg-paper-texture">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-roast/20 pb-3 text-[10px] uppercase font-serif tracking-widest text-brand-roast/70">
                      <span>NUTTYBITEZ • HERITAGE & CRAFT</span>
                      <span>PAGE 01</span>
                    </div>

                    {/* Content */}
                    <div className="space-y-6 my-auto">
                      <div className="space-y-2">
                        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-gold">
                          Welcome Connoisseur
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-roast">
                          The Art of the Gourmet Dragée
                        </h2>
                        <div className="w-12 h-[2px] bg-brand-gold" />
                      </div>

                      <p className="text-sm leading-relaxed text-brand-roast/85 font-sans font-normal">
                        At NuttyBitez, we transform whole California almonds and Mangalore jumbo cashews into extraordinary culinary experiences. Every dragée is slow-tossed in traditional copper kettles with multi-layered infusions of single-origin cocoa, authentic botanicals, and hand-milled spices.
                      </p>

                      {/* Craftsmanship Image Frame */}
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-md border border-brand-gold/40 group">
                        <img
                          src="/assets/all_packagings.jpeg"
                          alt="NuttyBitez Craftsmanship"
                          className="w-full h-full object-cover img-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />
                        <span className="absolute bottom-2 left-3 text-[10px] uppercase font-bold text-brand-cream tracking-widest">
                          The 5 Signature Masterpieces
                        </span>
                      </div>

                      {/* Artisanal Seal */}
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-roast/5 border border-brand-roast/15">
                        <Award className="w-8 h-8 text-brand-gold flex-shrink-0" />
                        <div className="text-xs">
                          <span className="font-bold text-brand-roast block">100% Artisanal Quality</span>
                          <span className="text-brand-roast/70 text-[11px]">No artificial preservatives, pure cocoa butter & natural flavours.</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Page Number */}
                    <div className="pt-4 border-t border-brand-roast/15 text-center text-[10px] uppercase tracking-widest text-brand-roast/60">
                      Crafted in India • Delivered Worldwide
                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    PAGE 2: TABLE OF CONTENTS (RIGHT)
                ========================================== */}
                <Page density="soft" className="paper-inner-crease-right">
                  <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between text-brand-roast relative bg-paper-texture">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-roast/20 pb-3 text-[10px] uppercase font-serif tracking-widest text-brand-roast/70">
                      <span>TABLE OF CONTENTS</span>
                      <span>PAGE 02</span>
                    </div>

                    {/* Directory List */}
                    <div className="space-y-4 my-auto">
                      <div className="text-center space-y-1">
                        <h3 className="font-serif text-2xl font-bold text-brand-roast">Flavour Index</h3>
                        <p className="text-xs italic font-serif text-brand-roast/70">Select a spread to jump directly</p>
                      </div>

                      <div className="space-y-2 pt-2">
                        {[
                          { title: 'Paan Shot', desc: 'Refreshing Paan & White Chocolate', page: 3, num: '01' },
                          { title: 'Coffee Tiramisu', desc: 'Espresso & Creamy Tiramisu', page: 5, num: '02' },
                          { title: 'Choco Crunch', desc: 'Rich Milk Chocolate & Almond', page: 7, num: '03' },
                          { title: 'Dark Chocolate', desc: '70% Single Origin Cacao', page: 9, num: '04' },
                          { title: 'Peri Peri Cashew', desc: 'Fiery Birdseye Chili & Cashews', page: 11, num: '05' },
                          { title: 'The NuttyBitez Ethos', desc: 'Artisanal Promise & Orders', page: 13, num: '06' },
                        ].map((item) => (
                          <div
                            key={item.num}
                            onClick={() => turnToPage(item.page)}
                            className="flex items-center justify-between p-3 rounded-lg border border-brand-roast/15 bg-white/50 hover:bg-brand-roast hover:text-brand-cream transition-all duration-300 cursor-pointer group shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-serif text-sm font-bold text-brand-gold group-hover:text-brand-goldLight">
                                {item.num}.
                              </span>
                              <div>
                                <span className="font-serif font-bold text-sm block group-hover:text-brand-cream">
                                  {item.title}
                                </span>
                                <span className="text-[11px] text-brand-roast/70 group-hover:text-brand-cream/70">
                                  {item.desc}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-roast/60 group-hover:text-brand-gold">
                              <span>SPREAD #{item.num}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Prompt */}
                    <div className="pt-4 border-t border-brand-roast/15 flex items-center justify-between text-[11px] text-brand-roast/70">
                      <span>Turn page to begin tasting journey</span>
                      <BookOpen className="w-4 h-4 text-brand-gold" />
                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 2: PAAN SHOT (LEFT: PAGE 3)
                ========================================== */}
                <Page density="soft" className="paper-inner-crease-left">
                  <div
                    className="w-full h-full p-6 sm:p-10 flex flex-col justify-between text-brand-cream relative bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(26, 41, 17, 0.85), rgba(15, 26, 10, 0.95)), url('${paanShot.images.ingredients}')` }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-gold/30 pb-3 text-[10px] uppercase font-serif tracking-widest text-brand-goldLight">
                      <span>FLAVOUR SPREAD • BOTANICAL GREEN</span>
                      <span>PAGE 03</span>
                    </div>

                    {/* Left Page Photography Hero */}
                    <div className="my-auto space-y-4">
                      <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-brand-gold/50 shadow-luxury group">
                        <img
                          src={paanShot.images.poster}
                          alt={paanShot.name}
                          className="w-full h-full object-cover img-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-botanicalDark via-transparent to-transparent opacity-80" />

                        <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-brand-botanicalDark/90 border border-brand-gold/40 backdrop-blur-md">
                          <span className="text-[10px] uppercase tracking-widest text-brand-goldLight font-bold block mb-1">
                            Botanical Atmosphere
                          </span>
                          <p className="font-serif italic text-xs text-brand-cream">
                            Betel Leaves • Sweet Saunf • Dried Pink Rose Petals • Almonds
                          </p>
                        </div>
                      </div>

                      {/* Ingredient Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {paanShot.ingredients.map((ing, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-brand-leaf/40 border border-brand-gold/30 text-brand-cream">
                            🌱 {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-brand-gold/30 text-center text-[10px] text-brand-goldLight uppercase tracking-widest">
                      Iconic Indian Digestif Reimagined
                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 2: PAAN SHOT (RIGHT: PAGE 4)
                ========================================== */}
                <Page density="soft" className="paper-inner-crease-right">
                  <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between text-brand-roast relative bg-paper-texture">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-roast/20 pb-3 text-[10px] uppercase font-serif tracking-widest text-brand-roast/70">
                      <span>PAAN SHOT DRAGÉE</span>
                      <span>PAGE 04</span>
                    </div>

                    {/* Right Page Editorial Content */}
                    <div className="space-y-4 my-auto">
                      <div>
                        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-leaf block mb-1">
                          Fresh & Aromatic Digestif
                        </span>
                        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-roast tracking-tight">
                          {paanShot.name}
                        </h3>
                        <p className="font-script text-xl sm:text-2xl text-brand-gold mt-0.5">
                          {paanShot.flavour}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-brand-roast/80 leading-relaxed font-sans font-normal">
                        {paanShot.description}
                      </p>

                      {/* Taste Profile Ratings */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-brand-roast/15 text-center bg-white/40 rounded-xl p-3">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-roast/60 font-bold block">Aroma</span>
                          <span className="font-serif text-lg font-bold text-brand-leaf">98%</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-roast/60 font-bold block">Crunch</span>
                          <span className="font-serif text-lg font-bold text-brand-leaf">90%</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-roast/60 font-bold block">Freshness</span>
                          <span className="font-serif text-lg font-bold text-brand-leaf">95%</span>
                        </div>
                      </div>

                      {/* Hero Ingredient Badge */}
                      <div className="p-3 rounded-xl bg-brand-leaf/10 border border-brand-leaf/20 text-xs">
                        <span className="font-bold text-brand-leaf block mb-0.5 uppercase text-[10px] tracking-wider">
                          Hero Ingredient Environment
                        </span>
                        <p className="text-brand-roast/80 text-[11px]">
                          Authentic Indian betel leaf extract combined with sweet saunf & crushed dried pink rose petals.
                        </p>
                      </div>
                    </div>

                    {/* Price & Cart Actions */}
                    <div className="pt-4 border-t border-brand-roast/20 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase text-brand-roast/60 font-bold block">Net Weight {paanShot.weight}</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-serif text-2xl font-bold text-brand-roast">₹{paanShot.price}</span>
                          <span className="text-xs line-through text-brand-roast/40">₹{paanShot.originalPrice}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQuickViewProduct(paanShot)}
                          className="p-2.5 rounded-full border border-brand-roast/30 text-brand-roast hover:bg-brand-roast/10 transition-colors"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleAddToCart(paanShot, e)}
                          className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold text-brand-dark bg-gold-gradient shadow-md hover:brightness-110 flex items-center gap-1.5 transition-all transform hover:scale-105"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{addedAnimationProduct === paanShot.id ? 'Added!' : 'Add to Cart'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 3: COFFEE TIRAMISU (LEFT: PAGE 5)
                ========================================== */}
                <Page density="soft" className="paper-inner-crease-left">
                  <div
                    className="w-full h-full p-6 sm:p-10 flex flex-col justify-between text-brand-cream relative bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(36, 21, 15, 0.85), rgba(20, 10, 5, 0.95)), url('/assets/coffee_tiramisu_ingredients.png')` }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-gold/30 pb-3 text-[10px] uppercase font-serif tracking-widest text-brand-goldLight">
                      <span>FLAVOUR SPREAD • ESPRESSO TONES</span>
                      <span>PAGE 05</span>
                    </div>

                    {/* Left Page Photography Hero */}
                    <div className="my-auto space-y-4">
                      <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-brand-gold/50 shadow-luxury group">
                        <img
                          src={coffeeTiramisu.images.poster}
                          alt={coffeeTiramisu.name}
                          className="w-full h-full object-cover img-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso via-transparent to-transparent opacity-80" />

                        <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-brand-espresso/90 border border-brand-gold/40 backdrop-blur-md">
                          <span className="text-[10px] uppercase tracking-widest text-brand-goldLight font-bold block mb-1">
                            Coffee & Cream Environment
                          </span>
                          <p className="font-serif italic text-xs text-brand-cream">
                            Roasted Arabica Coffee Beans • Tiramisu Cream • Cocoa Nibs
                          </p>
                        </div>
                      </div>

                      {/* Ingredient Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {coffeeTiramisu.ingredients.map((ing, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-brand-roast/60 border border-brand-gold/30 text-brand-cream">
                            ☕ {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-brand-gold/30 text-center text-[10px] text-brand-goldLight uppercase tracking-widest">
                      A Coffee Connoisseur's Dream
                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 3: COFFEE TIRAMISU (RIGHT: PAGE 6)
                ========================================== */}
                <Page density="soft" className="paper-inner-crease-right">
                  <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between text-brand-roast relative bg-paper-texture">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-roast/20 pb-3 text-[10px] uppercase font-serif tracking-widest text-brand-roast/70">
                      <span>COFFEE TIRAMISU DRAGÉE</span>
                      <span>PAGE 06</span>
                    </div>

                    {/* Right Page Content */}
                    <div className="space-y-4 my-auto">
                      <div>
                        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-gold block mb-1">
                          Rich Coffee Connoisseur Selection
                        </span>
                        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-roast tracking-tight">
                          {coffeeTiramisu.name}
                        </h3>
                        <p className="font-script text-xl sm:text-2xl text-brand-gold mt-0.5">
                          {coffeeTiramisu.flavour}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-brand-roast/80 leading-relaxed font-sans font-normal">
                        {coffeeTiramisu.description}
                      </p>

                      {/* Taste Profile Ratings */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-brand-roast/15 text-center bg-white/40 rounded-xl p-3">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-roast/60 font-bold block">Coffee Aroma</span>
                          <span className="font-serif text-lg font-bold text-brand-roast">94%</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-roast/60 font-bold block">Richness</span>
                          <span className="font-serif text-lg font-bold text-brand-roast">95%</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-roast/60 font-bold block">Crunch</span>
                          <span className="font-serif text-lg font-bold text-brand-roast">88%</span>
                        </div>
                      </div>

                      {/* Hero Ingredient Badge */}
                      <div className="p-3 rounded-xl bg-brand-gold/15 border border-brand-gold/30 text-xs">
                        <span className="font-bold text-brand-roast block mb-0.5 uppercase text-[10px] tracking-wider">
                          Hero Ingredient Environment
                        </span>
                        <p className="text-brand-roast/80 text-[11px]">
                          Single-origin Arabica espresso dust combined with Italian mascarpone white chocolate cream.
                        </p>
                      </div>
                    </div>

                    {/* Price & Cart Actions */}
                    <div className="pt-4 border-t border-brand-roast/20 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase text-brand-roast/60 font-bold block">Net Weight {coffeeTiramisu.weight}</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-serif text-2xl font-bold text-brand-roast">₹{coffeeTiramisu.price}</span>
                          <span className="text-xs line-through text-brand-roast/40">₹{coffeeTiramisu.originalPrice}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQuickViewProduct(coffeeTiramisu)}
                          className="p-2.5 rounded-full border border-brand-roast/30 text-brand-roast hover:bg-brand-roast/10 transition-colors"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleAddToCart(coffeeTiramisu, e)}
                          className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold text-brand-dark bg-gold-gradient shadow-md hover:brightness-110 flex items-center gap-1.5 transition-all transform hover:scale-105"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{addedAnimationProduct === coffeeTiramisu.id ? 'Added!' : 'Add to Cart'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 4: CHOCO CRUNCH (LEFT: PAGE 7)
                ========================================== */}
                <Page density="soft" className="paper-inner-crease-left">
                  <div
                    className="w-full h-full p-6 sm:p-10 flex flex-col justify-between text-brand-cream relative bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(46, 27, 18, 0.85), rgba(26, 14, 10, 0.95)), url('${chocoCrunch.images.ingredients}')` }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-gold/30 pb-3 text-[10px] uppercase font-serif tracking-widest text-brand-goldLight">
                      <span>FLAVOUR SPREAD • MILK CHOCOLATE</span>
                      <span>PAGE 07</span>
                    </div>

                    {/* Left Page Photography Hero */}
                    <div className="my-auto space-y-4">
                      <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-brand-gold/50 shadow-luxury group">
                        <img
                          src={chocoCrunch.images.poster}
                          alt={chocoCrunch.name}
                          className="w-full h-full object-cover img-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80" />

                        <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-brand-dark/90 border border-brand-gold/40 backdrop-blur-md">
                          <span className="text-[10px] uppercase tracking-widest text-brand-goldLight font-bold block mb-1">
                            Milk Chocolate & Almonds
                          </span>
                          <p className="font-serif italic text-xs text-brand-cream">
                            Roasted California Almonds • Smooth Cocoa • Cane Sugar
                          </p>
                        </div>
                      </div>

                      {/* Ingredient Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {chocoCrunch.ingredients.map((ing, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-brand-cocoa/60 border border-brand-gold/30 text-brand-cream">
                            🍫 {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-brand-gold/30 text-center text-[10px] text-brand-goldLight uppercase tracking-widest">
                      Rich • Crunchy • Addictive
                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 4: CHOCO CRUNCH (RIGHT: PAGE 8)
                ========================================== */}
                <Page density="soft" className="paper-inner-crease-right">
                  <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between text-brand-roast relative bg-paper-texture">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-roast/20 pb-3 text-[10px] uppercase font-serif tracking-widest text-brand-roast/70">
                      <span>CHOCO CRUNCH DRAGÉE</span>
                      <span>PAGE 08</span>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 my-auto">
                      <div>
                        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-gold block mb-1">
                          Classic Dragée Masterpiece
                        </span>
                        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-roast tracking-tight">
                          {chocoCrunch.name}
                        </h3>
                        <p className="font-script text-xl sm:text-2xl text-brand-gold mt-0.5">
                          {chocoCrunch.flavour}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-brand-roast/80 leading-relaxed font-sans font-normal">
                        {chocoCrunch.description}
                      </p>

                      {/* Taste Profile Ratings */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-brand-roast/15 text-center bg-white/40 rounded-xl p-3">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-roast/60 font-bold block">Crunch</span>
                          <span className="font-serif text-lg font-bold text-brand-roast">95%</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-roast/60 font-bold block">Sweetness</span>
                          <span className="font-serif text-lg font-bold text-brand-roast">75%</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-roast/60 font-bold block">Richness</span>
                          <span className="font-serif text-lg font-bold text-brand-roast">90%</span>
                        </div>
                      </div>

                      {/* Hero Ingredient Badge */}
                      <div className="p-3 rounded-xl bg-brand-gold/15 border border-brand-gold/30 text-xs">
                        <span className="font-bold text-brand-roast block mb-0.5 uppercase text-[10px] tracking-wider">
                          Hero Ingredient Environment
                        </span>
                        <p className="text-brand-roast/80 text-[11px]">
                          Golden roasted California almonds encased in smooth milk chocolate dragée layers.
                        </p>
                      </div>
                    </div>

                    {/* Price & Cart Actions */}
                    <div className="pt-4 border-t border-brand-roast/20 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase text-brand-roast/60 font-bold block">Net Weight {chocoCrunch.weight}</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-serif text-2xl font-bold text-brand-roast">₹{chocoCrunch.price}</span>
                          <span className="text-xs line-through text-brand-roast/40">₹{chocoCrunch.originalPrice}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQuickViewProduct(chocoCrunch)}
                          className="p-2.5 rounded-full border border-brand-roast/30 text-brand-roast hover:bg-brand-roast/10 transition-colors"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleAddToCart(chocoCrunch, e)}
                          className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold text-brand-dark bg-gold-gradient shadow-md hover:brightness-110 flex items-center gap-1.5 transition-all transform hover:scale-105"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{addedAnimationProduct === chocoCrunch.id ? 'Added!' : 'Add to Cart'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 5: DARK CHOCOLATE (LEFT: PAGE 9)
                ========================================== */}
                <Page density="soft" className="paper-inner-crease-left">
                  <div
                    className="w-full h-full p-6 sm:p-10 flex flex-col justify-between text-brand-cream relative bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(26, 14, 10, 0.9), rgba(15, 8, 5, 0.95)), url('/assets/dark_chocolate_ingredients.png')` }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-gold/30 pb-3 text-[10px] uppercase font-serif tracking-widest text-brand-goldLight">
                      <span>FLAVOUR SPREAD • 70% DARK CACAO</span>
                      <span>PAGE 09</span>
                    </div>

                    {/* Left Page Photography Hero */}
                    <div className="my-auto space-y-4">
                      <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-brand-gold/50 shadow-luxury group">
                        <img
                          src={darkChocolate.images.poster}
                          alt={darkChocolate.name}
                          className="w-full h-full object-cover img-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80" />

                        <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-brand-dark/95 border border-brand-gold/40 backdrop-blur-md">
                          <span className="text-[10px] uppercase tracking-widest text-brand-goldLight font-bold block mb-1">
                            Single-Origin Cacao Pods & Nibs
                          </span>
                          <p className="font-serif italic text-xs text-brand-cream">
                            70% Dark Cocoa Mass • Roasted Almonds • Cocoa Nibs
                          </p>
                        </div>
                      </div>

                      {/* Ingredient Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {darkChocolate.ingredients.map((ing, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-brand-dark/80 border border-brand-gold/30 text-brand-cream">
                            🍫 {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-brand-gold/30 text-center text-[10px] text-brand-goldLight uppercase tracking-widest">
                      Intense • Rich • Bittersweet Indulgence
                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 5: DARK CHOCOLATE (RIGHT: PAGE 10)
                ========================================== */}
                <Page density="soft" className="paper-inner-crease-right">
                  <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between text-brand-roast relative bg-paper-texture">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-roast/20 pb-3 text-[10px] uppercase font-serif tracking-widest text-brand-roast/70">
                      <span>DARK CHOCOLATE DRAGÉE</span>
                      <span>PAGE 10</span>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 my-auto">
                      <div>
                        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-gold block mb-1">
                          70% Pure Dark Cocoa Purist
                        </span>
                        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-roast tracking-tight">
                          {darkChocolate.name}
                        </h3>
                        <p className="font-script text-xl sm:text-2xl text-brand-gold mt-0.5">
                          {darkChocolate.flavour}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-brand-roast/80 leading-relaxed font-sans font-normal">
                        {darkChocolate.description}
                      </p>

                      {/* Taste Profile Ratings */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-brand-roast/15 text-center bg-white/40 rounded-xl p-3">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-roast/60 font-bold block">Richness</span>
                          <span className="font-serif text-lg font-bold text-brand-roast">98%</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-roast/60 font-bold block">Crunch</span>
                          <span className="font-serif text-lg font-bold text-brand-roast">92%</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-roast/60 font-bold block">Bittersweet</span>
                          <span className="font-serif text-lg font-bold text-brand-roast">85%</span>
                        </div>
                      </div>

                      {/* Hero Ingredient Badge */}
                      <div className="p-3 rounded-xl bg-brand-gold/15 border border-brand-gold/30 text-xs">
                        <span className="font-bold text-brand-roast block mb-0.5 uppercase text-[10px] tracking-wider">
                          Hero Ingredient Environment
                        </span>
                        <p className="text-brand-roast/80 text-[11px]">
                          70% single-origin dark cacao shell zero artificial additives or palm oils.
                        </p>
                      </div>
                    </div>

                    {/* Price & Cart Actions */}
                    <div className="pt-4 border-t border-brand-roast/20 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase text-brand-roast/60 font-bold block">Net Weight {darkChocolate.weight}</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-serif text-2xl font-bold text-brand-roast">₹{darkChocolate.price}</span>
                          <span className="text-xs line-through text-brand-roast/40">₹{darkChocolate.originalPrice}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQuickViewProduct(darkChocolate)}
                          className="p-2.5 rounded-full border border-brand-roast/30 text-brand-roast hover:bg-brand-roast/10 transition-colors"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleAddToCart(darkChocolate, e)}
                          className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold text-brand-dark bg-gold-gradient shadow-md hover:brightness-110 flex items-center gap-1.5 transition-all transform hover:scale-105"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{addedAnimationProduct === darkChocolate.id ? 'Added!' : 'Add to Cart'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 6: PERI PERI CASHEW (LEFT: PAGE 11)
                ========================================== */}
                <Page density="soft" className="paper-inner-crease-left">
                  <div
                    className="w-full h-full p-6 sm:p-10 flex flex-col justify-between text-brand-cream relative bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(34, 14, 8, 0.85), rgba(20, 8, 4, 0.95)), url('${periPeriCashew.images.ingredients}')` }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-gold/30 pb-3 text-[10px] uppercase font-serif tracking-widest text-brand-goldLight">
                      <span>FLAVOUR SPREAD • FIERY SPICE</span>
                      <span>PAGE 11</span>
                    </div>

                    {/* Left Page Photography Hero */}
                    <div className="my-auto space-y-4">
                      <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-brand-spice/60 shadow-luxury group">
                        <img
                          src={periPeriCashew.images.poster}
                          alt={periPeriCashew.name}
                          className="w-full h-full object-cover img-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-spice/80 via-transparent to-transparent opacity-70" />

                        <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-brand-dark/95 border border-brand-spice/50 backdrop-blur-md">
                          <span className="text-[10px] uppercase tracking-widest text-brand-spice font-bold block mb-1">
                            Fiery Chili & Cashew Atmosphere
                          </span>
                          <p className="font-serif italic text-xs text-brand-cream">
                            Jumbo Mangalore Cashews • Birdseye Chili • Lemon Zest
                          </p>
                        </div>
                      </div>

                      {/* Ingredient Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {periPeriCashew.ingredients.map((ing, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-brand-spice/40 border border-brand-spice/50 text-brand-cream">
                            🌶️ {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-brand-gold/30 text-center text-[10px] text-brand-goldLight uppercase tracking-widest">
                      Spicy • Savoury • Crispy Crunch
                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 6: PERI PERI CASHEW (RIGHT: PAGE 12)
                ========================================== */}
                <Page density="soft" className="paper-inner-crease-right">
                  <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between text-brand-roast relative bg-paper-texture">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-roast/20 pb-3 text-[10px] uppercase font-serif tracking-widest text-brand-roast/70">
                      <span>PERI PERI CASHEW SNACK</span>
                      <span>PAGE 12</span>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 my-auto">
                      <div>
                        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-spice block mb-1">
                          Bold Savoury Snack
                        </span>
                        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-roast tracking-tight">
                          {periPeriCashew.name}
                        </h3>
                        <p className="font-script text-xl sm:text-2xl text-brand-spice mt-0.5">
                          {periPeriCashew.flavour}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-brand-roast/80 leading-relaxed font-sans font-normal">
                        {periPeriCashew.description}
                      </p>

                      {/* Taste Profile Ratings */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-brand-roast/15 text-center bg-white/40 rounded-xl p-3">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-roast/60 font-bold block">Spice Heat</span>
                          <span className="font-serif text-lg font-bold text-brand-spice">90%</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-roast/60 font-bold block">Crunch</span>
                          <span className="font-serif text-lg font-bold text-brand-roast">96%</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-roast/60 font-bold block">Aroma</span>
                          <span className="font-serif text-lg font-bold text-brand-roast">92%</span>
                        </div>
                      </div>

                      {/* Hero Ingredient Badge */}
                      <div className="p-3 rounded-xl bg-brand-spice/15 border border-brand-spice/30 text-xs">
                        <span className="font-bold text-brand-spice block mb-0.5 uppercase text-[10px] tracking-wider">
                          Hero Ingredient Environment
                        </span>
                        <p className="text-brand-roast/80 text-[11px]">
                          Mangalore jumbo cashews tossed in birdseye chili, garlic, lemon zest & Himalayan pink salt.
                        </p>
                      </div>
                    </div>

                    {/* Price & Cart Actions */}
                    <div className="pt-4 border-t border-brand-roast/20 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase text-brand-roast/60 font-bold block">Net Weight {periPeriCashew.weight}</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-serif text-2xl font-bold text-brand-roast">₹{periPeriCashew.price}</span>
                          <span className="text-xs line-through text-brand-roast/40">₹{periPeriCashew.originalPrice}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQuickViewProduct(periPeriCashew)}
                          className="p-2.5 rounded-full border border-brand-roast/30 text-brand-roast hover:bg-brand-roast/10 transition-colors"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleAddToCart(periPeriCashew, e)}
                          className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold text-brand-dark bg-gold-gradient shadow-md hover:brightness-110 flex items-center gap-1.5 transition-all transform hover:scale-105"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{addedAnimationProduct === periPeriCashew.id ? 'Added!' : 'Add to Cart'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    SPREAD 7: FINAL BRAND PAGE (LEFT: PAGE 13)
                ========================================== */}
                <Page density="soft" className="paper-inner-crease-left">
                  <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between text-brand-roast relative bg-paper-texture">

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-brand-roast/20 pb-3 text-[10px] uppercase font-serif tracking-widest text-brand-roast/70">
                      <span>THE NUTTYBITEZ PROMISE</span>
                      <span>PAGE 13</span>
                    </div>

                    {/* Left Page Summary & All-Products Box */}
                    <div className="space-y-5 my-auto text-center">
                      <div className="w-14 h-14 mx-auto rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold">
                        <ShieldCheck className="w-7 h-7 text-brand-gold" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-roast">
                          The Complete Flavour Collection
                        </h3>
                        <p className="text-xs text-brand-roast/70 font-serif italic">
                          Experience all 5 signature creations in one luxury gift package
                        </p>
                      </div>

                      {/* Collection Image */}
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-md border border-brand-gold/40">
                        <img
                          src="/assets/all_packagings.jpeg"
                          alt="NuttyBitez Box Set"
                          className="w-full h-full object-cover img-zoom"
                        />
                      </div>

                      <div className="p-4 rounded-xl bg-brand-roast text-brand-cream space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold border-b border-brand-cream/20 pb-2">
                          <span>ALL 5 SIGNATURE PACKAGINGS</span>
                          <span className="text-brand-goldLight">₹745 (SAVE 25%)</span>
                        </div>
                        <button
                          onClick={handleAddAllToCart}
                          className="w-full py-2.5 rounded-lg text-xs uppercase tracking-widest font-bold text-brand-dark bg-gold-gradient shadow-md hover:brightness-110 flex items-center justify-center gap-2 transition-transform transform active:scale-95"
                        >
                          <PackageCheck className="w-4 h-4" />
                          <span>{addedAnimationProduct === 'all-products' ? 'Added All 5 Packagings!' : 'Order Complete Flavour Bundle'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 border-t border-brand-roast/15 text-center text-[10px] uppercase tracking-widest text-brand-roast/60">
                      Free express shipping across India on orders over ₹499
                    </div>
                  </div>
                </Page>

                {/* ==========================================
                    PAGE 14: BACK COVER (HARDCOVER)
                ========================================== */}
                <Page density="hard" className="bg-brand-dark shadow-2xl border-4 border-brand-gold/50">
                  <div
                    className="w-full h-full p-8 sm:p-12 flex flex-col justify-between relative bg-cover bg-center text-brand-cream"
                    style={{ backgroundImage: `linear-gradient(rgba(26, 14, 10, 0.8), rgba(36, 21, 15, 0.9)), url('/assets/book_cover_leather.png')` }}
                  >
                    {/* Gold Foil Filigree Corner Frames */}
                    <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-brand-gold" />
                    <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-brand-gold" />
                    <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-brand-gold" />
                    <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-brand-gold" />

                    {/* Back Cover Header */}
                    <div className="text-center pt-6 space-y-1">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-goldLight">
                        End of Edition Vol. I
                      </span>
                      <div className="w-12 h-[1px] bg-brand-gold/50 mx-auto" />
                    </div>

                    {/* Back Cover Center Branding */}
                    <div className="text-center space-y-4 my-auto px-4">
                      <div className="w-20 h-20 mx-auto rounded-full border border-brand-gold/40 p-2 shadow-gold-glow bg-brand-dark/80 flex items-center justify-center">
                        <img
                          src="/assets/logo.jpeg"
                          alt="NuttyBitez Seal"
                          className="w-full h-full object-contain rounded-full"
                        />
                      </div>

                      <h2 className="font-serif text-2xl font-bold tracking-wider text-gold-shine">
                        NUTTYBITEZ
                      </h2>
                      <p className="font-serif italic text-xs text-brand-cream/80 leading-relaxed max-w-xs mx-auto">
                        "Crafted with relentless passion for true food lovers & gourmet connoisseurs."
                      </p>

                      <div className="pt-2">
                        <button
                          onClick={() => turnToPage(0)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/40 bg-brand-dark/80 text-brand-goldLight text-xs tracking-wider hover:bg-brand-roast transition-all"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reopen Cover</span>
                        </button>
                      </div>
                    </div>

                    {/* Back Cover Footer */}
                    <div className="text-center space-y-2 pb-4 text-[10px] text-brand-cream/60 tracking-widest">
                      <p>© {new Date().getFullYear()} NuttyBitez • All Rights Reserved</p>
                      <p className="font-mono text-[9px] text-brand-gold/60">ISBN 978-0-999-NUTTYBITEZ-1</p>
                    </div>
                  </div>
                </Page>

              </HTMLFlipBook>
            </div>

          </div>

          {/* BOOK BOTTOM CONTROL & PAGINATION PANEL */}
          <div className="w-full max-w-4xl mt-8 p-4 rounded-2xl bg-brand-espresso/90 border border-brand-gold/30 shadow-luxury flex flex-col sm:flex-row items-center justify-between gap-4 text-brand-cream">

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-brand-gold/30 bg-brand-dark/80 hover:bg-brand-gold hover:text-brand-dark text-brand-goldLight transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold group"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Previous Page</span>
            </button>

            {/* Middle Progress Indicator */}
            <div className="flex flex-col items-center gap-1.5 text-center">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-brand-goldLight">
                <span>FLAVOUR SPREAD {Math.max(1, Math.ceil(currentPage / 2))} OF 7</span>
                <span className="text-brand-cream/40">•</span>
                <span className="text-brand-cream/70 font-sans text-[11px]">Page {currentPage} of 14</span>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-48 sm:w-64 h-1.5 bg-brand-dark rounded-full overflow-hidden border border-brand-gold/20">
                <div
                  className="h-full bg-gold-gradient transition-all duration-300 rounded-full"
                  style={{ width: `${Math.min(100, (currentPage / 14) * 100)}%` }}
                />
              </div>

              <span className="text-[10px] text-brand-cream/50 tracking-wider">
                Tip: Press ← → Keyboard keys or Drag page corner
              </span>
            </div>

            {/* Right Controls: Next & Sound */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2.5 rounded-full border border-brand-gold/30 bg-brand-dark/80 text-brand-goldLight hover:border-brand-gold transition-colors"
                title={soundEnabled ? 'Mute Page Flip Sound' : 'Enable Page Flip Sound'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-full border border-brand-gold/30 bg-brand-dark/80 hover:bg-brand-gold hover:text-brand-dark text-brand-goldLight transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold group"
              >
                <span>Next Page</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default DigitalFlavourBook;
