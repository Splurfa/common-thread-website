# Physics Component Protocol

This document outlines the workflow for creating, testing, and promoting physics-based visual components for the Common Thread website.

## 1. Drafting Phase
**Location**: `components/visual-drafts/Drafts.tsx`

When creating a new visual effect:
1.  **Create a Draft Component**: Add a new export in `Drafts.tsx` (e.g., `VisualNewEffect`).
2.  **Use PhysicsCanvas**: Wrap your logic in the `<PhysicsCanvas />` component.
    *   `onInit`: Setup particles/state.
    *   `onUpdate`: Handle physics loop and rendering.
3.  **Implement Auto-Animation**:
    *   The graphic **MUST** be alive immediately on load.
    *   Use a "virtual mouse" or ambient motion (sine waves, rotation) when the user is not interacting.
    *   *Example*: If `mouse.x` is off-screen, move a target point in a circle to demonstrate the physics.
4.  **Mobile Optimization**:
    *   Ensure the container has `touch-action: none` (handled by `PhysicsCanvas`).
    *   Verify touch interactions work (tap/drag).

## 2. Testing Phase (Sandbox)
**URL**: `http://localhost:3002/?sandbox`

The Sandbox is the testing ground for all visuals.
*   **Grid View (Desktop)**: Overview of all drafts and published visuals.
*   **Slideshow View (Mobile)**: Focused view for testing touch interactions without scroll interference.
*   **Comparison**: Published visuals are marked in blue. Compare your draft against them to ensure quality consistency.

## 3. Promotion Phase
**Location**: `components/Visuals.tsx`

Once a draft is approved:
1.  **Move Code**: Copy the component logic to `components/Visuals.tsx`.
2.  **Rename**: Give it a semantic name (e.g., `VisualHero`, `VisualPhilosophy`).
3.  **Export**: Ensure it is exported for use in the main site.
4.  **Add to Sandbox**: Import the new "Published" component back into `Sandbox.tsx` and mark it as `isPublished: true` to close the loop.

## 4. Standards & Best Practices
*   **Performance**: Use `requestAnimationFrame` (handled by `PhysicsCanvas`). Avoid heavy computations in the render loop.
*   **Resizing**: Ensure the canvas handles window resizing gracefully (re-init or scale).
*   **Interaction**:
    *   **Mouse**: Hover for influence, Click for impulse.
    *   **Touch**: Drag for influence, Tap for impulse.
*   **Style**: Keep visuals monochromatic (white/transparent) or use the project's specific color palette. Avoid random RGB colors.

## 5. Mobile Strategy & Responsive Physics
To ensure a premium experience across devices, we use a **Responsive Configuration** approach rather than maintaining separate components.

### Responsive Configs
Detect the device capability or screen size (e.g., via `window.innerWidth` or a hook) and adjust physics parameters dynamically.
*   **Particle Count**: Reduce count on mobile for performance (e.g., 100 desktop -> 40 mobile).
*   **Interaction Radius**: Increase radius for touch targets (fingers are less precise than cursors).
*   **Forces**: Adjust attraction/repulsion strength to feel natural on smaller screens.

### Mobile Safety Rules
1.  **Touch Action**: All interactive canvases **MUST** have `touch-action: none` applied to their container. This prevents the browser from scrolling the page when the user drags inside the visual.
2.  **Aspect Ratio**: Test visuals in a square container. Mobile layouts often constrain visuals to `aspect-square` to leave room for content.
3.  **External Navigation**: Never place navigation controls (arrows, dots) *inside* the interactive area. They should be external to avoid conflict with physics gestures.
