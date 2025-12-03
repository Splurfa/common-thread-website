# Common Thread Desktop Enhancement Design

**Date:** 2025-12-03
**Status:** Validated

## Overview

Enhance the desktop experience through a new gateway entry point, bolder typography/layout, and a modal system for optional depth - all while preserving the contained 6-slide framework and cinematic tone.

**Target Audience:** SMB owners/operators (non-tech) who aren't already leveraging frontier technology. Need to recognize "this is for me" without tech jargon.

---

## 1. Gateway Entry (New Component)

### Experience
- Full-screen physics-based interactive canvas loads first
- Pure atmosphere for 1-2 seconds
- Text fades in - single invitation line in large Playfair Display, generous negative space
- Physics visual remains interactive behind/alongside text
- One minimal CTA → slides up main site, gateway disappears entirely
- User enters contained 6-slide experience with no return to gateway

### Feeling
Encountering something premium and unfamiliar. An invitation to step into a different way of operating.

### Technical
- New `Gateway.tsx` component
- Renders before `StandardLayout`
- State controls visibility
- Physics canvas reuses/adapts existing `PhysicsCanvas.tsx`

---

## 2. Desktop Layout Enhancements

### Typography Scale Drama
- Headlines grow significantly bolder - architectural, commanding
- Sharp contrast between massive display type and refined body text
- More pronounced hierarchy, not just larger

### Hyperlinks for Color + Interaction
- Strategic words/phrases become interactive links (accent color)
- Links trigger modals or reveal context
- Add visual rhythm and signal depth

### Menu Redesign
- Existing functionality preserved
- More sophisticated layout for all devices

---

## 3. Modal System

Rich, interactive modals - not just text overlays. Can be multi-slide, visual, engaging.

### Slide 1: State of Mind
**Modal:** None
**Action:** Rework copy instead - flow the three statements into welcoming narrative prose. Add easy contact route.

### Slide 2: Vision
**Modal:** "What this looks like"
**Priority:** HIGH LEVERAGE
**Purpose:** Show the ideal end state in relatable, tangible terms. Make "world arranging itself" concrete for non-technical SMB owners.

### Slide 3: Mechanism
**Modal:** "What you don't have to do anymore"
**Priority:** HIGH LEVERAGE
**Purpose:** Role-specific, relatable. Rich format - could be multi-slide within modal, interactive, visual. Show scenarios/personas.
**Example:** "A marketer can focus on strategy, offload production. We create the graphics, the campaigns, the reports."

### Slide 4: Value
**Modal:** "The return"
**Purpose:** What "sanity as ROI" looks like. Time reclaimed, decisions simplified, focus restored.

### Slide 5: Leadership
**Modal:** Bio modals (per person)
**Purpose:** Headshot, bio, LinkedIn link. Simple, human, trust-building.

### Slide 6: Engagement
**Modal:** "What working with us feels like"
**Priority:** HIGH LEVERAGE
**Purpose:** Tangible experience of the relationship - the feeling, not just the process.

---

## 4. Navigation Optionality

Three layers of engagement:

1. **Linear flow** - Default jack-scroll path, works for everyone
2. **Jump navigation** - Slide indicator becomes tappable on desktop; menu provides direct slide links
3. **Modal depth** - "I want more" without leaving the slide

### What We're NOT Doing
- Adding separate pages
- Breaking the 6-slide container
- Complex navigation hierarchies

---

## 5. Content Adjustments

### Slide 1 Copy Rework
**Current (supporting content):**
> "We learn how you operate. We find the leverage points and the friction."
> "The distance closes from there."

**Issue:** Three declarative statements - competent but staccato, not friendly narrative prose for initial landing.

**Action:** Rewrite as welcoming narrative that flows naturally.

### Title Consideration
"Thought. Signal. Action." - acceptable but could be softened/made less abstract.

---

## 6. Integrated Slide Map

### SLIDE 1: STATE OF MIND

**Main Content:**
- Title: "Thought. Signal. Action."
- Body: "The distance between intent and execution is about to disappear."

**Supporting Content:**
- Subheading: "The Foundation"
- "We learn how you operate. We find the leverage points and the friction."
- "The distance closes from there."

**Intention:** Introduce the core promise AND immediately ground it in method. We study you, find friction, then close the gap. Promise + Process entry point.

**Action:** Rework copy for flow, add contact route.

---

### SLIDE 2: VISION

**Main Content:**
- Title: "Elevation."
- Body: "There is a version of your business where you direct, and the world arranges itself accordingly."

**Supporting Content:**
- Subheading: "The Shift"
- "In this version, your intention is the only requirement. Everything else falls into place."
- "The signal completes its journey."

**Intention:** Expand the aspirational vision. Intention becomes sufficient - the signal (your thought) actually reaches its destination. The full picture of what's possible.

**Modal:** "What this looks like" - HIGH LEVERAGE

---

### SLIDE 3: MECHANISM

**Main Content:**
- Title: "The Invisible Machine."
- Body: "Your best work, amplified."

**Supporting Content:**
- Subheading: "The Space Between"
- "We absorb the complexity. Your capacity grows without compromising your standards."
- "The path clears."

**Intention:** Explain the HOW without technical detail. We take on complexity, you gain capacity. Standards preserved. The machine's role (abstract but functional).

**Modal:** "What you don't have to do anymore" - HIGH LEVERAGE, rich format

---

### SLIDE 4: VALUE

**Main Content:**
- Title: "Return to the Essential."
- Body: "When the process is invisible, the connection becomes infinite."

**Supporting Content:**
- Subheading: "The Human Standard"
- "Work returns to what it should be. Thinking. Strategy. Connection."
- "ROI is not efficiency. It is sanity."

**Intention:** The human outcome. This isn't about doing more - it's about returning to meaningful work. ROI framed as wellbeing, not just output. The why it matters.

**Modal:** "The return"

---

### SLIDE 5: LEADERSHIP

**Main Content:**
- Title: "The Architects."
- Body: "We are stewards of connection, ensuring technology amplifies human intent."

**Supporting Content:**
- Derek Yellin, CEO: "Defining the human vector."
- Justyn Clark, CTO: "Building the invisible machine."

**Intention:** Put faces and philosophy to the work. Derek focuses on the human side, Justyn on the technical. Stewardship, not salesmanship. Trust through real people with distinct roles.

**Modal:** Bio modals per person (headshot, bio, LinkedIn)

---

### SLIDE 6: ENGAGEMENT

**Main Content:**
- Title: "Our Invitation."
- Body: "This way of working exists, and it starts with a conversation."

**Supporting Content:**
- Subheading: "The Path Forward"
- "You share the vision. We find the openings. Together, we see what's possible."
- Link: "Read our latest insights →"

**Intention:** The open door. Collaborative framing (together), low-pressure entry (conversation), plus content to explore. CTA without pressure.

**Modal:** "What working with us feels like" - HIGH LEVERAGE

---

## 7. What Stays the Same

- 6-slide structure
- Jack-scrolling navigation logic
- Visual/graphic side (right panel)
- Mobile experience ("nearly perfect")
- Extreme landscape layout (edge cases)
- Dark theme, Playfair + JetBrains Mono design system

---

## Next Steps

1. Set up isolated worktree for implementation
2. Create detailed implementation plan
3. Build Gateway component first
4. Implement modal system infrastructure
5. Desktop layout refinements
6. Content/copy adjustments
