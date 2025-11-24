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
    title: (<span>Thought. Signal. <span className="italic text-white/50">Action.</span></span>),
    body: "The distance between intent and execution is disappearing.",
    supportingContent: (
      <div>
        <SupportingSubheading>Core Mission</SupportingSubheading>
        <p className="mb-4">When latency approaches zero, work changes fundamentally. Strategy and execution become continuous.</p>
        <p>Time returns to its rightful owner: the human mind.</p>
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
        <p className="mb-4">In that version, context travels intact. What you meant and what happens become the same thing.</p>
        <p>The signal completes its journey.</p>
      </div>
    ),
    Visual: VisualPhilosophy
  },
  {
    id: 3,
    label: "03 / Mechanism",
    title: "The Invisible Machine.",
    body: "Connection is the human signal. Direction becomes action.",
    supportingContent: (
      <div>
        <SupportingSubheading>The Space Between</SupportingSubheading>
        <p className="mb-4">Infrastructure handles execution. Complexity recedes from view.</p>
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
        <SupportingSubheading>Human Restoration</SupportingSubheading>
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
    title: "Engagement.",
    body: "This way of working exists.",
    supportingContent: (
      <div>
        <SupportingSubheading>What's Available</SupportingSubheading>
        <p className="mb-6">Strategic clarity flows into operational reality. The invisible machinery handles translation.</p>
        <p className="mb-6">Connection without friction. Direction without dilution.</p>
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