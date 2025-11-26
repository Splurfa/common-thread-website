import React from 'react';
import { ArrowRight, ArrowLeft, Menu, X, ExternalLink } from 'lucide-react';
import { slides } from '../../constants';
import { SerifDisplay, MonoLabel, BodyText, SupportingText } from '../Typography';
import { Blog } from '../Blog';

// --- Menu Overlay Component (Reused) ---
const MenuOverlay = ({ isOpen, onClose, currentSlideId, onNavigate }: any) => {
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
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
        <div className={`fixed inset-0 z-[200] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isAnimating ? 'bg-black/90 backdrop-blur-xl opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}`}>
            <button onClick={onClose} className="absolute top-8 right-12 text-white/50 hover:text-white transition-colors">
                <X className="w-8 h-8" />
            </button>

            <div className={`w-full max-w-4xl px-12 transition-all duration-700 delay-100 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {/* Landscape Grid Layout */}
                <div className="grid grid-cols-3 gap-x-4 gap-y-6 items-center justify-items-center">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.id}
                            onClick={() => { onNavigate(index); onClose(); }}
                            className={`font-serif text-2xl md:text-3xl hover:text-white transition-colors whitespace-nowrap ${currentSlideId === slide.id ? 'text-white italic' : 'text-white/30'}`}
                        >
                            <span className="font-mono text-[10px] tracking-widest block mb-1 opacity-50">{slide.label.split('/')[0]}</span>
                            {slide.label.split('/')[1].trim()}
                        </button>
                    ))}

                    {/* Blog Link - Fits in the grid */}
                    <div className="flex flex-col items-center">
                        <a
                            href="#blog"
                            onClick={onClose}
                            className="font-serif text-2xl md:text-3xl text-white/30 hover:text-white transition-all duration-500 ease-out transform hover:scale-105 text-center"
                        >
                            <span className="font-mono text-[10px] tracking-widest block mb-1 opacity-50">07</span>
                            Insights
                        </a>
                    </div>
                </div>

                <div className="w-full h-px bg-white/10 my-8" />

                <div className="flex justify-center">
                    <a href="mailto:hello@common-thread.io" className="font-mono text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors flex items-center gap-2">
                        Contact Us <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export function ExtremeLandscapeLayout({
    currentSlide,
    setCurrentSlide,
    isTransitioning,
    showDetail,
    setShowDetail,
    menuOpen,
    setMenuOpen,
    showBlog,
    changeSlide,
    nextSlide,
    prevSlide,
    progress,
    totalSlides,
    currentContent,
    CurrentVisual,
    handleGlobalClick,
    onTouchStart,
    onTouchEnd
}: any) {

    // Custom Styles for this layout
    const styles = `
    .extreme-layout-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      height: 100dvh;
      width: 100vw;
      overflow: hidden;
      background: #0a0a0a;
      color: white;
    }

    /* Left Panel: Content */
    .extreme-left-panel {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 3rem; /* Reduced from 4rem to match logo/label alignment */
      z-index: 20;
    }

    /* Right Panel: Visual */
    .extreme-right-panel {
      position: relative;
      height: 100%;
      background: #0f0f0f;
      border-left: 1px solid rgba(255,255,255,0.05);
      overflow: hidden;
    }

    /* Tripod Layout Elements */
    .extreme-logo {
      position: fixed;
      top: 2rem;
      left: 3rem;
      z-index: 50;
    }

    .extreme-label {
      position: fixed;
      bottom: 2rem;
      left: 3rem;
      z-index: 50;
      opacity: 0.6;
      transition: opacity 0.3s ease;
      
      /* Alignment with Arrows (h-8 = 2rem) */
      height: 2rem;
      display: flex;
      align-items: center;
      
      /* Typography matching header (overriding MonoLabel defaults if necessary) */
      font-family: monospace; /* Ensure mono */
      font-size: 0.75rem; /* text-xs */
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }
    .extreme-label:hover { opacity: 1; }
    
    /* Target the MonoLabel inside to ensure styles apply */
    .extreme-label > * {
      font-size: inherit;
      font-weight: inherit;
      letter-spacing: inherit;
      text-transform: inherit;
    }

    /* Nav Arrows - Integrated into Left Panel (Bottom-Right) */
    .extreme-nav-arrows {
      position: absolute;
      bottom: 2rem;
      right: 2rem; /* Moved further right (was 4rem) to avoid collision */
      z-index: 50;
      display: flex;
      gap: 1.5rem;
    }

    /* Dynamic Overlay for Supporting Content */
    .extreme-overlay {
      position: fixed;
      top: 0;
      right: 0;
      width: 50vw; /* Covers the visual half */
      height: 100%;
      background: rgba(10, 10, 10, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      z-index: 40;
      border-left: 1px solid rgba(255,255,255,0.1);
      
      transform: translateX(100%);
      transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
      
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 4rem;
    }
    
    .extreme-overlay.visible {
      transform: translateX(0);
    }

    /* Typography Scaling */
    .extreme-title {
      font-size: clamp(2rem, 4vh, 2.75rem); /* Balanced Title */
      line-height: 1.1;
      margin-bottom: 0.5rem; /* Tightened from 1rem */
    }
    .extreme-body {
      font-size: clamp(1.125rem, 2.5vh, 1.4rem); /* Balanced Body */
      line-height: 1.35; /* Tightened line spacing */
      max-width: 40ch;
      /* Removed opacity to let BodyText (text-white/80) handle color */
    }
    .extreme-support {
      font-size: clamp(0.875rem, 1.8vh, 1rem); /* Small Supporting Text */
      line-height: 1.35; /* Tightened line spacing */
      max-width: 45ch;
      /* Removed color override to let SupportingText (text-white/80) handle color */
    }

    /* Menu Button */
    .extreme-menu-btn {
      position: fixed;
      top: 2rem;
      right: 3rem;
      z-index: 70;
      color: rgba(255,255,255,0.5);
      transition: color 0.3s ease;
    }
    .extreme-menu-btn:hover { color: white; }
  `;

    return (
        <div
            className="extreme-layout-container font-sans selection:bg-white/20"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={handleGlobalClick}
        >
            <style>{styles}</style>

            {/* Blog Overlay */}
            {showBlog && (
                <Blog onClose={() => window.location.hash = ''} />
            )}

            {/* --- TRIPOD LAYOUT --- */}

            {/* 1. Top-Left: Logo */}
            <button
                onClick={() => {
                    setCurrentSlide(0);
                    setShowDetail(false);
                    setMenuOpen(false);
                    window.location.hash = '';
                }}
                className="extreme-logo hover:opacity-70 transition-opacity"
            >
                <span className="font-mono font-bold tracking-[0.2em] uppercase text-xs text-white/90">
                    Common Thread
                </span>
            </button>

            {/* 2. Bottom-Left: Label */}
            <div className="extreme-label">
                <MonoLabel>{currentContent.label}</MonoLabel>
            </div>

            {/* Top-Right: Menu Trigger */}
            <button
                onClick={() => setMenuOpen(true)}
                className="extreme-menu-btn"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* --- MAIN CONTENT (Left Panel) --- */}
            <div className="extreme-left-panel">
                <div className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isTransitioning ? 'opacity-0 blur-sm translate-y-4' : 'opacity-100 blur-0 translate-y-0'}`}>
                    <SerifDisplay className="extreme-title">{currentContent.title}</SerifDisplay>
                    <BodyText className="extreme-body">{currentContent.body}</BodyText>
                </div>

                {/* 3. Bottom-Right of Left Panel: Nav Arrows (Desktop Style) */}
                <div className="extreme-nav-arrows">
                    <button
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        disabled={currentSlide === 0}
                        className="text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    >
                        <ArrowLeft className="w-8 h-8" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                        className="text-white/50 hover:text-white transition-colors"
                    >
                        <ArrowRight className="w-8 h-8" />
                    </button>
                </div>
            </div>

            {/* --- VISUAL PANEL (Right Panel) --- */}
            <div className="extreme-right-panel visual-panel-protected">
                {/* Grid Background */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Visual */}
                <div className={`relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
                    <div className="w-full h-full">
                        <CurrentVisual />
                    </div>
                </div>

                {/* --- DYNAMIC OVERLAY (Slide Over) --- */}
                <div className={`extreme-overlay ${showDetail ? 'visible' : ''}`}>
                    <div className="w-12 h-px bg-white/20 mb-8" />
                    <SupportingText className="extreme-support">
                        {currentContent.supportingContent}
                    </SupportingText>
                </div>
            </div>

            <MenuOverlay
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
                currentSlideId={currentContent.id}
                onNavigate={changeSlide}
            />

        </div>
    );
}
