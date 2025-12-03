# Cascade Graphic Specification

**Task:** Replace the placeholder cascade visualization in `PerspectiveSelector.tsx` with a polished, physics-based or animated interactive graphic.

**Branch:** `feature/cascade-graphic`
**Target Branch for PR:** `feature/desktop-enhancement`

---

## What You're Building

An interactive 3-node cascade diagram representing three business roles:

```
    ┌─────────────┐
    │  The Owner  │
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │ The Manager │
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │ Team Member │
    └─────────────┘
```

---

## Visual Requirements

### Nodes
- 3 clickable nodes arranged vertically
- Labels: "The Owner", "The Manager", "The Team Member"
- Typography: Playfair Display for labels (font-serif in Tailwind)

### Connections
- Visible lines/connections between nodes
- Connections should remain visible when a node is selected
- Consider subtle animation (gentle pulsing, flowing particles, etc.)

### Interaction States
1. **Default/Overview:** All 3 nodes visible, connections shown
2. **Selected:** One node is highlighted/expanded, connections to adjacent nodes stay visible
3. **Hover:** Subtle emphasis before selection

### Animation
- Smooth transitions between states
- Consider physics-based motion (springs, easing)
- Optional: ambient animation when idle (subtle glow, particle flow)

---

## Style Constraints

### Colors (Dark Theme)
- Background: `#0a0a0a` or transparent (inherits from modal)
- Primary text: `white` or `white/90`
- Secondary text: `white/50` to `white/70`
- Accent/Selected: `white/40` border becoming `white` when active
- Connections: `white/20` to `white/30`

### Typography
- Node labels: `font-serif` (Playfair Display)
- Small/mono text: `font-mono` with `tracking-widest uppercase`

### Tailwind Classes Reference
```css
/* Already in the codebase */
font-serif          /* Playfair Display */
font-mono           /* JetBrains Mono */
text-white/90       /* Primary text */
text-white/50       /* Muted text */
bg-white/10         /* Subtle backgrounds */
border-white/20     /* Default borders */
transition-all duration-300
```

---

## File Location

Replace the placeholder in `src/components/PerspectiveSelector.tsx`:

```tsx
{/* GEMINI: Replace this placeholder with cascade visualization */}
<div className="cascade-placeholder">
  ...current placeholder code...
</div>
```

---

## What "Done" Looks Like

- [ ] Nodes are visually distinct and clickable
- [ ] Connections between nodes are visible
- [ ] Clicking a node highlights it and shows selection state
- [ ] Connections remain visible when a node is selected
- [ ] Animations are smooth (no janky transitions)
- [ ] Works on both desktop and mobile
- [ ] Dark theme styling matches the rest of the site
- [ ] No console errors or performance issues

---

## PR Instructions

When you're ready to submit:

1. **Branch:** Work on `feature/cascade-graphic`
2. **Target:** Create PR to merge into `feature/desktop-enhancement`
3. **Title:** `feat(component): cascade visualization for PerspectiveSelector`
4. **Description:**
   - Summary of the visualization approach
   - Any libraries or dependencies added (if any)
   - Screenshots/GIFs showing the interaction
   - Mobile responsiveness notes

---

## Context

This cascade appears inside modal overlays throughout the site:
- Mechanism modal: "What You Don't Have to Do Anymore"
- Vision modal: "What This Looks Like"
- Value modal: "The Return"
- Engagement modal: "What Working With Us Feels Like"

The interaction pattern follows the "game designer principle": introduce the mechanic once through play, let users learn it through interaction, then reuse across the site.

---

## Questions?

Reach out via the PR or comments. The current placeholder provides the basic structure you need to replace.
