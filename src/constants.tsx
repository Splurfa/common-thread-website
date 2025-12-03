import React from 'react';
import { Slide } from './types';
import { MonoLabel, SupportingSubheading } from './components/Typography';
import {
  VisualHero,
  VisualPhilosophy,
  VisualArchitecture,
  VisualValue,
  VisualStewards,
  VisualGateway
} from './components/Visuals';

export const visionModalContent = {
  title: "What This Looks Like",
  content: (
    <div className="space-y-6">
      <p className="text-white/90 leading-relaxed">
        You wake up with an idea for a campaign. By the time you've finished describing it over coffee,
        the first draft is waiting in your inbox—on brand, on message, ready to refine.
      </p>

      <p className="text-white/90 leading-relaxed">
        Your quarterly board report compiles itself from live data, formatted exactly how your investors
        prefer it, highlighting the metrics that matter to them. You review it once and send.
      </p>

      <p className="text-white/90 leading-relaxed">
        A client question arrives at 2am. By morning, they have an answer—in your voice, aligned with
        your values, solving their actual problem. You see the resolution, not the request.
      </p>

      <p className="text-white/90 leading-relaxed">
        You think about following up with that prospect. The system already did, three days ago,
        when the timing was right. Now they're ready to talk.
      </p>

      <div className="pt-4 border-t border-white/10">
        <p className="text-white/70 leading-relaxed italic">
          This is not automation. This is alignment. The distance between what you intend
          and what actually happens—that distance goes to zero.
        </p>
      </div>
    </div>
  )
};

export const mechanismModalContent = {
  title: "What You Don't Have to Do Anymore",
  content: (
    <div className="space-y-8">
      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3">The Marketing Leader</h3>
        <p className="text-white/90 leading-relaxed mb-4">
          No more formatting campaign reports at midnight. No more chasing analytics across three different dashboards,
          copying numbers into slides, making sure the percentages add up.
        </p>
        <p className="text-white/70 leading-relaxed">
          You focus on the story. The message. What resonates with your audience and why.
          The production, the measurement, the follow-through—that happens in the background.
        </p>
      </div>

      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3">The Operations Manager</h3>
        <p className="text-white/90 leading-relaxed mb-4">
          No more reminding people about deadlines, hunting down status updates, consolidating scattered information
          from email threads and Slack channels into something coherent.
        </p>
        <p className="text-white/70 leading-relaxed">
          You focus on the decisions that matter. Where the bottlenecks are. What needs to change.
          The routine coordination, the status tracking, the information synthesis—it just happens.
        </p>
      </div>

      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3">The Business Owner</h3>
        <p className="text-white/90 leading-relaxed mb-4">
          No more writing the same email twelve different ways. No more remembering to follow up, to check in,
          to send that thing you promised. No more late nights creating first drafts of documents that someone
          else could handle if you could just articulate what you need.
        </p>
        <p className="text-white/70 leading-relaxed">
          You focus on vision. Strategy. The relationships that matter. The creative work only you can do.
          Everything else—the execution, the follow-through, the thousand small things that keep you
          from your actual work—fades into the background.
        </p>
      </div>

      <div className="pt-6 border-t border-white/10">
        <p className="text-white/60 leading-relaxed italic">
          This is not about working less. It's about working on what you were meant to work on.
          The distance between your judgment and its execution—that's what disappears.
        </p>
      </div>
    </div>
  )
};

export const valueModalContent = {
  title: "The Return",
  content: (
    <div className="space-y-6">
      <p className="text-white/90 leading-relaxed">
        The hours come back first. Not in spreadsheets or time logs, but in the sudden realization
        that you left work at a reasonable hour. That you answered your kid's question without
        glancing at your phone. That Sunday evening doesn't carry that particular weight anymore.
      </p>

      <p className="text-white/90 leading-relaxed">
        Then the decisions simplify. Not because there are fewer of them, but because the noise
        falls away. What remains are the choices that actually matter—the ones only you can make.
        The rest handles itself, invisibly, the way breathing happens without conscious thought.
      </p>

      <p className="text-white/90 leading-relaxed">
        Focus returns like an old friend. That deep-work state you used to find before everything
        became urgent. The ability to hold a complex thought long enough to see where it leads.
        Strategic thinking instead of tactical firefighting.
      </p>

      <p className="text-white/90 leading-relaxed">
        Mental space opens up. The background anxiety of things undone, messages unanswered,
        details untracked—it quiets. Not because you're ignoring it, but because it's handled.
        You trust the system the way you trust gravity.
      </p>

      <div className="pt-4 border-t border-white/10">
        <p className="text-white/70 leading-relaxed italic">
          This is the return. Not measured in saved minutes or productivity gains, but in
          reclaimed humanity. In the ability to be present. In work that feels like work again,
          not an endless state of emergency.
        </p>
      </div>
    </div>
  )
};

// ============================================================================
// PERSPECTIVE CONTENT
// Used with PerspectiveSelector component for 3-role cascade view
// Each modal that uses perspectives has content for: Owner, Manager, Team Member
// ============================================================================

export const mechanismPerspectives = {
  owner: <div>[OWNER: What you don't have to do anymore - PLACEHOLDER]</div>,
  manager: <div>[MANAGER: What you don't have to do anymore - PLACEHOLDER]</div>,
  teamMember: <div>[TEAM MEMBER: What you don't have to do anymore - PLACEHOLDER]</div>
};

export const visionPerspectives = {
  owner: <div>[OWNER: What this looks like for you - PLACEHOLDER]</div>,
  manager: <div>[MANAGER: What this looks like for you - PLACEHOLDER]</div>,
  teamMember: <div>[TEAM MEMBER: What this looks like for you - PLACEHOLDER]</div>
};

export const valuePerspectives = {
  owner: <div>[OWNER: What you get back - PLACEHOLDER]</div>,
  manager: <div>[MANAGER: What you get back - PLACEHOLDER]</div>,
  teamMember: <div>[TEAM MEMBER: What you get back - PLACEHOLDER]</div>
};

export const engagementPerspectives = {
  owner: <div>[OWNER: What working with us feels like - PLACEHOLDER]</div>,
  manager: <div>[MANAGER: What working with us feels like - PLACEHOLDER]</div>,
  teamMember: <div>[TEAM MEMBER: What working with us feels like - PLACEHOLDER]</div>
};

export const engagementModalContent = {
  title: "What Working With Us Feels Like",
  content: (
    <div className="space-y-6">
      <p className="text-white/90 leading-relaxed">
        There's this moment, usually a few weeks in, where you notice the absence of something.
        That low-grade anxiety about whether things are moving forward, whether someone saw
        your message, whether you need to follow up again. It's just... gone.
      </p>

      <p className="text-white/90 leading-relaxed">
        You find yourself starting conversations differently. Not with instructions or requests,
        but with half-formed thoughts. "I'm thinking about..." and then watching as that thread
        gets picked up, understood, extended. It stops feeling like delegation and starts
        feeling like thinking out loud with someone who gets it.
      </p>

      <p className="text-white/90 leading-relaxed">
        The thing that catches people off guard is how often something gets done before they
        realize they needed it. Not in a presumptuous way—it's still your call, always—but
        in that way where you open your inbox and think "oh, right, I was going to handle that."
        Past tense. Already there.
      </p>

      <p className="text-white/90 leading-relaxed">
        And then there's the space. The mental space that opens up when you're not carrying
        the cognitive load of tracking everything, remembering everything, being the connective
        tissue for everything. You realize you're thinking strategically again, not just
        tactically. You have room to wonder, to explore, to actually lead.
      </p>

      <div className="pt-4 border-t border-white/10">
        <p className="text-white/70 leading-relaxed italic">
          This is what partnership feels like. Not vendor and client. Not even colleague
          and colleague. Something closer to extension—where your judgment and intention
          flow through without friction, without translation, without loss.
        </p>
      </div>
    </div>
  )
};

export const derekBioContent = {
  name: "Derek Yellin",
  role: "Chief Executive Officer",
  tagline: "Defining the human vector.",
  bio: (
    <div className="space-y-4">
      <p className="text-white/90 leading-relaxed">
        Derek's work has always been about understanding the space between what people intend
        and what actually happens. Before Common Thread, he spent fifteen years inside
        businesses—some scaling rapidly, others struggling to coordinate their own complexity.
        He learned that the problem is never the technology. It's the translation layer.
      </p>

      <p className="text-white/90 leading-relaxed">
        The best tools disappear. They become extensions of thought, not obstacles to it.
        Derek's philosophy is simple: if a system requires you to think like a machine,
        the system is broken. Technology should adapt to human intent, not the other way around.
      </p>

      <p className="text-white/90 leading-relaxed">
        At Common Thread, he's building that translation layer—one that understands context,
        preserves judgment, and closes the distance between vision and execution. The goal
        isn't efficiency for its own sake. It's restoring the conditions under which
        people do their best work.
      </p>
    </div>
  ),
  linkedIn: "https://linkedin.com/in/derekyelling"
};

export const justynBioContent = {
  name: "Justyn Clark",
  role: "Chief Technology Officer",
  tagline: "Building the invisible machine.",
  bio: (
    <div className="space-y-4">
      <p className="text-white/90 leading-relaxed">
        Justyn builds systems that disappear. His background spans financial infrastructure,
        distributed systems, and enterprise platforms—places where complexity is the norm
        and failure is expensive. What he learned: the most powerful technology is the kind
        you never think about. It simply works.
      </p>

      <p className="text-white/90 leading-relaxed">
        Great architecture is invisible. It absorbs complexity without creating friction.
        It scales without demanding attention. Justyn's approach is rooted in restraint—
        solving the right problem elegantly rather than building elaborate solutions to
        the wrong one. Less code, more clarity. Less configuration, more intelligence.
      </p>

      <p className="text-white/90 leading-relaxed">
        At Common Thread, he's architecting systems that think like humans but execute like machines.
        Systems that understand intent, preserve nuance, and handle the thousand details that
        stand between decision and outcome. Technology that earns trust by never asking for it.
      </p>
    </div>
  ),
  linkedIn: "https://linkedin.com/in/justynclark"
};

export const slides: Slide[] = [
  {
    id: 1,
    label: "01 / State of Mind",
    title: (<span>Thought. Signal. <span className="italic text-white/50">Action.</span></span>),
    body: "The distance between intent and execution is about to disappear.",
    supportingContent: (
      <div>
        <SupportingSubheading>The Foundation</SupportingSubheading>
        {/* NOTE: Three declarative statements feel performative (manifesto tone).
            Needs rewrite that flows more naturally while keeping same brevity.
            Consider: conversation tone vs. manifesto tone */}
        <p className="mb-4">We learn how you operate. We find the leverage points and the friction.</p>
        <p className="mb-4">The distance closes from there.</p>
        <a
          href="mailto:hello@common-thread.io"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blue-300 hover:text-white transition-colors mt-6"
        >
          Start a conversation →
        </a>
      </div>
    ),
    Visual: VisualHero
  },
  {
    id: 2,
    label: "02 / Vision",
    title: "Elevation.",
    body: "There is a version of your business where you direct, and the world arranges itself accordingly.",
    supportingContent: (
      <div>
        <SupportingSubheading>The Shift</SupportingSubheading>
        <p className="mb-4">In this version, your intention is the only requirement. Everything else falls into place.</p>
        <p>The signal completes its journey.</p>
      </div>
    ),
    Visual: VisualPhilosophy
  },
  {
    id: 3,
    label: "03 / Mechanism",
    title: "The Invisible Machine.",
    body: "Your best work, amplified.",
    supportingContent: (
      <div>
        <SupportingSubheading>The Space Between</SupportingSubheading>
        <p className="mb-4">We absorb the complexity. Your capacity grows without compromising your standards.</p>
        <p>The path clears.</p>
      </div>
    ),
    Visual: VisualArchitecture
  },
  {
    id: 4,
    label: "04 / Value",
    title: "Return to the Essential.",
    body: "When the process is invisible, the connection becomes infinite.",
    supportingContent: (
      <div>
        <SupportingSubheading>The Human Standard</SupportingSubheading>
        <p className="mb-4">Work returns to what it should be. Thinking. Strategy. Connection.</p>
        <p>ROI is not efficiency. It is sanity.</p>
      </div>
    ),
    Visual: VisualValue
  },
  {
    id: 5,
    label: "05 / Leadership",
    title: "The Architects.",
    body: "We are stewards of connection, ensuring technology amplifies human intent.",
    supportingContent: (
      <div className="grid grid-cols-1 gap-8 md:gap-16">
        <div>
          <SupportingSubheading className="mb-0">Derek Yellin</SupportingSubheading>
          <MonoLabel className="block mt-2 text-white/40 text-[10px] md:text-xs">Chief Executive Officer</MonoLabel>
          <p className="font-serif text-lg text-white/70 leading-relaxed mt-2 md:mt-3">Defining the human vector.</p>
        </div>
        <div>
          <SupportingSubheading className="mb-0">Justyn Clark</SupportingSubheading>
          <MonoLabel className="block mt-2 text-white/40 text-[10px] md:text-xs">Chief Technology Officer</MonoLabel>
          <p className="font-serif text-lg text-white/70 leading-relaxed mt-2 md:mt-3">Building the invisible machine.</p>
        </div>
      </div>
    ),
    Visual: VisualStewards
  },
  {
    id: 6,
    label: "06 / Engagement",
    title: "Our Invitation.",
    body: "This way of working exists, and it starts with a conversation.",
    supportingContent: (
      <div>
        <SupportingSubheading>The Path Forward</SupportingSubheading>
        <p className="mb-6">You share the vision. We find the openings. Together, we see what's possible.</p>
        <div className="inline-block py-2 px-2 -mx-2">
          <a
            href="#blog"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blue-300 hover:text-white transition-all duration-500 ease-out transform hover:scale-105 group"
            style={{ transformOrigin: 'center center' }}
          >
            Read our latest insights
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    ),
    Visual: VisualGateway
  }
];