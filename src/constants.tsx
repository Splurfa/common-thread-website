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

export const slides: Slide[] = [
  {
    id: 1,
    label: "01 / State of Mind",
    title: (<span>Thought. Signal. <span className="italic text-white/50">Action.</span></span>),
    body: "The distance between intent and execution is about to disappear.",
    supportingContent: (
      <div>
        <SupportingSubheading>The Foundation</SupportingSubheading>
        <p className="mb-4">We begin by understanding how you work—where the friction lives, where the leverage points hide. From there, the distance between what you envision and what actually happens starts to close, gradually at first, then all at once.</p>
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