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