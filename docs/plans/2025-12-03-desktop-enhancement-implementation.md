# Desktop Enhancement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enhance the desktop experience with a gateway entry point, bolder typography, and a modal system for optional depth.

**Architecture:** New Gateway component renders before StandardLayout, controls entry flow. Modal system is a reusable component triggered by hyperlinks within slide content. Desktop layout gets typography scale adjustments.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, existing PhysicsCanvas for gateway visual.

**Note:** No test infrastructure exists. Verification via dev server visual inspection.

---

## Phase 1: Foundation

### Task 1: Create Modal Component Infrastructure

**Files:**
- Create: `src/components/Modal.tsx`
- Create: `src/types.ts` (if not exists, or modify)

**Step 1: Create Modal component**

```tsx
// src/components/Modal.tsx
import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300"
    >
      <div className="relative max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-lg p-8 md:p-12">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors font-mono text-sm"
          aria-label="Close modal"
        >
          ✕
        </button>

        {title && (
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-6">{title}</h2>
        )}

        <div className="font-serif text-white/70 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify in dev server**

Run: `npm run dev`
Expected: App loads without errors (Modal not rendered yet)

**Step 3: Commit**

```bash
git add src/components/Modal.tsx
git commit -m "feat: add Modal component infrastructure"
```

---

### Task 2: Create Gateway Component

**Files:**
- Create: `src/components/Gateway.tsx`
- Modify: `src/App.tsx`

**Step 1: Create Gateway component**

```tsx
// src/components/Gateway.tsx
import React, { useState, useEffect, Suspense } from 'react';

const PhysicsCanvas = React.lazy(() => import('./visual-drafts/PhysicsCanvas'));

interface GatewayProps {
  onEnter: () => void;
}

export function Gateway({ onEnter }: GatewayProps) {
  const [showText, setShowText] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Reveal text after ambient moment
  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => onEnter(), 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0a0a0a] flex items-center justify-center transition-transform duration-700 ease-out ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Physics background */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <PhysicsCanvas />
        </Suspense>
      </div>

      {/* Content overlay */}
      <div
        className={`relative z-10 text-center px-8 transition-all duration-1000 ${
          showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight">
          Simplify the complex.
        </h1>
        <p className="font-serif text-lg md:text-xl text-white/60 mb-12 max-w-xl mx-auto">
          A new way of working is waiting.
        </p>
        <button
          onClick={handleEnter}
          className="font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-300 border border-white/20 hover:border-white/40 px-8 py-4 rounded"
        >
          Enter
        </button>
      </div>
    </div>
  );
}
```

**Step 2: Integrate Gateway into App.tsx**

Modify `src/App.tsx` - add Gateway state and conditional render:

```tsx
// At top of App.tsx, add import:
import { Gateway } from './components/Gateway';

// Inside App component, add state:
const [showGateway, setShowGateway] = useState(true);

// Before the return statement that renders layouts, add:
if (showGateway) {
  return <Gateway onEnter={() => setShowGateway(false)} />;
}
```

**Step 3: Verify in dev server**

Run: `npm run dev`
Expected: Gateway appears first, physics canvas interactive, text fades in after 1.5s, "Enter" slides up to reveal main site

**Step 4: Commit**

```bash
git add src/components/Gateway.tsx src/App.tsx
git commit -m "feat: add Gateway entry point with physics canvas"
```

---

## Phase 2: Desktop Typography Enhancement

### Task 3: Scale Up Desktop Headlines

**Files:**
- Modify: `src/components/Typography.tsx`
- Modify: `src/components/layouts/StandardLayout.tsx`

**Step 1: Review current Typography.tsx**

Read file to understand existing components.

**Step 2: Enhance headline scaling**

Update headline components to be significantly bolder on desktop. Add new scale classes or modify existing.

**Step 3: Adjust StandardLayout desktop text container**

Increase prominence of text side - larger max-width, bolder typography application.

**Step 4: Verify in dev server**

Expected: Headlines feel architectural, commanding on desktop. Sharp contrast with body text.

**Step 5: Commit**

```bash
git add src/components/Typography.tsx src/components/layouts/StandardLayout.tsx
git commit -m "feat: scale up desktop typography for visual impact"
```

---

### Task 4: Add Hyperlink Styling for Modal Triggers

**Files:**
- Create: `src/components/ContextLink.tsx`

**Step 1: Create ContextLink component**

```tsx
// src/components/ContextLink.tsx
import React from 'react';

interface ContextLinkProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function ContextLink({ onClick, children }: ContextLinkProps) {
  return (
    <button
      onClick={onClick}
      className="text-blue-300 hover:text-blue-200 underline underline-offset-4 decoration-blue-300/50 hover:decoration-blue-200 transition-colors duration-300 cursor-pointer"
    >
      {children}
    </button>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ContextLink.tsx
git commit -m "feat: add ContextLink component for modal triggers"
```

---

## Phase 3: Slide Content with Modals

### Task 5: Slide 1 - Rework Copy Flow

**Files:**
- Modify: `src/constants.tsx`

**Step 1: Rewrite Slide 1 supporting content**

Change from three staccato statements to flowing narrative prose. Keep meaning, improve welcome.

Current:
> "We learn how you operate. We find the leverage points and the friction."
> "The distance closes from there."

Rewrite to:
> "It begins with understanding—how you work, where the friction lives, what's standing between intention and outcome. From there, the distance starts to close."

**Step 2: Verify in dev server**

Expected: Slide 1 supporting content reads as welcoming narrative, not declarations.

**Step 3: Commit**

```bash
git add src/constants.tsx
git commit -m "content: rework Slide 1 copy for narrative flow"
```

---

### Task 6: Slide 2 - Add "What This Looks Like" Modal

**Files:**
- Modify: `src/constants.tsx`
- Create: `src/components/modals/VisionModal.tsx`

**Step 1: Create VisionModal component**

```tsx
// src/components/modals/VisionModal.tsx
import React from 'react';
import { Modal } from '../Modal';

interface VisionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VisionModal({ isOpen, onClose }: VisionModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="What This Looks Like">
      <div className="space-y-6">
        <p>
          Imagine waking up to find that overnight, your team delivered everything you outlined
          yesterday—not because they worked late, but because the system understood your intent
          and made it happen.
        </p>
        <p>
          The proposal you sketched in a meeting is now a polished document. The campaign you
          described is live. The report you needed is waiting in your inbox, exactly as you
          envisioned it.
        </p>
        <p>
          This is what it means for the world to arrange itself around your direction.
        </p>
      </div>
    </Modal>
  );
}
```

**Step 2: Integrate into Slide 2 content**

Modify `constants.tsx` to add a ContextLink in Slide 2 supporting content that triggers the modal.

**Step 3: Verify in dev server**

Expected: Slide 2 has clickable link, opens modal with tangible scenario.

**Step 4: Commit**

```bash
git add src/components/modals/VisionModal.tsx src/constants.tsx
git commit -m "feat: add Vision modal for Slide 2"
```

---

### Task 7: Slide 3 - Add "What You Don't Have To Do" Modal

**Files:**
- Create: `src/components/modals/MechanismModal.tsx`
- Modify: `src/constants.tsx`

**Step 1: Create MechanismModal component**

This is the HIGH LEVERAGE modal - should be rich, potentially multi-section, role-specific.

```tsx
// src/components/modals/MechanismModal.tsx
import React, { useState } from 'react';
import { Modal } from '../Modal';

interface MechanismModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MechanismModal({ isOpen, onClose }: MechanismModalProps) {
  const [activeRole, setActiveRole] = useState<'owner' | 'marketing' | 'operations'>('owner');

  const roles = {
    owner: {
      label: 'Business Owner',
      offload: [
        'Drafting proposals and contracts',
        'Managing routine communications',
        'Tracking and reporting on metrics',
        'Coordinating between teams and vendors',
      ],
      focus: 'Strategy, relationships, and the decisions only you can make.',
    },
    marketing: {
      label: 'Marketing Lead',
      offload: [
        'Creating campaign assets and graphics',
        'Writing and scheduling social content',
        'Compiling performance reports',
        'Managing content calendars',
      ],
      focus: 'Creative direction and connecting with your audience.',
    },
    operations: {
      label: 'Operations Manager',
      offload: [
        'Processing routine requests',
        'Generating status updates',
        'Documenting procedures',
        'Coordinating schedules',
      ],
      focus: 'Improving systems and solving complex problems.',
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="What You Don't Have To Do">
      {/* Role selector */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {Object.entries(roles).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setActiveRole(key as keyof typeof roles)}
            className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded transition-colors ${
              activeRole === key
                ? 'bg-white/10 text-white'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Role content */}
      <div className="space-y-6">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-3">
            We handle:
          </h3>
          <ul className="space-y-2">
            {roles[activeRole].offload.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-blue-300 mt-1">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-3">
            You focus on:
          </h3>
          <p className="text-white">{roles[activeRole].focus}</p>
        </div>
      </div>
    </Modal>
  );
}
```

**Step 2: Integrate into Slide 3 content**

**Step 3: Verify in dev server**

Expected: Slide 3 has modal with interactive role switcher.

**Step 4: Commit**

```bash
git add src/components/modals/MechanismModal.tsx src/constants.tsx
git commit -m "feat: add interactive Mechanism modal for Slide 3"
```

---

### Task 8: Slide 4 - Add "The Return" Modal

**Files:**
- Create: `src/components/modals/ValueModal.tsx`
- Modify: `src/constants.tsx`

**Step 1: Create ValueModal component**

```tsx
// src/components/modals/ValueModal.tsx
import React from 'react';
import { Modal } from '../Modal';

interface ValueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ValueModal({ isOpen, onClose }: ValueModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="The Return">
      <div className="space-y-6">
        <p>
          Sanity as ROI isn't a metaphor. It's the hours you get back. The decisions that
          become clearer when you're not drowning in execution.
        </p>

        <div className="grid gap-4 my-8">
          <div className="border border-white/10 rounded p-4">
            <div className="font-mono text-xs uppercase tracking-wider text-white/40 mb-2">Time Reclaimed</div>
            <p className="text-white">Hours each week returned to thinking, strategy, and connection.</p>
          </div>
          <div className="border border-white/10 rounded p-4">
            <div className="font-mono text-xs uppercase tracking-wider text-white/40 mb-2">Decisions Simplified</div>
            <p className="text-white">When the noise clears, the right path becomes obvious.</p>
          </div>
          <div className="border border-white/10 rounded p-4">
            <div className="font-mono text-xs uppercase tracking-wider text-white/40 mb-2">Focus Restored</div>
            <p className="text-white">The work that matters finally gets the attention it deserves.</p>
          </div>
        </div>

        <p>
          This is what it means when the process becomes invisible.
        </p>
      </div>
    </Modal>
  );
}
```

**Step 2: Integrate into Slide 4 content**

**Step 3: Commit**

```bash
git add src/components/modals/ValueModal.tsx src/constants.tsx
git commit -m "feat: add Value modal for Slide 4"
```

---

### Task 9: Slide 5 - Add Bio Modals

**Files:**
- Create: `src/components/modals/BioModal.tsx`
- Modify: `src/constants.tsx`

**Step 1: Create BioModal component**

```tsx
// src/components/modals/BioModal.tsx
import React from 'react';
import { Modal } from '../Modal';

interface BioModalProps {
  isOpen: boolean;
  onClose: () => void;
  person: {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    linkedIn?: string;
  };
}

export function BioModal({ isOpen, onClose, person }: BioModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center mb-8">
        {/* Placeholder for headshot */}
        <div className="w-24 h-24 rounded-full bg-white/10 mx-auto mb-4" />
        <h2 className="font-serif text-2xl text-white">{person.name}</h2>
        <p className="font-mono text-xs uppercase tracking-wider text-white/40 mt-1">
          {person.title}
        </p>
        <p className="font-serif text-lg text-white/60 mt-2 italic">
          "{person.tagline}"
        </p>
      </div>

      <p className="text-white/70 mb-6">{person.bio}</p>

      {person.linkedIn && (
        <a
          href={person.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-300 hover:text-white transition-colors"
        >
          LinkedIn →
        </a>
      )}
    </Modal>
  );
}
```

**Step 2: Integrate into Slide 5 content with click handlers for each person**

**Step 3: Commit**

```bash
git add src/components/modals/BioModal.tsx src/constants.tsx
git commit -m "feat: add Bio modals for Slide 5 leadership"
```

---

### Task 10: Slide 6 - Add "Working With Us" Modal

**Files:**
- Create: `src/components/modals/EngagementModal.tsx`
- Modify: `src/constants.tsx`

**Step 1: Create EngagementModal component**

```tsx
// src/components/modals/EngagementModal.tsx
import React from 'react';
import { Modal } from '../Modal';

interface EngagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EngagementModal({ isOpen, onClose }: EngagementModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="What Working With Us Feels Like">
      <div className="space-y-6">
        <p>
          It starts with a conversation—no pitch, no pressure. We listen to understand
          how you work, what's working, and where the friction lives.
        </p>

        <p>
          From there, we move at your pace. Small experiments that prove value before
          bigger commitments. You stay in control; we stay in service.
        </p>

        <div className="border-l-2 border-white/20 pl-6 my-8">
          <p className="italic text-white/80">
            "It felt less like hiring a vendor and more like gaining a partner who
            actually understood what we were trying to build."
          </p>
        </div>

        <p>
          The relationship is ongoing, adaptive, human. When your needs change,
          we change with you.
        </p>

        <div className="mt-8 pt-6 border-t border-white/10">
          <a
            href="mailto:hello@commonthread.co"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-300 hover:text-white transition-colors"
          >
            Start a conversation →
          </a>
        </div>
      </div>
    </Modal>
  );
}
```

**Step 2: Integrate into Slide 6 content**

**Step 3: Commit**

```bash
git add src/components/modals/EngagementModal.tsx src/constants.tsx
git commit -m "feat: add Engagement modal for Slide 6"
```

---

## Phase 4: Menu Refinement

### Task 11: Redesign Menu Layout

**Files:**
- Identify and modify existing menu component

**Step 1: Locate existing menu component**

Search codebase for menu implementation.

**Step 2: Enhance layout for desktop**

More sophisticated layout, better spacing, cleaner typography.

**Step 3: Verify on multiple screen sizes**

**Step 4: Commit**

```bash
git commit -m "feat: redesign menu layout for better UX"
```

---

## Phase 5: Final Polish

### Task 12: Add Slide Navigation Indicators (Desktop)

**Files:**
- Modify: `src/components/layouts/StandardLayout.tsx`

**Step 1: Make progress indicator clickable on desktop**

Add click handlers to allow jumping to specific slides.

**Step 2: Commit**

```bash
git commit -m "feat: add clickable slide navigation on desktop"
```

---

### Task 13: Final Review and Cleanup

**Step 1: Run through complete user flow**

- Gateway → Enter
- Navigate all 6 slides
- Open each modal
- Test keyboard navigation
- Test menu

**Step 2: Fix any issues found**

**Step 3: Final commit**

```bash
git commit -m "polish: final review and cleanup"
```

---

## Execution Notes

- **No tests exist** - verify all changes via dev server
- **Preserve mobile experience** - changes target desktop primarily
- **Keep jack-scrolling logic intact** - don't break navigation
- **Modal state management** - consider lifting state to App.tsx or using context if complexity grows
