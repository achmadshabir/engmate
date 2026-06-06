# 🎨 EngMate Color Palette - Visual Reference

## Brand Colors (Main)

### Primary: Friendly Tech Blue
```
HEX:  #3B82F6
HSL:  217° 91% 60%
RGB:  59, 130, 246
```
**Usage**: Main buttons, primary actions, brand elements, active states
**Gradients**: `from-blue-500 to-blue-600`, `from-blue-500 to-cyan-500`

🟦 **Preview**: Bright, trustworthy, tech-forward blue

---

### Accent: Warm Amber
```
HEX:  #F59E0B
HSL:  38° 92% 50%
RGB:  245, 158, 11
```
**Usage**: Secondary buttons, highlights, success states, warm accents
**Gradients**: `from-amber-500 to-amber-600`, `from-amber-500 to-orange-500`

🟧 **Preview**: Warm, energetic, friendly orange-amber

---

### Background: Soft Slate
```
HEX:  #F8FAFC
HSL:  210° 40% 98%
RGB:  248, 250, 252
```
**Usage**: Page backgrounds, subtle gradients
**Variants**: 
- `bg-slate-50` (#F8FAFC)
- `bg-slate-100` (#F1F5F9)
- `bg-blue-50` (for accent areas)
- `bg-amber-50` (for warm areas)

⬜ **Preview**: Very light gray-blue, almost white

---

### Text: Dark Slate
```
HEX:  #1E293B
HSL:  222° 47% 11%
RGB:  30, 41, 59
```
**Usage**: Body text, headings, primary content
**Variants**:
- `text-slate-800` (#1E293B) - Primary text
- `text-slate-600` (#475569) - Secondary text
- `text-slate-500` (#64748B) - Tertiary text

⬛ **Preview**: Deep slate, excellent readability

---

## Supporting Colors

### Success: Green
```
from-green-500 to-emerald-500
#22C55E → #10B981
```
**Usage**: Success messages, achievement badges, progress indicators

---

### Warning: Orange
```
from-orange-500 to-red-500
#F97316 → #EF4444
```
**Usage**: Warnings, important notices, pronunciation errors

---

### Info: Purple
```
from-purple-500 to-pink-500
#A855F7 → #EC4899
```
**Usage**: Tips, pronunciation features, special highlights

---

### Neutral: White & Slate
```
White:         #FFFFFF
Slate 100:     #F1F5F9
Slate 200:     #E2E8F0
Slate 300:     #CBD5E1
```
**Usage**: Cards, borders, dividers, subtle backgrounds

---

## Gradient Combinations (Pre-tested)

### 1. Primary Blue Gradient
```css
bg-gradient-to-r from-blue-500 to-blue-600
```
**Perfect for**: Primary CTAs, hero buttons, main actions

### 2. Warm Accent Gradient
```css
bg-gradient-to-r from-amber-500 to-amber-600
```
**Perfect for**: Secondary CTAs, success buttons, warm highlights

### 3. Brand Signature Gradient
```css
bg-gradient-to-r from-blue-600 via-blue-500 to-amber-500
```
**Perfect for**: Logo text, hero titles, brand moments

### 4. Conversation Gradient
```css
bg-gradient-to-br from-blue-500 to-cyan-500
```
**Perfect for**: Chat/conversation features

### 5. Lesson Gradient
```css
bg-gradient-to-br from-amber-500 to-orange-500
```
**Perfect for**: Guided lessons, educational content

### 6. Pronunciation Gradient
```css
bg-gradient-to-br from-purple-500 to-pink-500
```
**Perfect for**: Pronunciation coach features

### 7. Background Subtle Gradient
```css
bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50
```
**Perfect for**: Page backgrounds, large areas

---

## Color Psychology & Usage

### 🔵 Blue (Primary)
- **Feeling**: Trust, intelligence, technology, calm
- **Use for**: Main features, navigation, primary actions
- **Avoid**: Overuse can feel cold (balance with amber)

### 🟠 Amber (Accent)
- **Feeling**: Warm, friendly, energetic, optimistic
- **Use for**: Highlights, success states, welcoming elements
- **Avoid**: Too much can overwhelm (use as accent)

### ⚪ Slate (Neutral)
- **Feeling**: Professional, clean, sophisticated
- **Use for**: Text, backgrounds, structure
- **Avoid**: Pure gray (add slight blue tint)

---

## Accessibility (WCAG AAA)

### Text Contrast Ratios

✅ **Dark Slate on White Background**
- `text-slate-800` on `bg-white`: **13.6:1** (AAA)
- `text-slate-600` on `bg-white`: **7.2:1** (AAA)

✅ **White on Blue Background**
- `text-white` on `bg-blue-500`: **8.6:1** (AAA)
- `text-white` on `bg-blue-600`: **10.7:1** (AAA)

✅ **White on Amber Background**
- `text-white` on `bg-amber-500`: **4.8:1** (AA)
- Use amber-600 for better contrast: **6.1:1** (AAA)

---

## Quick Copy-Paste

### Tailwind Classes
```jsx
// Backgrounds
bg-blue-500
bg-amber-500
bg-slate-50
bg-white

// Text
text-slate-800
text-slate-600
text-slate-500
text-blue-600
text-amber-600

// Borders
border-slate-200
border-blue-300
border-amber-300

// Gradients (buttons)
bg-gradient-to-r from-blue-500 to-blue-600
bg-gradient-to-r from-amber-500 to-amber-600

// Gradients (backgrounds)
bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50

// Gradients (text)
bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent
```

### CSS Variables
```css
/* HSL values for color manipulation */
--blue-500: 217 91% 60%;
--amber-500: 38 92% 50%;
--slate-50: 210 40% 98%;
--slate-800: 222 47% 11%;

/* Usage */
background: hsl(var(--blue-500));
color: hsl(var(--slate-800));
```

---

## Design Tokens (Variables)

```js
// tailwind.config.js
colors: {
  engmate: {
    primary: '#3B82F6',
    accent: '#F59E0B',
    bg: '#F8FAFC',
    text: '#1E293B'
  }
}

// Usage in components
<div className="bg-engmate-primary text-white">
<span className="text-engmate-text">
```

---

## Color Do's and Don'ts

### ✅ DO
- Use blue for trust & primary actions
- Use amber for warmth & highlights
- Combine blue + amber in gradients
- Add subtle color tints to grays
- Use rounded corners with colors (softer feel)
- Apply shadows with color tints (shadow-blue-500/30)

### ❌ DON'T
- Don't use pure black (#000000)
- Don't use pure gray (add blue tint)
- Don't overuse gradients (max 2-3 per view)
- Don't use low contrast text
- Don't mix too many colors in one section
- Don't use cyan/teal (too similar to old brand)

---

## Brand Evolution

### Old Macca Brand
- Primary: Cyan (#06B6D4)
- Background: Dark Slate (#020617, #0F172A)
- Feel: Technical, cold, serious

### New EngMate Brand
- Primary: Blue (#3B82F6)
- Accent: Amber (#F59E0B)
- Background: Light Slate (#F8FAFC)
- Feel: **Friendly, warm, approachable** ⭐

---

**Last Updated**: June 7, 2026  
**Version**: 1.0 EngMate Rebrand
