import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, ArrowLeft, ChevronDown, Menu, X, ExternalLink } from 'lucide-react';
import { slides } from './constants';
import { SerifDisplay, MonoLabel, BodyText, SupportingText } from './components/Typography';

// --- Menu Overlay Component ---
const MenuOverlay = ({ isOpen, onClose, currentSlideId, onNavigate }: any) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setVisible(false), 500);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isAnimating ? 'bg-black/90 backdrop-blur-xl opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}`}>
      <button onClick={onClose} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
        <X className="w-8 h-8" />
      </button>

      <div className={`flex flex-col items-center gap-8 transition-all duration-700 delay-100 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex flex-col gap-6 text-center">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => { onNavigate(index); onClose(); }}
              className={`font-serif text-3xl md:text-4xl hover:text-white transition-colors ${currentSlideId === slide.id ? 'text-white italic' : 'text-white/30'}`}
            >
              <span className="font-mono text-xs tracking-widest block mb-1 opacity-50">{slide.label.split('/')[0]}</span>
              {slide.label.split('/')[1].trim()}
            </button>
          ))}

          {/* Blog Link */}
          <div className="inline-block py-2 px-2 -mx-2 mt-4">
            <a
              href="#blog"
              onClick={onClose}
              className="font-serif text-3xl md:text-4xl text-white/30 hover:text-white transition-all duration-500 ease-out transform hover:scale-105"
              style={{ transformOrigin: 'center center' }}
            >
              <span className="font-mono text-xs tracking-widest block mb-1 opacity-50">07</span>
              Insights
            </a>
          </div>
        </div>

        <div className="w-12 h-px bg-white/20 my-4" />

        <a href="mailto:hello@common-thread.io" className="font-mono text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors flex items-center gap-2">
          Contact Us <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

import { Blog } from './components/Blog';
import { Sandbox } from './components/visual-drafts/Sandbox';

export default function App() {
  // Simple "router" for sandbox
  if (typeof window !== 'undefined' && window.location.search.includes('sandbox')) {
    return <Sandbox />;
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showDetail, setShowDetail] = useState(false); // "Detail" = Stacked view visible on mobile
  const [hasLoadedSupport, setHasLoadedSupport] = useState(false); // Controls secondary fade-in on desktop
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBlog, setShowBlog] = useState(false);

  // Scroll state refs - persist across re-renders to maintain cooldown
  const lastScrollTimeRef = useRef(0);
  const scrollAccumulatorRef = useRef(0);
  const lastScrollDirectionRef = useRef<number | null>(null);

  // Handle Blog Hash Routing & Menu State
  useEffect(() => {
    const handleHashChange = () => {
      const isBlog = window.location.hash.startsWith('#blog');
      setShowBlog(isBlog);
      // Ensure menu is closed when navigating to/from blog (including back swipe)
      setMenuOpen(false);
    };

    // Check on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Swipe state
  const touchStartX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const totalSlides = slides.length;
  const currentContent = slides[currentSlide];

  // --- Navigation Logic ---

  const changeSlide = (index: number) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setHasLoadedSupport(false);
    setTimeout(() => {
      setCurrentSlide(index);
      setShowDetail(false);
      setTimeout(() => {
        setIsTransitioning(false);
        // Trigger progressive load for desktop
        setTimeout(() => setHasLoadedSupport(true), 300);
      }, 400);
    }, 400);
  };

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;

    // Show detail first if hidden (Expand before Navigating)
    // This now applies even on the last slide
    if (!showDetail) {
      setShowDetail(true);
      return;
    }

    if (currentSlide < totalSlides - 1) {
      setIsTransitioning(true);
      setHasLoadedSupport(false);
      setTimeout(() => {
        setShowDetail(false);
        setCurrentSlide(prev => prev + 1);
        setTimeout(() => {
          setIsTransitioning(false);
          setTimeout(() => setHasLoadedSupport(true), 300);
        }, 400);
      }, 400);
    }
  }, [currentSlide, totalSlides, isTransitioning, showDetail]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;

    // Hide detail first if visible (Collapse before Navigating)
    if (showDetail) {
      setShowDetail(false);
      return;
    }

    if (currentSlide > 0) {
      setIsTransitioning(true);
      setHasLoadedSupport(false);
      setTimeout(() => {
        setShowDetail(false);
        setCurrentSlide(prev => prev - 1);
        setTimeout(() => {
          setIsTransitioning(false);
          setTimeout(() => setHasLoadedSupport(true), 300);
        }, 400);
      }, 400);
    }
  }, [currentSlide, isTransitioning, showDetail]);

  // Keyboard Navigation - Respects jack-scrolling rules via nextSlide/prevSlide
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (menuOpen || showBlog || isTransitioning) return; // Disable slide nav if menu, blog, or transitioning
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, menuOpen, showBlog, isTransitioning]);

  // Scroll Navigation (Desktop) - Strict Cooldown with useRef persistence
  useEffect(() => {
    const scrollThreshold = 100; // Accumulate scroll delta before triggering action

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return; // Desktop only
      if (menuOpen || showBlog || isTransitioning) {
        return; // Let blog/menu scroll naturally - don't preventDefault
      }

      // Prevent default scrolling behavior
      e.preventDefault();

      // Strict Cooldown: Ignore ALL wheel events for 1000ms after a successful trigger
      // This covers the 700ms transition + 300ms buffer for inertia/safety
      if (Date.now() - lastScrollTimeRef.current < 1000) {
        return;
      }

      // Track scroll direction (positive = down, negative = up)
      const currentDirection = e.deltaY > 0 ? 1 : -1;

      // Reset accumulator if direction changed (new gesture)
      if (lastScrollDirectionRef.current !== null && lastScrollDirectionRef.current !== currentDirection) {
        scrollAccumulatorRef.current = 0;
      }
      lastScrollDirectionRef.current = currentDirection;

      // Accumulate scroll delta
      scrollAccumulatorRef.current += Math.abs(e.deltaY);

      // Trigger jack-scrolling as soon as threshold is reached
      if (scrollAccumulatorRef.current >= scrollThreshold) {
        // Update cooldown timestamp immediately
        lastScrollTimeRef.current = Date.now();
        scrollAccumulatorRef.current = 0;

        if (currentDirection === 1) {
          // Forward scroll: Show detail if hidden, then advance to next slide
          if (!showDetail) {
            setShowDetail(true);
          } else {
            nextSlide();
          }
        } else {
          // Backward scroll: Always go to previous main section (slide)
          prevSlide();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSlide, totalSlides, showDetail, nextSlide, prevSlide, menuOpen, showBlog, isTransitioning]);

  // Initial load animation
  useEffect(() => {
    setTimeout(() => setHasLoadedSupport(true), 500);
  }, []);

  // Mobile & Desktop Click-to-Expand Handler
  const handleGlobalClick = (e: React.MouseEvent) => {
    // Protection: Ignore clicks inside the Visual Container (Right/Top panel)
    // We identify it by checking if the target is within the visual panel div
    const target = e.target as HTMLElement;
    if (target.closest('.visual-panel-protected')) return;

    // Ignore clicks on buttons or links
    if (target.closest('button') || target.closest('a')) return;

    // Tap Logic:
    // 1. If Detail is hidden -> Expand
    if (!showDetail) {
      setShowDetail(true);
    }
    // 2. If Detail is visible -> Next Slide
    else {
      nextSlide();
    }
  };

  // Touch Handlers - Jack-scrolling with strict rules
  const touchStartY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    // Protection: Ignore touches inside the Visual Container
    const target = e.target as HTMLElement;
    if (target.closest('.visual-panel-protected')) {
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }

    // Prevent if transitioning
    if (isTransitioning || menuOpen || showBlog) {
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }

    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    if (isTransitioning || menuOpen || showBlog) {
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchStartX.current - touchEndX;
    const deltaY = touchStartY.current - touchEndY;

    // Horizontal Swipe (Priority) - Navigate slides directly
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          // Swipe right -> Next slide (but follow jack-scrolling rules)
          if (!showDetail) {
            setShowDetail(true);
          } else {
            nextSlide();
          }
        } else {
          // Swipe left -> Previous slide (always go back)
          prevSlide();
        }
      }
    }
    // Vertical Swipe - Follow jack-scrolling rules
    else {
      if (Math.abs(deltaY) > minSwipeDistance) {
        // Swipe Up (deltaY > 0, finger moves up) -> Forward
        if (deltaY > 0) {
          if (!showDetail) {
            setShowDetail(true);
          } else {
            nextSlide();
          }
        }
        // Swipe Down (deltaY < 0, finger moves down) -> Backward (always previous slide)
        else {
          prevSlide();
        }
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // --- Render Helpers ---

  const progress = ((currentSlide + 1) / totalSlides) * 100;
  const CurrentVisual = currentContent.Visual;

  // Unified Transition Configuration
  // Both elements use the same duration and easing for perfect sync
  const transitionConfig = 'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]';

  // Desktop Animation Classes
  // Main Content: Slides UP and Fades OUT when detail is shown
  // INCREASED SHIFT: Changed -translate-y-12 to -translate-y-24 to move closer to header
  const desktopMainClass = !isTransitioning
    ? (showDetail
      ? `opacity-100 blur-0 md:-translate-y-24` // Slide up significantly more
      : `opacity-100 blur-0 translate-y-0`)     // Default position
    : `opacity-0 blur-sm translate-y-8`;           // Transitioning state

  // Supporting Content: Slides UP and Fades IN when detail is shown
  // It follows the exact same motion vector as the main content
  const desktopSupportClass = !isTransitioning
    ? (showDetail
      ? `opacity-100 blur-0 md:-translate-y-24 max-h-[500px] mt-8 md:mt-6` // Visible: Layout + Position + Spacing
      : `opacity-0 blur-0 translate-y-0 max-h-0 mt-0`)                     // Hidden: Collapsed layout
    : `opacity-0 blur-sm translate-y-8 max-h-0 mt-0`;                       // Transitioning: Collapsed + Motion

  return (
    <div
      className="h-[100dvh] w-full bg-[#0a0a0a] text-white overflow-hidden flex flex-col md:flex-row font-sans selection:bg-white/20 touch-none relative overscroll-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={handleGlobalClick}
    >
      {/* Blog Overlay */}
      {showBlog && (
        <Blog onClose={() => window.location.hash = ''} />
      )}

      <MenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentSlideId={currentContent.id}
        onNavigate={changeSlide}
      />

      {/* Top Bar Controls */}
      <div className={`absolute top-0 left-0 w-full z-[70] flex justify-between items-start p-6 md:p-12 lg:p-16 pointer-events-none transition-opacity duration-500 ${showBlog ? 'opacity-0' : 'opacity-100'}`}>
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 pointer-events-none">
          <div
            className="h-full bg-white/50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Logo */}
        {/* Logo - Click to Reset/Home */}
        <button
          onClick={() => {
            setCurrentSlide(0);
            setShowDetail(false);
            setMenuOpen(false);
            window.location.hash = '';
          }}
          className="pointer-events-auto hover:opacity-70 transition-opacity"
        >
          <span className="font-mono font-bold tracking-[0.2em] uppercase text-xs md:text-sm text-white/90">
            Common Thread
          </span>
        </button>

        {/* Menu Trigger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="pointer-events-auto text-white/50 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      {/* --- NARRATIVE PANEL (Left / Bottom) --- */}
      <div
        className={`
          absolute md:relative
          w-full md:w-[60%] 
          bg-[#0a0a0a]
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          order-2 md:order-1
          flex flex-col
          ${showDetail ? 'h-[100dvh] top-0 pt-20 md:pt-0' : 'h-[55%] top-[45%] md:h-full md:top-0'}
          z-20
          shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-none
        `}
      >
        {/* Content Container - Fixed Top Padding on Desktop for consistent rhythm */}
        {/* Reduced mobile top padding to pt-1 to maximize space within the lower panel */}
        <div className={`flex flex-col px-8 md:px-16 lg:px-20 h-full relative pt-1 md:pt-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${showDetail ? 'md:pt-24 lg:pt-32' : 'md:pt-32 lg:pt-40'}`}>

          {/* Desktop Label & Navigation (Mobile has it in sticky header if needed, but visually cleaned up here) */}
          {/* Fixed position on desktop to prevent movement when content expands/contracts */}
          <div className="hidden md:flex justify-between items-center absolute top-24 lg:top-32 left-16 lg:left-20 right-16 lg:right-20 z-10 transition-opacity duration-500">
            <MonoLabel>{currentContent.label}</MonoLabel>

            {/* Desktop Navigation Arrows */}
            <div className="flex gap-4">
              <button
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                disabled={currentSlide === 0}
                className="text-white/50 hover:text-white disabled:opacity-10 transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                // REMOVED: disabled={currentSlide === totalSlides - 1} to allow clicking next on last slide to expand
                className={`text-white/50 hover:text-white transition-colors cursor-pointer ${currentSlide === totalSlides - 1 && showDetail ? 'opacity-10 cursor-not-allowed' : ''}`}
              >
                <ArrowRight className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* Content Scroll Area - Constrained to fit between Header and Footer */}
          {/* RESTORED justify-center for vertical centering */}
          {/* Optimized mobile padding: pb-24 (96px) to exactly clear the h-24 footer */}
          {/* Disabled native scrolling for jack-scrolling guardrails */}
          <div className="flex-grow relative flex flex-col justify-center overflow-hidden md:overflow-visible no-scrollbar pb-24 md:pb-32 pt-2 md:pt-40 lg:pt-56 pl-1 md:pl-0 scrollbar-hide">
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                  display: none;
              }
              .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
              }
            `}</style>

            {/* MAIN CONTENT CONTAINER */}
            <div
              className={`
                    flex flex-col gap-3 md:gap-6 ${transitionConfig}
                    ${desktopMainClass}
                `}
            >
              <div className="md:hidden mb-1">
                <MonoLabel>{currentContent.label}</MonoLabel>
              </div>
              {/* Tuned Text Sizes: Larger Mobile (4xl/lg) but still fitting */}
              {/* Desktop: Fluid typography (clamp) to smooth out responsive grey zones */}
              <SerifDisplay className="text-4xl md:text-[clamp(2.5rem,2vw+1.5rem,3.5rem)]">{currentContent.title}</SerifDisplay>
              <BodyText className="text-lg md:text-[clamp(1.25rem,0.6vw+1rem,1.5rem)]">{currentContent.body}</BodyText>
            </div>

            {/* SUPPORTING CONTENT CONTAINER */}
            <div
              className={`
                 w-full ${transitionConfig} ${showDetail ? 'overflow-visible' : 'overflow-hidden'}
                 ${desktopSupportClass}
               `}
            >
              <div className="w-full h-px bg-white/10 mt-0 md:mt-4 mb-8 md:mb-12 block" />
              <SupportingText className="text-lg md:text-[clamp(1.25rem,0.6vw+1rem,1.5rem)]">
                {currentContent.supportingContent}
              </SupportingText>
            </div>

            {/* Mobile Scroll Hint (if detail is closed) */}
            {!showDetail && !isTransitioning && (
              <div className="md:hidden absolute bottom-4 left-0 w-full flex justify-center opacity-50 animate-bounce pointer-events-none">
                <ChevronDown className="w-5 h-5" />
              </div>
            )}

          </div>
        </div>

        {/* Navigation Footer - Mobile Only */}
        <div className={`
            shrink-0 h-24
            flex items-center justify-between 
            text-white/50 text-xs font-mono uppercase tracking-widest 
            bg-[#0a0a0a] md:hidden
            w-full absolute bottom-0 left-0 px-8
            z-50
            border-t border-white/5
            pointer-events-auto
          `}>
          {/* Mobile Controls */}
          <div className="flex w-full justify-between items-center">
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              disabled={currentSlide === 0 && !showDetail}
              className="py-6 pr-6 -ml-2 disabled:opacity-20 active:text-white transition-colors"
            >
              Prev
            </button>

            <span className="text-xs tracking-[0.2em] text-white/60">
              {`0${currentSlide + 1}`} / 0{totalSlides}
            </span>

            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              disabled={currentSlide === totalSlides - 1 && showDetail}
              className="py-6 pl-6 -mr-2 disabled:opacity-20 active:text-white transition-colors flex items-center gap-2"
            >
              Next <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* --- VISUAL PANEL (Right / Top) --- */}
      <div
        className={`
          absolute md:relative 
          w-full md:w-[40%] 
          bg-[#0f0f0f] overflow-hidden md:border-l border-white/5
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          order-1 md:order-2
          ${showDetail ? 'opacity-20 md:opacity-100 translate-y-[-20%] md:translate-y-0' : 'h-[45%] md:h-full'}
          md:h-full
          top-0 z-0
          visual-panel-protected
        `}
      >
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Visual Container */}
        <div className={`relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
          <div className="w-full h-full">
            <CurrentVisual />
          </div>
        </div>
      </div>
    </div>
  );
}