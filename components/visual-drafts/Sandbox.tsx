import React, { useEffect } from 'react';
import { ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import {
    VisualOrbital,
    VisualGrid,
    VisualNet,
    VisualRain,
    VisualGalaxy,
    VisualFlow,
    VisualChain,
    VisualShatter,
    VisualPulse,
    VisualFlock,
    VisualMagnet,
    VisualVortex
} from './Drafts';

import {
    VisualHero,
    VisualPhilosophy,
    VisualArchitecture,
    VisualValue,
    VisualStewards,
    VisualGateway
} from '../Visuals';

export const Sandbox: React.FC = () => {
    const [viewMode, setViewMode] = React.useState<'grid' | 'slideshow'>('grid');
    const [currentIndex, setCurrentIndex] = React.useState(0);

    useEffect(() => {
        // Responsive View Mode Logic
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setViewMode('slideshow');
            } else {
                setViewMode('grid');
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // Enable scrolling for grid view, disable for slideshow view (all devices)
        if (typeof window === 'undefined') return;

        if (viewMode === 'slideshow') {
            // Slideshow: No Scroll (App-like feel)
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
            document.documentElement.style.overflow = 'hidden';
        } else {
            // Grid: Scrollable (Gallery feel)
            document.body.style.overflow = 'auto';
            document.body.style.height = 'auto';
            document.documentElement.style.overflow = 'auto';
        }

        return () => {
            // Restore for main app
            document.body.style.overflow = '';
            document.body.style.height = '';
            document.documentElement.style.overflow = '';
        };
    }, [viewMode]);

    const drafts = [
        // Published Visuals - Main Site
        { id: 'P1', title: 'Neural Swarm', Component: VisualHero, isPublished: true, publishCategory: 'MAIN', publishLabel: '01 / STATE OF MIND' },
        { id: 'P2', title: 'Ascending Particles', Component: VisualPhilosophy, isPublished: true, publishCategory: 'MAIN', publishLabel: '02 / VISION' },
        { id: 'P3', title: 'Axis Physics', Component: VisualArchitecture, isPublished: true, publishCategory: 'MAIN', publishLabel: '03 / MECHANISM' },
        { id: 'P4', title: 'Fluid Flow', Component: VisualValue, isPublished: true, publishCategory: 'MAIN', publishLabel: '04 / VALUE' },
        { id: 'P5', title: 'Binary Systems', Component: VisualStewards, isPublished: true, publishCategory: 'MAIN', publishLabel: '05 / LEADERSHIP' },
        { id: 'P6', title: 'Gateway Portal', Component: VisualGateway, isPublished: true, publishCategory: 'MAIN', publishLabel: '06 / GATEWAY' },

        // Published Visuals - Insights Page
        { id: 'P7', title: 'Orbital', Component: VisualOrbital, isPublished: true, publishCategory: 'INSIGHT', publishLabel: 'The Human Standard' },
        { id: 'P8', title: 'Spring Mesh', Component: VisualGrid, isPublished: true, publishCategory: 'INSIGHT', publishLabel: 'The Three Domains' },
        { id: 'P9', title: 'Physics Chain', Component: VisualChain, isPublished: true, publishCategory: 'INSIGHT', publishLabel: 'Two Ways to Collaborate' },
        { id: 'P10', title: 'Noise Field', Component: VisualFlow, isPublished: true, publishCategory: 'INSIGHT', publishLabel: 'The Bandwidth Reclamation Problem' },
        { id: 'P11', title: 'Sonar Pulse', Component: VisualPulse, isPublished: true, publishCategory: 'INSIGHT', publishLabel: 'Why Empathy Jobs Miss the Point' },
        { id: 'P12', title: 'Nebula', Component: VisualGalaxy, isPublished: true, publishCategory: 'INSIGHT', publishLabel: 'The Trust Accumulation Curve' },
        { id: 'P13', title: 'Shatter & Reform', Component: VisualShatter, isPublished: true, publishCategory: 'INSIGHT', publishLabel: 'When Perfect Recommendations Fail' },
        { id: 'P14', title: 'Elastic Net', Component: VisualNet, isPublished: true, publishCategory: 'INSIGHT', publishLabel: 'The Co-Learning Economy' },
        { id: 'P15', title: 'Data Stream', Component: VisualRain, isPublished: true, publishCategory: 'INSIGHT', publishLabel: 'The Delegation Paradox' },
        { id: 'P16', title: 'Vortex Suction', Component: VisualVortex, isPublished: true, publishCategory: 'INSIGHT', publishLabel: 'The Experience Economy Fallacy' },
        { id: 'P17', title: 'Boids Flocking', Component: VisualFlock, isPublished: true, publishCategory: 'INSIGHT', publishLabel: 'Designing Work for Humans' },
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % drafts.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + drafts.length) % drafts.length);
    };

    const CurrentComponent = drafts[currentIndex].Component;

    return (
        <div
            className="min-h-screen bg-black text-white p-8 overflow-y-auto"
            style={{ backgroundColor: '#000000', minHeight: '100vh', color: 'white', overscrollBehavior: 'auto' }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-serif mb-2">Physics Engine Sandbox</h1>
                        <p className="text-white/50 font-mono text-sm">
                            {viewMode === 'grid' ? 'Desktop Grid View' : 'Mobile Slideshow View'} • {drafts.length} Visuals
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="/"
                            className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors font-mono text-xs uppercase tracking-widest"
                        >
                            Back to Site <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>

                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {drafts.map(({ id, title, Component, isPublished, publishCategory, publishLabel }, index) => (
                            <div
                                key={id}
                                className={`border rounded-lg overflow-hidden transition-colors ${isPublished ? 'border-blue-500/30 bg-blue-900/10' : 'border-white/10 bg-white/5'}`}
                            >
                                <div
                                    className="h-[300px] relative border-b border-white/5 sandbox-graphic-container cursor-crosshair"
                                    onWheel={(e) => {
                                        e.stopPropagation();
                                    }}
                                    onTouchStart={(e) => e.stopPropagation()}
                                    onTouchMove={(e) => e.stopPropagation()}
                                    style={{ touchAction: 'none', pointerEvents: 'auto' }}
                                >
                                    <Component />
                                </div>
                                <div
                                    className="p-4 cursor-pointer hover:bg-white/5 transition-colors"
                                    onClick={() => { setCurrentIndex(index); setViewMode('slideshow'); }}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="font-mono text-xs text-white/40 flex flex-col gap-1.5">
                                            <span className="uppercase tracking-wider text-blue-400/80">PUBLISHED • {publishCategory}</span>
                                            <span className="text-white/70 font-medium">{publishLabel}</span>
                                        </div>
                                        {isPublished && <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] mt-1"></div>}
                                    </div>
                                    <h3 className="font-serif text-xl">{title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-md mx-auto">
                        {/* Square Container for Graphic */}
                        <div
                            className="w-full aspect-square border border-white/10 rounded-lg overflow-hidden bg-white/5 relative mb-6 sandbox-graphic-container"
                            onWheel={(e) => {
                                e.stopPropagation();
                                // Prevent page scroll when interacting with graphics
                            }}
                            onTouchStart={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                            style={{ touchAction: 'none', pointerEvents: 'auto' }}
                        >
                            <CurrentComponent />
                        </div>

                        {/* External Navigation Controls */}
                        <div className="flex items-center justify-between w-full px-4 mb-6">
                            <button
                                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                                className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 active:scale-95"
                                aria-label="Previous Visual"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>

                            <div className="text-center">
                                <div className="flex flex-col items-center gap-1 mb-3 justify-center">
                                    {drafts[currentIndex].isPublished && (
                                        <>
                                            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 text-[10px] font-mono uppercase tracking-wider border border-blue-500/20">
                                                PUBLISHED • {drafts[currentIndex].publishCategory}
                                            </span>
                                            <span className="text-xs font-mono text-white/60 mt-1">
                                                {drafts[currentIndex].publishLabel}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <h2 className="text-2xl font-serif mb-1">{drafts[currentIndex].title}</h2>
                                <p className="font-mono text-xs text-white/50">
                                    {String(currentIndex + 1).padStart(2, '0')} / {drafts.length}
                                </p>
                            </div>

                            <button
                                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                                className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 active:scale-95"
                                aria-label="Next Visual"
                            >
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
