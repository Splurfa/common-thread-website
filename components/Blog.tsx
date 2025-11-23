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
                    In October's strategy meeting, a key client mentioned concerns about response time during the pricing discussion. By January's renewal, that context had evaporated. The team proposed the same pricing structure that triggered the original concern. Valuable context lost in a three-month gap.
                </p>
                <h3 className="font-serif text-[22px] md:text-[22px] leading-tight mb-3 font-semibold tracking-tight mt-8 text-white">The Missing Infrastructure Layer</h3>
                <p className="mb-6">
                    Most systems treat every interaction as new. Client preferences stated in one conversation don't carry forward to the next. Strategic context from a quarterly review doesn't inform the following quarter's execution. The cost of this stateless approach compounds over time.
                </p>
                <p className="mb-6">
                    Re-briefing becomes the hidden tax on every decision. Before executing, context must be reconstructed. What was said in previous meetings. What worked last time. What matters most for this particular stakeholder. This reconstruction consumes time and introduces errors.
                </p>
                <p className="mb-6">
                    What's missing isn't process documentation. It's memory infrastructure—systems that preserve context automatically, making re-explanation unnecessary.
                </p>
                <h3 className="font-serif text-[22px] md:text-[22px] leading-tight mb-3 font-semibold tracking-tight mt-8 text-white">Three Types of Memory That Matter</h3>
                <p className="mb-6">
                    <strong>Episodic memory</strong> captures specific events and their context. Last quarter, Client X raised response time concerns during the pricing discussion. That context prevents renewal friction this quarter. Without episodic memory, the same issue surfaces repeatedly.
                </p>
                <p className="mb-6">
                    <strong>Procedural memory</strong> internalizes how work gets done. The CFO wants summaries before details. Marketing prefers directional guidance over precise specifications. These preferences aren't documented—they're learned through repetition and recalled automatically.
                </p>
                <p className="mb-6">
                    <strong>Semantic memory</strong> encodes principles that shape judgment. Finance prioritizes precision over speed. Marketing prioritizes speed over precision. Legal prioritizes completeness over brevity. These context-dependent rules guide every decision without requiring re-statement.
                </p>
                <p className="mb-6">
                    When all three memory types persist, delegation preserves complete context. The reasons behind decisions travel with the work itself.
                </p>
                <h3 className="font-serif text-[22px] md:text-[22px] leading-tight mb-3 font-semibold tracking-tight mt-8 text-white">The Human Standard</h3>
                <p className="mb-6">
                    Working with someone who has perfect recall changes what's possible. Strategic insights don't need repeating. Edge cases mentioned once stay remembered. Delegation becomes lossless—what matters in the decision reaches execution intact.
                </p>
                <p className="mb-6">
                    This isn't about eliminating human judgment. It's about eliminating everything else—the re-briefings, the context reconstruction, the preventable errors from forgotten details. Memory infrastructure handles persistence so strategic thinking can focus on what actually requires judgment.
                </p>
                <h3 className="font-serif text-[22px] md:text-[22px] leading-tight mb-3 font-semibold tracking-tight mt-8 text-white">Memory in Practice</h3>
                <p className="mb-6">
                    Preparing the quarterly board deck demonstrates all three memory types working together. Episodic memory: last quarter's feedback about data visualization density shapes this quarter's approach. Procedural memory: the board's preferred flow—strategic context first, financial details second—becomes automatic. Semantic memory: the company's emphasis on growth metrics over profitability metrics guides which numbers receive prominence.
                </p>
                <p className="mb-6">
                    Without memory infrastructure, each deck starts from zero. With it, each deck builds on everything learned before.
                </p>
                <h3 className="font-serif text-[22px] md:text-[22px] leading-tight mb-3 font-semibold tracking-tight mt-8 text-white">Building Memory Infrastructure</h3>
                <p className="mb-6">
                    Memory is infrastructure. We're building it.
                </p>
            </>
        )
    },
    {
        id: 2,
        title: "The Distance Between Decision and Reality",
        excerpt: "Decision latency compounds into strategic paralysis. When competitors execute in weeks and you execute in months, velocity becomes the competitive moat.",
        date: "Nov 15, 2024",
        readTime: "5 min read",
        category: "Strategy",
        Visual: VisualNet,
        content: (
            <>
                <p className="mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left">
                    A market window opened in March. The team recognized the opportunity immediately and committed to a product pivot. Three months later, the pivot launched. The market window had closed in six weeks. A competitor captured the opportunity in two.
                </p>
                <p className="mb-6">
                    The decision was right. The strategy was sound. The delay was fatal.
                </p>
                <h3 className="font-serif text-[22px] md:text-[22px] leading-tight mb-3 font-semibold tracking-tight mt-8 text-white">Why Latency Compounds</h3>
                <p className="mb-6">
                    Decision latency isn't linear—it multiplies. A one-week delay in Q1 becomes a four-week strategic disadvantage by Q2. Competitors move while plans are being documented. Market conditions shift while implementation is being scoped. Customer preferences evolve while systems are being configured.
                </p>
                <p className="mb-6">
                    The compounding happens in three ways. First, lost first-mover advantage. Being second to market means competing on features instead of defining the category. Second, momentum decay. Teams lose conviction when execution lags strategy. Third, coordination overhead. Longer timelines mean more stakeholder alignment, more updates, more meetings about meetings.
                </p>
                <p className="mb-6">
                    Traditional execution assumes time is available. Build the plan. Get approvals. Configure systems. Train teams. Launch. This works when markets move slowly. When competitors execute in days instead of months, traditional timelines become strategic paralysis.
                </p>
                <h3 className="font-serif text-[22px] md:text-[22px] leading-tight mb-3 font-semibold tracking-tight mt-8 text-white">The Velocity Formula</h3>
                <p className="mb-6">
                    Velocity isn't just speed—it's decision clarity multiplied by execution speed, compounded over time. The formula: V = (C × S)^t.
                </p>
                <p className="mb-6">
                    Decision clarity (C): knowing exactly what needs to happen. Execution speed (S): how fast that becomes real. Time (t): the exponential factor. Small improvements in C or S produce exponential advantages over quarters and years.
                </p>
                <p className="mb-6">
                    A company with 90% decision clarity and 90% execution speed operating over four quarters: V = (0.9 × 0.9)^4 = 0.53. A company with 95% clarity and 95% speed: V = (0.95 × 0.95)^4 = 0.81. The 5% improvement in both factors produces a 53% velocity advantage.
                </p>
                <p className="mb-6">
                    This explains why some companies maintain competitive moats despite similar resources. Velocity compounds. Small systematic advantages in decision-to-delivery become insurmountable leads over time.
                </p>
                <h3 className="font-serif text-[22px] md:text-[22px] leading-tight mb-3 font-semibold tracking-tight mt-8 text-white">Building the Velocity Engine</h3>
                <p className="mb-6">
                    Reducing latency requires eliminating the translation layers between decision and execution. Most organizations compress strategic intent through multiple transformations: decision → documentation → planning → implementation → delivery. Each transformation introduces delay and drift.
                </p>
                <p className="mb-6">
                    The alternative: decision → delivery. When the person executing the work understands strategic context directly, planning becomes embedded in execution. When that understanding persists across time, each decision builds on previous context instead of starting from zero.
                </p>
                <p className="mb-6">
                    This is Common Thread's design. Strategy expressed in natural language becomes execution without translation. Context from previous decisions informs current work without re-explanation. The velocity formula's components improve simultaneously: clearer decisions (no documentation drift) and faster execution (no configuration overhead).
                </p>
                <p className="mb-6">
                    Velocity is the new competitive moat. Markets reward companies that can identify opportunities and capture them before they close. When your competition moves in months and you move in days, the advantage compounds until it becomes permanent.
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
                    You have two hours per week for operations. Every automation system needs forty hours to set up. Go.
                </p>
                <p className="mb-6">
                    This is the cruel math. The businesses running leanest need operational support most. They also can't afford the time to adopt it.
                </p>
                <h3 className="font-serif text-[22px] md:text-[22px] leading-tight mb-3 font-semibold tracking-tight mt-8 text-white">The Adoption Tax</h3>
                <p className="mb-6">
                    Research phase: 40 hours reading documentation, watching demos, comparing features. Configuration: 80 hours mapping workflows, setting permissions, connecting systems. Training: 60 hours learning interfaces your team will use daily. Integration: 120 hours debugging conflicts with existing tools.
                </p>
                <p className="mb-6">
                    Total: 300 hours before the first minute of value. For a three-person startup, that's two full months of one person's time. For a solo founder, it's two months of nights and weekends.
                </p>
                <p className="mb-6">
                    The data tells the story: 80% of small businesses could benefit from automation. 95% can't afford the setup time. Traditional automation was built for enterprises with implementation teams. The 95% were never the customer.
                </p>
                <h3 className="font-serif text-[22px] md:text-[22px] leading-tight mb-3 font-semibold tracking-tight mt-8 text-white">The Inversion</h3>
                <p className="mb-6">
                    What if onboarding took one conversation instead of three months? What if the adoption tax approached zero?
                </p>
                <p className="mb-6">
                    The barrier isn't complexity. It's interface. Every system assumes you'll learn its language, adopt its mental model, conform to its structure. That assumption is what makes automation inaccessible.
                </p>
                <h3 className="font-serif text-[22px] md:text-[22px] leading-tight mb-3 font-semibold tracking-tight mt-8 text-white">Brief, Not Configure</h3>
                <p className="mb-6">
                    You don't configure a new hire. You brief them. "Here's what we're working on. Here's how we work. Here's what matters most." They ask clarifying questions. You refine. Work begins.
                </p>
                <p className="mb-6">
                    That's the interface. Natural language. Not forms, workflows, or permission matrices. You describe what needs doing. Context accumulates through conversation, not configuration files.
                </p>
                <p className="mb-6">
                    A colleague remembers that Client X prefers morning calls. That the finance report goes out Fridays. That you need the executive summary first, details second. These aren't settings to configure. They're working context that builds naturally.
                </p>
                <p className="mb-6">
                    The relationship model shifts completely. Not vendor-customer. Employer-service. You direct. We execute. No translation layer between intent and action. No manual to learn. No system to master.
                </p>
                <p className="mb-6">
                    This unlocks access for everyone automation left behind. The solo consultant managing three clients. The founder running a five-person team. The small business owner working nights to stay ahead. The 95% who need leverage but can't afford the setup tax.
                </p>
                <p className="mb-6">
                    When adoption takes minutes instead of months, the math inverts completely. Automation becomes accessible not to the 5% with implementation budgets, but to the 95% who need it most. The paradox dissolves.
                </p>
            </>
        )
    },
    {
        id: 4,
        title: "The Invisible Service Standard",
        excerpt: "Services become invisible by earning trust. The path from opaque to irrelevant requires consistency, accuracy, and time.",
        date: "Nov 01, 2024",
        readTime: "5 min read",
        category: "Service",
        Visual: VisualMagnet,
        content: (
            <>
                <p className="mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left">
                    A filing cabinet and a light switch both hide complexity. One demands blind trust. The other earned irrelevance through reliability.
                </p>
                <p className="mb-6">
                    You can't see inside the locked filing cabinet. You must trust someone knows where your documents are, that they're organized correctly, that retrieval will happen when you need it. Trust demanded before value proven.
                </p>
                <p className="mb-6">
                    The light switch is different. Flip it on. Light appears. Decades of grid reliability mean you never think about transformers, load balancing, or transmission lines. The mechanism earned the right to be forgotten.
                </p>
                <h3 className="font-serif text-[22px] md:text-[22px] leading-tight mb-3 font-semibold tracking-tight mt-8 text-white">The Trust Ladder</h3>
                <p className="mb-6">
                    Services move through three stages. Most technology gets stuck at stage two.
                </p>
                <p className="mb-6">
                    <strong>Opaque.</strong> The filing cabinet stage. How it works is hidden. You must trust the system works, but you can't verify. This creates dependency without understanding. Most legacy enterprise software operates here. Black boxes that demand faith.
                </p>
                <p className="mb-6">
                    <strong>Transparent.</strong> The dashboard stage. You can see everything: metrics, logs, performance data, system health. Modern SaaS lives here. Analytics dashboards. Monitoring tools. Observability platforms. Visibility is high. So is cognitive load.
                </p>
                <p className="mb-6">
                    The problem: transparency doesn't equal reliability. Dashboards show you what's happening, but you still have to watch them. Alerts still demand attention. Visibility creates its own work.
                </p>
                <p className="mb-6">
                    <strong>Irrelevant.</strong> The utility stage. The system works so consistently you stop checking. Not because you can't see how it works. Because you don't need to. The electric grid. Running water. Phone calls. These systems earned irrelevance through decades of reliability.
                </p>
                <h3 className="font-serif text-[22px] md:text-[22px] leading-tight mb-3 font-semibold tracking-tight mt-8 text-white">Why Technology Stalls at Transparent</h3>
                <p className="mb-6">
                    Most technology companies mistake visibility for trust. They build dashboards thinking transparency solves the reliability problem. It doesn't.
                </p>
                <p className="mb-6">
                    A monitoring dashboard showing 99.9% uptime still requires you to monitor it. Slack notifications about system health still interrupt your work. Transparency without reliability just creates more work: watching the watcher.
                </p>
                <p className="mb-6">
                    The tech industry celebrates observability as the solution. More metrics. Better logging. Richer dashboards. But observability assumes you need to observe. True reliability makes observation optional.
                </p>
                <h3 className="font-serif text-[22px] md:text-[22px] leading-tight mb-3 font-semibold tracking-tight mt-8 text-white">What Earning Irrelevance Requires</h3>
                <p className="mb-6">
                    Three things must be true before a service earns the right to be forgotten.
                </p>
                <p className="mb-6">
                    <strong>Consistency.</strong> The system works the same way every time. Not 99% of the time. Every time. You flip the switch, the light turns on. You turn the tap, water flows. No variance. No surprises. Consistency builds the muscle memory that allows you to stop thinking about the mechanism.
                </p>
                <p className="mb-6">
                    <strong>Accuracy.</strong> The system delivers your intent, not your literal words. When you ask someone to "handle the Johnson account," a reliable colleague knows what that means in context. They don't require a 10-step procedure. They understand what you meant. Systems that require perfect instructions haven't earned irrelevance yet.
                </p>
                <p className="mb-6">
                    <strong>Longevity.</strong> Trust comes from track record, not promises. The electric grid earned irrelevance over 100 years. Your most trusted colleague earned it through hundreds of successful deliveries. Time proves reliability. Marketing claims don't.
                </p>
                <h3 className="font-serif text-[22px] md:text-[22px] leading-tight mb-3 font-semibold tracking-tight mt-8 text-white">Common Thread's Path</h3>
                <p className="mb-6">
                    We're building toward irrelevance deliberately. Not by hiding how things work. By making the work reliable enough that you don't need to watch it.
                </p>
                <p className="mb-6">
                    Context preservation means you don't repeat yourself. When you mention a client preference once, it stays remembered. Consistency: the system works the same way every interaction.
                </p>
                <p className="mb-6">
                    Delegation fidelity means the work matches your intent. You describe the outcome. The execution delivers what you meant, not just what you said. Accuracy: understanding replaces instruction-following.
                </p>
                <p className="mb-6">
                    Cross-session memory means your relationship has history. Last month's decisions inform this month's execution. Longevity: trust builds through repeated reliability over time.
                </p>
                <p className="mb-6">
                    Every decision remains visible if you want to examine it. Every routing choice. Every context application. But when execution consistently delivers without requiring your attention, you stop checking. Not because you can't. Because you don't need to.
                </p>
                <h3 className="font-serif text-[22px] md:text-[22px] leading-tight mb-3 font-semibold tracking-tight mt-8 text-white">Building Utilities, Not Dashboards</h3>
                <p className="mb-6">
                    The dashboard industry sells transparency as the solution. We're solving a different problem. Not making the work visible. Making it reliable enough to forget.
                </p>
                <p className="mb-6">
                    When your operational infrastructure reaches utility status, strategic bandwidth expands. Attention returns to judgment, creativity, direction. The high-leverage work that only you can do.
                </p>
                <p className="mb-6">
                    That's the invisible service standard. Not hiding complexity. Earning irrelevance through absolute reliability.
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
