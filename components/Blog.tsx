import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, Sun, Moon, ArrowRight, Clock, Calendar } from 'lucide-react';
import { SerifDisplay, MonoLabel, BodyText } from './Typography';
import { VisualOrbital, VisualNet, VisualFlock, VisualMagnet } from './visual-drafts/Drafts';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    content: React.ReactNode;
    Visual: React.FC;
}

const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "The Human Standard",
        excerpt: "Delegation means loss. Context fades in transit. What if nothing got lost?",
        date: "Nov 22, 2024",
        readTime: "4 min read",
        category: "Philosophy",
        Visual: VisualOrbital,
        content: (
            <>
                <p className="mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left">
                    You've felt this before. Someone remembers not just what you said, but why. The context. The nuance. The unspoken rules. Delegation that works. It's disappearing.
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">The Problem We Don't Talk About</h3>
                <p className="mb-6">
                    Strategic intent meets operational friction. Momentum dies in translation. You make a decision. Clear. Reasoned. Urgent. Then it enters the machinery: forms, briefings, systems, processes.
                </p>
                <p className="mb-6">
                    The urgency fades. The nuance evaporates. The intent dilutes. By the time the work is done, it's not quite what you meant. Not a failure of people. Not a failure of systems. The nature of how work happens when distance exists between decision and execution.
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">What Delegation Could Feel Like</h3>
                <p className="mb-6">
                    Someone who never forgets. Not just tasks. The reasons behind them. The strategic context. The edge case mentioned once, six months ago. No re-briefing required.
                </p>
                <p className="mb-6">
                    Three kinds of memory matter. What happened. How it's done. What's true for you. Most relationships start from zero each time. What if nothing got lost?
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">The Invisible Machine</h3>
                <p className="mb-6">
                    There is a version of your business where you direct, and the world arranges itself accordingly. You provide the unique human signal: the connection. Direction flows directly into action. Infrastructure disappears from your experience. The machinery in between becomes irrelevant.
                </p>
                <p className="mb-6">
                    When you delegate, nothing gets lost. When you decide, it happens. The gap between intent and execution compresses to nearly zero. What remains is what should remain: your judgment, your strategy, your focus on what actually matters.
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">Building the Standard</h3>
                <p className="mb-6">
                    Not speculation. The standard we're building toward.
                </p>
                <p className="mb-6">
                    The human standard means delegation that preserves context completely. Infrastructure that translates executive intent into operational reality without degradation. The distance between your decision and the world's response approaches zero.
                </p>
                <p className="mb-6">
                    Most systems ask you to become more mechanical. Speak the language of machines. Think in workflows. Translate intent into configurations. We're building the opposite: you speak, the work happens. Context preserved. What you said and why both remembered.
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">The Work Is Real</h3>
                <p className="mb-6">
                    This way of working exists. The transformation is proven. What remains is execution.
                </p>
                <p className="mb-6">
                    Common Thread builds the invisible machinery that eliminates the gap between strategic clarity and operational execution. Not someday. Now.
                </p>
                <p className="mb-6">
                    The question is no longer whether this level of delegation is possible. The question is whether you're ready to work this way.
                </p>
            </>
        )
    },
    {
        id: 2,
        title: "The Distance Between Decision and Reality",
        excerpt: "The gap between strategic intent and operational execution is the invisible killer of business momentum.",
        date: "Nov 15, 2024",
        readTime: "5 min read",
        category: "Strategy",
        Visual: VisualNet,
        content: (
            <>
                <p className="mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left">
                    You made a clear decision. Strategic. Reasoned. Urgent. Then it entered the machinery: forms, briefings, configurations, processes. Somewhere in that translation, the urgency faded.
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">Mapping the Gap</h3>
                <p className="mb-6">
                    Strategic clarity is the high point. From there, a series of handoffs. Intent to instruction. Instruction to configuration. Configuration to execution. Each layer another game of telephone. Meaning degrades.
                </p>
                <p className="mb-6">
                    We've normalized this. "That's not quite what I meant" becomes cost of doing business. Iterative correction becomes routine. Why have we normalized strategic drag?
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">The Compression Hypothesis</h3>
                <p className="mb-6">
                    What if the gap could approach zero? Not about speed. About preservation. When direction and execution become continuous, strategic agility becomes competitive advantage.
                </p>
                <p className="mb-6">
                    The cumulative cost of distance is staggering. Opportunities lost in delay. Momentum that never builds. Innovation dying in translation. When that latency disappears, time returns to its rightful owner: the human mind.
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">How Latency Disappears</h3>
                <p className="mb-6">
                    The distance collapses when three things stay intact.
                </p>
                <p className="mb-6">
                    <strong>What happened.</strong> Context doesn't evaporate between conversations. Last quarter's decision informs this quarter's execution. History travels with the work.
                </p>
                <p className="mb-6">
                    <strong>How it's done.</strong> Process becomes muscle memory. The workflow for client X. The format you prefer. The sequence that works. Not documented. Internalized.
                </p>
                <p className="mb-6">
                    <strong>What's true for you.</strong> Your company values precision over speed in finance. Speed over precision in marketing. Different rules for different contexts. Principles shaping judgment without explanation.
                </p>
                <p className="mb-6">
                    Most relationships require constant re-briefing. Each interaction treated as new. Context reconstruction becomes the hidden tax paid before every decision.
                </p>
                <p className="mb-6">
                    When nothing gets lost, you can trust the work. Not just execution. Genuine understanding. The gap between decision and reality compresses to zero.
                </p>
                <p className="mb-6">
                    Not speculation. The architecture exists. The preservation is real.
                </p>
                <p className="mb-6">
                    What changes is how you work. You direct. The work arranges itself accordingly. Intent becomes reality without translation loss.
                </p>
                <p className="mb-6">
                    The distance disappears. The momentum returns.
                </p>
                <p className="mb-6">
                    Not the future. The work.
                </p>
            </>
        )
    },
    {
        id: 3,
        title: "The Bandwidth Paradox",
        excerpt: "Why the businesses that need automation most are the ones that can't afford the time to adopt it.",
        date: "Nov 08, 2024",
        readTime: "4 min read",
        category: "Operations",
        Visual: VisualFlock,
        content: (
            <>
                <p className="mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left">
                    The cruel irony: businesses that need operational support most are running so lean they can't afford the time to set it up. Every system requires configuration. Training. Ongoing management.
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">The Adoption Tax</h3>
                <p className="mb-6">
                    For companies already stretched thin, learning new systems consumes more time than the problems they solve. Research. Configuration. Training. Integration. These tasks demand focus small teams don't have.
                </p>
                <p className="mb-6">
                    This locks out the very people operational infrastructure was supposed to serve. Small businesses. Startups in growth mode. Solo founders wearing all hats. The math doesn't work for those who need it most.
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">Rethinking the Interface</h3>
                <p className="mb-6">
                    What if bringing on support felt like hiring, not setup? You wouldn't configure a new hire. You'd brief them. Direct them. Trust them.
                </p>
                <p className="mb-6">
                    What if the barrier wasn't price, but bandwidth? What if onboarding felt less like "learning a new system" and more like "bringing on a trusted colleague"? Natural language as interface. Brief instead of train. Direct instead of manage.
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">Breaking the Paradox</h3>
                <p className="mb-6">
                    The paradox breaks when you can start immediately. Not quickly. Now. Not a thought experiment. How people work with us.
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">Brief, Not Configure</h3>
                <p className="mb-6">
                    You don't set up Common Thread. You brief us. The same way you'd brief a trusted colleague who knows your business, remembers your preferences, understands your context.
                </p>
                <p className="mb-6">
                    The relationship isn't vendor-customer. Employer-service. You direct. We execute. The machinery remains irrelevant to your experience. Not hidden. Irrelevant. What you preserve is bandwidth. What you gain is the ability to act on opportunity the moment you see it.
                </p>
                <p className="mb-6">
                    When adoption takes minutes instead of months, the math changes completely. The businesses that need operational support most can finally afford it. Not in dollars. In time. The paradox dissolves. Strategic agility becomes accessible.
                </p>
            </>
        )
    },
    {
        id: 4,
        title: "The Invisible Service Standard",
        excerpt: "The best technology is the technology you never think about. Not hidden, but irrelevant to your experience.",
        date: "Nov 01, 2024",
        readTime: "4 min read",
        category: "Service",
        Visual: VisualMagnet,
        content: (
            <>
                <p className="mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left">
                    You don't think about how a phone call works. You talk. The person on the other end hears you. The mechanics are irrelevant to your experience. Not hidden. Irrelevant.
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">The Visibility Problem</h3>
                <p className="mb-6">
                    Most systems demand constant attention. Configuration. Management. Monitoring. The cognitive overhead of "using" something consumes mental real estate. Visibility correlates with friction.
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">Invisible vs. Hidden</h3>
                <p className="mb-6">
                    Hidden implies secrecy. Invisible means irrelevant to experience. You could understand it if you wanted. You don't need to. Like electricity. Like a trusted colleague.
                </p>
                <p className="mb-6">
                    When the process is invisible, the connection becomes infinite. You think about outcomes, not mechanisms. Strategic focus instead of operational focus. Direction instead of management. The space between decision and result disappears.
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">The Trust Equation</h3>
                <p className="mb-6">
                    True invisibility is not hidden infrastructure. Infrastructure that earns irrelevance through absolute reliability. The difference matters.
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">Opacity vs Irrelevance</h3>
                <p className="mb-6">
                    Hidden systems create dependency without understanding. Black boxes demanding trust before proving value. Invisible systems prove value so consistently that understanding becomes optional. You could examine the mechanism if you wanted. You don't need to.
                </p>
                <p className="mb-6">
                    This is why electricity is invisible but a locked filing cabinet is merely opaque. One has earned its irrelevance through decades of consistent performance. The other demands acceptance without demonstration.
                </p>
                <h3 className="font-serif text-2xl mb-4 mt-8">Earning Irrelevance</h3>
                <p className="mb-6">
                    Common Thread operates on this principle. You can see exactly how your direction becomes reality. Every decision. Every routing choice. Every context preservation is visible if you want to look. But when the work consistently delivers what you meant, not just what you said, the mechanism becomes irrelevant to your experience.
                </p>
                <p className="mb-6">
                    Trust built on opacity fails under pressure. Trust built on consistent reliability becomes invisible. Infrastructure recedes. What remains is the connection between your intent and its realization. Direct. Continuous. Compressed to nearly zero latency.
                </p>
                <p className="mb-6">
                    When the machinery proves itself through performance, attention returns to what actually matters. Strategic thinking. Creative direction. Human judgment applied at the highest leverage points. The infrastructure doesn't disappear. It becomes irrelevant to your daily experience. Not hiding the complexity. Earning the right to be forgotten.
                </p>
            </>
        )
    }
];

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

    // Scroll to top when activePost changes
    useEffect(() => {
        if (activePost && scrollContainerRef.current) {
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

                            <div className={`text-lg md:text-xl leading-relaxed opacity-90 font-serif ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
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
