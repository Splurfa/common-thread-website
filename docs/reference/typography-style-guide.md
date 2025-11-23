# Typography Style Guide - Common Thread Website

## North Star Components (Main Page)

### SupportingSubheading
- **Purpose**: Section headings within supporting content
- **Component**: `SupportingSubheading` from Typography.tsx
- **Tailwind Classes**: `font-serif text-[22px] md:text-[22px] text-white leading-tight mb-3 font-semibold tracking-tight`
- **Computed CSS**:
  - Font: Serif
  - Size: 22px (all screens)
  - Weight: 600 (semibold)
  - Color: #ffffff (100% opacity) ⭐
  - Letter spacing: -0.025em
  - Line height: 1.25
  - Margin: 12px bottom

### SupportingText / Body Paragraphs
- **Purpose**: Body content within supporting sections
- **Component**: `SupportingText` from Typography.tsx
- **Tailwind Classes**: `font-serif text-lg md:text-lg text-white/70 leading-relaxed max-w-xl`
- **Computed CSS**:
  - Font: Serif
  - Size: 18px
  - Weight: 400 (normal)
  - Color: rgba(255, 255, 255, 0.7) - 70% opacity ⭐
  - Line height: 1.625
  - Max width: 576px

## Blog Component Mapping

### Blog h3 Headings → SupportingSubheading
**MUST MATCH**: 100% white opacity for headings

### Blog Paragraphs → SupportingText
**MUST MATCH**: 70% white opacity for body text

## Color Opacity Values

| Element | Main Page | Blog Page (Target) | Purpose |
|---------|-----------|-------------------|---------|
| Headings | `text-white` (100%) | `text-white` (100%) | Maximum prominence |
| Body Text | `text-white/70` (70%) | `text-white/70` (70%) | Readable but secondary |
| Labels | `text-white/60` (60%) | `text-white/60` (60%) | Tertiary information |

## Theme Variations

### Dark Mode (Default)
- Headings: Pure white (#ffffff)
- Body: White at 70% opacity
- Background: #0a0a0a

### Light Mode
- Headings: Near black (#1a1a1a at 80-100%)
- Body: Black at 70% opacity
- Background: #f4f4f5

## Usage Guidelines

1. **Always use 100% opacity for headings** - They should be the brightest elements
2. **Use 70% opacity for body text** - Provides hierarchy without overwhelming
3. **Never let headings inherit dimmed colors from parent containers**
4. **Match font sizes exactly across components** - Consistency is key

## Implementation Examples

### Correct Heading Implementation
```tsx
<h3 className="font-serif text-[22px] text-white font-semibold">
  Section Heading
</h3>
```

### Correct Body Text Implementation
```tsx
<p className="font-serif text-lg text-white/70 leading-relaxed">
  Body paragraph content with proper opacity.
</p>
```

### Common Mistakes to Avoid

❌ **Wrong**: Applying opacity to parent container affecting headings
```tsx
<div className="text-white/70">
  <h3>Heading</h3> {/* Inherits 70% opacity - TOO DIM */}
</div>
```

✅ **Correct**: Apply opacity directly to elements
```tsx
<div>
  <h3 className="text-white">Heading</h3> {/* 100% opacity */}
  <p className="text-white/70">Body</p> {/* 70% opacity */}
</div>
```

## Component Reference

### Available Typography Components

All components located in `src/components/ui/Typography.tsx`:

- `SupportingSubheading` - Section headings (22px, semibold, 100% white)
- `SupportingText` - Body paragraphs (18px, normal, 70% white)
- Additional components available in Typography.tsx for other use cases

## Accessibility Considerations

- **Contrast Ratios**: Ensure 70% white on dark background meets WCAG AA standards
- **Font Scaling**: All sizes use px but should scale with user preferences
- **Readability**: Line height of 1.625 optimized for comfortable reading
- **Hierarchy**: Opacity creates clear visual hierarchy without compromising legibility
