# Perspective Modal System Design

**Date:** 2025-12-03
**Status:** Ready for Implementation Planning

---

## Overview

A reusable 3-perspective interactive component that appears inside modals, allowing visitors to see content through the lens of their role: **The Owner**, **The Manager**, or **The Team Member**.

Designed with a **game designer principle**: introduce the mechanic once, let users learn it through interaction, then reuse the same pattern across the site. No UI chrome that breaks immersion — the pattern becomes familiar through repetition within the narrative.

---

## Target Audience Context

- Small businesses with their own language (not corporate jargon)
- Boutique firms, family-owned businesses, professional services
- Health practitioners, real estate agents, consultants
- Business-savvy but not necessarily technical
- Don't speak "IC/Manager/Director" — need universal role labels

---

## The Three Perspectives

| Role | Label | Who This Is |
|------|-------|-------------|
| 1 | The Owner | The decision-maker, founder, principal, "the boss" |
| 2 | The Manager | The coordinator, ops person, right hand |
| 3 | The Team Member | The executor, specialist, practitioner |

Each perspective shows:
- `[WHAT THEY RELATE TO]` — their pain point or situation
- `[WHAT THEY REALIZE]` — the value they receive

Content is placeholder for now — structure first, copy refinement later.

---

## Interaction Design

### Visual: Interactive Cascade Diagram

A visual showing the three roles connected in a flow/cascade:

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

**Behavior:**
- Default: All three visible, connections shown
- Click any node → that perspective expands with content
- Connections to adjacent roles stay visible (shows the cascade)
- Click another role → switches perspective
- Click same role or outside → collapses back to overview

**Graphics:** Placeholder wireframe first. Final physics-based visualization via external collaboration (Gemini or similar).

---

## Modal Integration

### Where It Appears

The PerspectiveSelector component is used inside these modals:

| Slide | Modal Title | Perspective Content Focus |
|-------|-------------|---------------------------|
| 3 | "What You Don't Have to Do Anymore" | What each role offloads |
| 2 | "What This Looks Like" | What each role's ideal state looks like |
| 4 | "The Return" | What each role gets back |
| 6 | "What Working With Us Feels Like" | Each role's experience of the relationship |

**First introduction:** Mechanism modal (Slide 3) — most natural fit for "who benefits how."

---

## Component Architecture

### New Component: `PerspectiveSelector.tsx`

```tsx
interface PerspectiveContent {
  owner: React.ReactNode;
  manager: React.ReactNode;
  teamMember: React.ReactNode;
}

interface PerspectiveSelectorProps {
  perspectives: PerspectiveContent;
}

export function PerspectiveSelector({ perspectives }: PerspectiveSelectorProps) {
  // Internal state for selected role
  // Renders cascade visual + expanded content
}
```

### Content Structure in `constants.tsx`

```tsx
export const mechanismPerspectives = {
  owner: (
    <div>
      {/* [OWNER: What they don't have to do anymore] */}
    </div>
  ),
  manager: (
    <div>
      {/* [MANAGER: What they don't have to do anymore] */}
    </div>
  ),
  teamMember: (
    <div>
      {/* [TEAM MEMBER: What they don't have to do anymore] */}
    </div>
  )
};

// Same pattern for visionPerspectives, valuePerspectives, engagementPerspectives
```

### Modal Usage

```tsx
<Modal isOpen={showMechanismModal} onClose={...} title="What You Don't Have to Do Anymore">
  <PerspectiveSelector perspectives={mechanismPerspectives} />
</Modal>
```

---

## Phased Rollout

### Phase 1: Foundation
1. Build `PerspectiveSelector` component with placeholder cascade graphic
2. Create content structure in constants.tsx with `[PLACEHOLDER]` blocks
3. Wire into Mechanism modal (Slide 3) only

### Phase 2: Validate
4. Test interaction pattern on live site
5. Iterate on visual design
6. Refine placeholder content based on what feels right

### Phase 3: Expand
7. Apply to Vision modal (Slide 2)
8. Apply to Value modal (Slide 4)
9. Apply to Engagement modal (Slide 6)

### Phase 4: Polish
10. External collaboration for final cascade graphic/animation
11. Final copy pass on all perspective content

---

## Slide 1 Copy Fix

Separate from the modal system, but addressed in this session:

**Problem:** Current supporting content has three declarative statements that feel performative.

**Original:**
```
"We learn how you operate. We find the leverage points and the friction."
"The distance closes from there."
```

**Issue:** Three continuous statements. Manifesto tone vs. conversation tone.

**Action:** Revert to original length. Add inline note:

```tsx
<!-- NOTE: Three declarative statements feel performative.
     Needs rewrite that flows more naturally while keeping same brevity.
     Consider: conversation tone vs. manifesto tone -->
```

**Contact link stays:** "Start a conversation →"

---

## External Collaboration Points

These items require external tools/collaboration:

1. **Cascade visualization** — Physics-based interactive graphic (Gemini recommended)
2. **Perspective content copy** — Final messaging for each role (may need copywriter input)
3. **Visual polish** — Animation, transitions, micro-interactions

---

## Design Principles (Reference)

- **Game designer principle:** Introduce mechanics through play, not explanation
- **Progressive disclosure:** Same pattern, recognized through repetition
- **No fourth-wall breaks:** No persistent UI chrome, stay in the narrative
- **Placeholder-first:** Structure enables iteration; don't block on perfect copy
- **Universal language:** Avoid corporate jargon; Owner/Manager/Team Member works across niches

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/PerspectiveSelector.tsx` | CREATE — new component |
| `src/constants.tsx` | MODIFY — add perspective content exports |
| `src/components/layouts/StandardLayout.tsx` | MODIFY — wire PerspectiveSelector into modals |
| `src/constants.tsx` (Slide 1) | MODIFY — revert copy, add note |

---

## Success Criteria

- [ ] User can click any role in the cascade and see that perspective
- [ ] Switching roles feels smooth, connections stay visible
- [ ] Pattern is recognizable when encountered in second modal
- [ ] Works on desktop and mobile
- [ ] Placeholder content clearly marked for future refinement
