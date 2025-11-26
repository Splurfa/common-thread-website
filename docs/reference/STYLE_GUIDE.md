# Common Thread - Design System & Style Guide

> [!IMPORTANT]
> This document serves as the single source of truth for the Common Thread visual language. All future development must adhere strictly to these standards to maintain the premium, cohesive aesthetic.

## 1. Core Philosophy
*   **Minimalist & Cinematic**: High contrast, dark mode only.
*   **Typography-Driven**: Large, elegant serif headings paired with technical monospace labels.
*   **Motion-First**: Interactions should feel fluid and physics-based, not static.
*   **Content-Focused**: The narrative takes center stage; UI elements recede until needed.

## 2. Colors
The palette is intentionally restrained to emphasize content and motion.

| Token | Value | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | `#0a0a0a` | `bg-[#0a0a0a]` | Main page background |
| **Panel BG** | `#0f0f0f` | `bg-[#0f0f0f]` | Visual/Graphic panels |
| **Text Primary** | `#ffffff` | `text-white` | Headings, Active States |
| **Text Secondary** | `rgba(255,255,255,0.8)` | `text-white/80` | Body Text |
| **Text Tertiary** | `rgba(255,255,255,0.8)` | `text-white/80` | Supporting Text |
| **Text Muted** | `rgba(255,255,255,0.6)` | `text-white/60` | Labels, Inactive States |
| **Text Subtle** | `rgba(255,255,255,0.3)` | `text-white/30` | Placeholders, Grid Lines |
| **Border** | `rgba(255,255,255,0.1)` | `border-white/10` | Dividers, Panel Borders |
| **Border Subtle** | `rgba(255,255,255,0.05)` | `border-white/5` | Grid Lines |

## 3. Typography
We use a distinct pairing of Serif (Narrative) and Monospace (Technical).

### Font Families
*   **Serif**: `font-serif` (e.g., Times Now, Playfair Display, or similar system serif)
*   **Monospace**: `font-mono` (e.g., JetBrains Mono, Roboto Mono, or system mono)

### Type Scale & Components

| Component | Font | Size (Desktop) | Size (Mobile) | Weight | Tracking | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SerifDisplay** | Serif | `text-5xl` | `text-4xl` | Normal | `tracking-tight` | `1.05` | Main Section Titles |
| **SubHeading** / **SupportingSubheading** | Serif | `text-xl` | `text-lg` | Normal | `tracking-tight` | `1.25` | Secondary Titles, Supporting Section Headings |
| **BodyText** | Serif | `text-2xl` | `text-xl` | Normal | Normal | `1.625` | Main Narrative Text |
| **SupportingText** | Serif | `text-xl` | `text-lg` | Normal | Normal | `1.625` | Detail/Overlay Content |
| **MonoLabel** | Mono | `text-sm` | `text-xs` | Normal | `tracking-[0.2em]` | Normal | Section Numbers, Labels |

**Heading Hierarchy Principle ("Big Brother / Little Brother"):**
Main headings (`SerifDisplay`) and supporting headings (`SubHeading`/`SupportingSubheading`) should maintain visual consistency through shared characteristics:
*   **Same font family**: Both use `font-serif`
*   **Same font weight**: Both use normal weight (never semibold or bold)
*   **Same tracking**: Both use `tracking-tight` for cohesive feel
*   **Scaled relationship**: Supporting headings are proportionally smaller versions of main headings, maintaining the same visual DNA

**Desktop Readability Considerations:**
Supporting text (`SupportingText`) uses a larger size on desktop (`text-xl`, 20px) compared to mobile (`text-lg`, 18px) to improve readability at typical desktop viewing distances. The increased size, combined with `text-white/80` opacity, ensures comfortable reading while maintaining the subtle, refined aesthetic.

### Special Case: Extreme Landscape
For short landscape viewports (`height <= 600px`), use specific clamping for balance:
*   **Title**: `clamp(2rem, 4vh, 2.75rem)`
*   **Body**: `clamp(1.125rem, 2.5vh, 1.4rem)` (Line Height: `1.35`)
*   **Support**: `clamp(0.875rem, 1.8vh, 1rem)` (Line Height: `1.35`)

## 4. Layout & Grid
The application uses two distinct layout modes based on viewport.

### Standard Layout (Vertical Scroll)
*   **Desktop**: Split screen. Left 50% (Narrative), Right 50% (Visuals).
*   **Mobile**: Stacked. Visuals (Top), Narrative (Bottom).
*   **Grid**: 12-column grid is implied but often simplified to 50/50 splits.

### Extreme Landscape (Tripod Layout)
Activates when `height <= 600px` AND `orientation: landscape` AND `width >= 480px`.
*   **Structure**: 50/50 Split.
*   **Left Panel**: Narrative content, centered vertically.
    *   **Padding**: `0 3rem` (Strict alignment with Logo/Label).
*   **Right Panel**: Visuals, full height.
*   **Tripod Anchors**:
    1.  **Logo**: Top-Left (`top: 2rem`, `left: 3rem`)
    2.  **Label**: Bottom-Left (`bottom: 2rem`, `left: 3rem`)
    3.  **Menu**: Top-Right (`top: 2rem`, `right: 3rem`)
*   **Navigation**: Bottom-Right of Left Panel (`bottom: 2rem`, `right: 2rem`).

## 5. Interactions & Motion
*   **Transitions**: `duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]` (Custom "out-expo" feel).
*   **Hover States**:
    *   **Opacity**: Fade from `30%` or `50%` to `100%`.
    *   **Scale**: Subtle scale up (`scale-105`) on interactive text links.
*   **Physics Protection**:
    *   Visual containers must have the `visual-panel-protected` class to allow touch/drag interactions without triggering navigation.

## 6. Components

### Navigation Arrows
*   **Size**: `w-8 h-8` (32px).
*   **Color**: `text-white/50` (Default) -> `text-white` (Hover).
*   **Disabled**: `opacity-20`.

### Menu Overlay
*   **Background**: `bg-black/90` with `backdrop-blur-xl`.
*   **Animation**: Fade in + Slide up (`translate-y-10` -> `0`).
*   **Layout**:
    *   **Portrait**: Vertical stack, centered.
    *   **Landscape**: 3-Column Grid (`grid-cols-3 gap-x-4 gap-y-6`).

### Dynamic Overlay (Extreme Landscape)
*   **Behavior**: Slides in from the right over the visual panel.
*   **Style**: Glassmorphism (`bg-[#0a0a0a]/85`, `backdrop-blur-20px`).
*   **Border**: 1px left border `border-white/10`.

## 7. Best Practices
1.  **Never use pure black (`#000`)**: Use `#0a0a0a` for a softer, premium feel.
2.  **Avoid system fonts**: Always use the `font-serif` and `font-mono` utilities.
3.  **Respect the grid**: Do not use arbitrary margins. Stick to the `rem` scale (1, 2, 3, 4, 6, 8, 12).
4.  **Mobile First**: Ensure touch targets are at least 44px (or have sufficient padding).
5.  **Performance**: Use `will-change-transform` sparingly for complex animations.
