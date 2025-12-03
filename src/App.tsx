import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { slides } from './constants';
// Lazy load Sandbox to avoid bundling it with the main app
const Sandbox = React.lazy(() => import('./components/visual-drafts/Sandbox'));
import { StandardLayout } from './components/layouts/StandardLayout';
import { ExtremeLandscapeLayout } from './components/layouts/ExtremeLandscapeLayout';
import { Gateway } from './components/Gateway';

// Custom Hook for Layout Detection
function useLayoutMode() {
  const [isExtremeLandscape, setIsExtremeLandscape] = useState(false);

  useEffect(() => {
    const checkLayout = () => {
      // Threshold: 600px height + Landscape + Desktop Width
      // Also check aspect ratio to avoid false positives on small but standard windows
      const isLandscape = window.matchMedia('(orientation: landscape)').matches;
      const isShort = window.innerHeight <= 600;
      const isWideEnough = window.innerWidth >= 480; // Relaxed from 768 to support mobile landscape

      setIsExtremeLandscape(isLandscape && isShort && isWideEnough);
    };

    checkLayout();
    window.addEventListener('resize', checkLayout);
    return () => window.removeEventListener('resize', checkLayout);
  }, []);

  return isExtremeLandscape;
}

export default function App() {
  // Simple "router" for sandbox
  if (typeof window !== 'undefined' && window.location.search.includes('sandbox')) {
    return (
      <Suspense fallback={<div className="w-full h-screen bg-black text-white flex items-center justify-center">Loading Sandbox...</div>}>
        <Sandbox />
      </Suspense>
    );
  }

  const isExtremeLandscape = useLayoutMode();

  // Gateway state - check session storage to avoid showing on refresh
  const [showGateway, setShowGateway] = useState(() => {
    return sessionStorage.getItem('gateway-entered') !== 'true';
  });

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

  // Handle gateway exit
  const handleEnterGateway = () => {
    sessionStorage.setItem('gateway-entered', 'true');
    setShowGateway(false);
  };

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

  // Props to pass to layouts
  const layoutProps = {
    currentSlide,
    setCurrentSlide,
    isTransitioning,
    setIsTransitioning,
    showDetail,
    setShowDetail,
    setHasLoadedSupport,
    menuOpen,
    setMenuOpen,
    showBlog,
    setShowBlog,
    changeSlide,
    nextSlide,
    prevSlide,
    progress,
    totalSlides,
    currentContent,
    CurrentVisual,
    transitionConfig,
    desktopMainClass,
    desktopSupportClass,
    handleGlobalClick,
    onTouchStart,
    onTouchEnd
  };

  return (
    <>
      {showGateway && (
        <Gateway onEnter={handleEnterGateway} />
      )}
      {isExtremeLandscape ? (
        <ExtremeLandscapeLayout {...layoutProps} />
      ) : (
        <StandardLayout {...layoutProps} />
      )}
    </>
  );
}