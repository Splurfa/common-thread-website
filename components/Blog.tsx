import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, Sun, Moon, ArrowRight, Clock, Calendar } from 'lucide-react';
import { SerifDisplay, MonoLabel, BodyText } from './Typography';
import { BLOG_POSTS, BlogPost } from './BlogData';

export const Blog: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [activePost, setActivePost] = useState<BlogPost | null>(null);
    // Initialize theme from localStorage or default to 'dark'
    const [theme, setTheme] = useState<'dark' | 'light'>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('blog-theme');
            return (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : 'dark';
        }
        return 'dark';
    });

    // Persist theme changes
    useEffect(() => {
        localStorage.setItem('blog-theme', theme);
    }, [theme]);

    // Routing Logic
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#blog/')) {
                const postId = hash.replace('#blog/', '');
                const post = BLOG_POSTS.find(p => p.id === parseInt(postId));
                if (post) {
                    setActivePost(post);
                } else {
                    // If post not found, redirect to blog list
                    window.location.hash = '#blog';
                }
            } else if (hash === '#blog') {
                setActivePost(null);
            } else {
                // If hash is not blog related, ensure blog is closed
                setActivePost(null);
                // Optionally, you might want to call onClose() here if the blog should only be open via #blog hash
                // However, for this component, it's assumed to be rendered when the user wants to see the blog.
            }
        };

        // Check on mount
        handleHashChange();

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const handleCardClick = (post: BlogPost) => {
        window.location.hash = `#blog/${post.id}`;
    };

    const handleBack = () => {
        if (activePost) {
            // Go back to list
            window.location.hash = '#blog';
        } else {
            // Close blog
            onClose();
        }
    };

    // Colors based on theme
    // We use inline styles for background to ensure it applies correctly over the fixed container
    const textClass = theme === 'dark' ? 'text-white' : 'text-[#1a1a1a]';
    const textMutedClass = theme === 'dark' ? 'text-white/60' : 'text-[#1a1a1a]/60';
    const borderClass = theme === 'dark' ? 'border-white/10' : 'border-black/10';

    // Card Styles with Subtle Depth
    const cardBaseClass = theme === 'dark'
        ? 'bg-white/[0.02] border border-white/[0.05] shadow-sm hover:bg-white/[0.04] hover:border-white/10 hover:shadow-md'
        : 'bg-black/[0.02] border border-black/[0.05] shadow-sm hover:bg-black/[0.04] hover:border-black/10 hover:shadow-md';

    // Scroll Container Ref
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    // Scroll to top when activePost changes (both directions)
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, [activePost]);

    return (
        <div
            ref={scrollContainerRef}
            className={`fixed inset-0 z-[80] ${textClass} overflow-y-auto transition-colors duration-500`}
            style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#f4f4f5' }}
        >

            {/* Header - Matched padding with App.tsx for alignment */}
            <div
                className={`fixed top-0 left-0 w-full p-6 md:p-12 lg:p-16 flex justify-between items-center z-50 transition-colors duration-500`}
                style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#f4f4f5' }}
            >
                {/* Back Navigation - Context Aware */}
                <button
                    onClick={handleBack}
                    className={`group flex items-center gap-3 font-mono font-bold tracking-[0.2em] uppercase text-xs md:text-sm ${theme === 'dark' ? 'text-white opacity-80 hover:opacity-100' : 'text-black opacity-60 hover:opacity-100'} transition-opacity`}
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {activePost ? 'Insights' : 'Common Thread'}
                </button>

                {/* Theme Toggle - Right Aligned */}
                <div className="flex items-center gap-3">
                    <Moon className={`w-4 h-4 ${theme === 'dark' ? 'text-white' : 'text-black/40'}`} />
                    <button
                        onClick={toggleTheme}
                        className={`
                            w-12 h-6 rounded-full p-1 transition-colors duration-300 relative
                            ${theme === 'dark' ? 'bg-white/20' : 'bg-black/10'}
                        `}
                        aria-label="Toggle Theme"
                    >
                        <div
                            className={`
                                w-4 h-4 rounded-full shadow-sm transition-transform duration-300
                                ${theme === 'dark' ? 'bg-white translate-x-0' : 'bg-white translate-x-6'}
                            `}
                        />
                    </button>
                    <Sun className={`w-4 h-4 ${theme === 'dark' ? 'text-white/40' : 'text-black'}`} />
                </div>
            </div>

            {/* Content Area */}
            <div className="pt-32 md:pt-40 pb-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto min-h-screen">

                {activePost ? (
                    // --- Detail View ---
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">


                        <article className="max-w-3xl mx-auto">
                            {/* Hero Visual for Article - Always Dark Background */}
                            <div className="w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden relative bg-[#0a0a0a] border border-white/5">
                                <activePost.Visual />
                            </div>

                            <div className={`flex items-center gap-4 mb-8 ${textMutedClass} font-mono text-xs tracking-widest uppercase`}>
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {activePost.date}</span>
                                <span className="w-px h-3 bg-current opacity-30" />
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {activePost.readTime}</span>
                                <span className="w-px h-3 bg-current opacity-30" />
                                <span className="text-blue-400">{activePost.category}</span>
                            </div>

                            <h1 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">
                                {activePost.title}
                            </h1>

                            <div className={`font-serif text-lg md:text-lg leading-relaxed ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                                {activePost.content}
                            </div>

                            <div className={`mt-16 pt-8 border-t ${borderClass}`}>
                                <p className="font-mono text-xs uppercase tracking-widest opacity-50 mb-4">Share this article</p>
                                <div className="flex gap-4">
                                    {['Twitter', 'LinkedIn', 'Email'].map(platform => (
                                        <button key={platform} className={`text-sm hover:underline ${textMutedClass} hover:opacity-100`}>
                                            {platform}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </article>
                    </div>
                ) : (
                    // --- List View ---
                    <div className="animate-in fade-in duration-500">
                        <div className="mb-16 md:mb-24 max-w-4xl">
                            <h1 className="font-serif text-5xl md:text-7xl mb-6">Insights</h1>
                            <p className={`text-xl md:text-2xl max-w-2xl ${textMutedClass} font-serif`}>
                                Thoughts on the intersection of technology, human agency, and the future of work.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {BLOG_POSTS.map((post) => (
                                <div
                                    key={post.id}
                                    className={`group flex flex-col gap-6 p-8 rounded-2xl transition-all duration-300 ${cardBaseClass}`}
                                >
                                    {/* Card Visual Preview - Always Dark Background & No Click Propagation */}
                                    <div
                                        className="w-full h-48 rounded-lg overflow-hidden relative bg-[#0a0a0a] border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity cursor-default"
                                    >
                                        <div className="absolute inset-0">
                                            <post.Visual />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <div className={`flex items-center justify-between font-mono text-xs uppercase tracking-widest ${textMutedClass}`}>
                                            <span>{post.category}</span>
                                            <span>{post.date}</span>
                                        </div>

                                        <div className="inline-block py-2 px-2 -mx-2">
                                            <h2
                                                onClick={() => handleCardClick(post)}
                                                className="font-serif text-3xl md:text-4xl cursor-pointer transition-all duration-500 ease-out transform hover:scale-105"
                                                style={{ transformOrigin: 'center center' }}
                                            >
                                                {post.title}
                                            </h2>
                                        </div>

                                        <p className={`line-clamp-3 ${textMutedClass} text-sm md:text-base leading-relaxed`}>
                                            {post.excerpt}
                                        </p>

                                        <div className="inline-block py-1 px-1 -mx-1">
                                            <div
                                                onClick={() => handleCardClick(post)}
                                                className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest mt-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'} cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 hover:scale-105`}
                                                style={{ transformOrigin: 'center center' }}
                                            >
                                                Read Article <ArrowRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
