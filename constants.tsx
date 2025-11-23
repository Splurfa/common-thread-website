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

export const slides: Slide[] = [
  {
    id: 1,
    label: "01 / State of Mind",
    title: (<span>Thought. Signal. <br /><span className="italic text-white/50">Action.</span></span>),
    body: "The distance between intent and execution disappears here.",
    supportingContent: (
      <div>
        <SupportingSubheading>Core Mission</SupportingSubheading>
        <p className="mb-4">Usually, when you have a strategic idea, it gets stuck in the gears of your business. It loses momentum in meetings, emails, and confusion.</p>
        <p>We close that gap. Your time goes back to where it belongs: thinking, not managing.</p>
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
        <SupportingSubheading>What Changes</SupportingSubheading>
        <p className="mb-4">Delegation is often messy. You say one thing, they hear another, and the nuance gets lost.</p>
        <p>Imagine if nothing got lost. Imagine if your team understood your intent perfectly, every time.</p>
      </div>
    ),
    Visual: VisualPhilosophy
  },
  {
    id: 3,
    label: "03 / Mechanism",
    title: "The Invisible Machine.",
    body: "You provide the unique human signal—the connection. Infrastructure handles the rest.",
    supportingContent: (
      <div>
        <SupportingSubheading>The Space Between</SupportingSubheading>
        <p className="mb-4">We compress the distance between what you want and what actually happens.</p>
        <p>No management overhead. No translation errors. Just the connection between you and the result.</p>
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
        <SupportingSubheading>Human Restoration</SupportingSubheading>
        <p className="mb-4">Work should be about thinking, strategy, and connection—not checking boxes.</p>
        <p>The real return on investment isn't just efficiency. It's your sanity.</p>
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
      <div className="grid grid-cols-1 gap-12 md:gap-16">
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
    title: "Begin the Transition.",
    body: "Identify the gap between your potential and your reality.",
    supportingContent: (
      <div>
        <SupportingSubheading>Next Steps</SupportingSubheading>
        <p className="mb-6">This isn't about whether it's possible. It's about whether you're ready to work differently.</p>
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