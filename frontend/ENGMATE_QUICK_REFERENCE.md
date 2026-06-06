# ⚡ EngMate Quick Reference - Developer Cheat Sheet

## 🎨 BRAND COLORS (Copy-Paste Ready)

```jsx
// Tailwind Classes
className="bg-blue-500"           // Primary Blue
className="bg-amber-500"          // Accent Amber
className="bg-slate-50"           // Background
className="text-slate-800"        // Text

// Gradients
className="bg-gradient-to-r from-blue-500 to-blue-600"
className="bg-gradient-to-r from-amber-500 to-orange-500"
className="bg-gradient-to-br from-blue-600 via-blue-500 to-amber-500"

// HEX Values
#3B82F6  // Primary Blue
#F59E0B  // Accent Amber
#F8FAFC  // Background Slate
#1E293B  // Text Dark Slate
```

## 📝 TYPOGRAPHY

```jsx
// Headings (Poppins)
<h1 className="font-heading text-6xl font-bold">EngMate</h1>
<h2 className="font-heading text-4xl font-semibold">Title</h2>
<h3 className="font-heading text-2xl font-medium">Subtitle</h3>

// Body Text (Inter)
<p className="font-body text-base">Regular paragraph</p>
<p className="font-body text-sm text-slate-600">Small text</p>
```

## 🎯 COMMON COMPONENTS

### Button Styles
```jsx
// Primary CTA
<Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-7 rounded-2xl shadow-lg shadow-blue-500/30">
  Start Learning
</Button>

// Secondary
<Button variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-2xl">
  Learn More
</Button>
```

### Card Styles
```jsx
// Feature Card
<Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:border-blue-300 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
  {/* content */}
</Card>

// Gradient Card
<Card className="p-8 bg-gradient-to-br from-blue-500 to-blue-600 border-0 rounded-2xl text-white">
  {/* content */}
</Card>
```

### Icon Container
```jsx
<div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
  <MessageCircle className="h-7 w-7 text-white" />
</div>
```

## 🔧 CONTEXT USAGE

```jsx
import { useEngMate } from '@/context/EngMateContext';

function MyComponent() {
  const { 
    userProfile,
    updateUserProfile,
    sendConversationTurn,
    analyzePronunciation,
    getLessons,
    getLesson 
  } = useEngMate();
  
  // Use methods...
}
```

## 🎭 LAYOUT PATTERNS

### Page Container
```jsx
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-amber-50/30">
  <div className="container mx-auto px-4 py-16 max-w-7xl">
    {/* content */}
  </div>
</div>
```

### Bento Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {items.map(item => (
    <Card key={item.id}>...</Card>
  ))}
</div>
```

### Section Header
```jsx
<div className="text-center mb-16">
  <h1 className="font-heading text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-amber-500 bg-clip-text text-transparent">
    EngMate
  </h1>
  <p className="font-body text-2xl text-slate-600 mb-4">
    Learn English naturally with AI
  </p>
</div>
```

## 🚀 COMMON TAILWIND PATTERNS

```jsx
// Rounded Corners (Friendly)
rounded-xl     // 12px - Cards
rounded-2xl    // 16px - Buttons, Large Cards
rounded-3xl    // 24px - Hero sections

// Shadows with Color Tint
shadow-lg shadow-blue-500/30
shadow-xl shadow-amber-500/20

// Backdrop Effects (Glass)
bg-white/80 backdrop-blur-xl

// Hover Transitions
transition-all duration-300 hover:scale-105
hover:shadow-2xl

// Gradient Text
bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent
```

## 📱 RESPONSIVE BREAKPOINTS

```jsx
// Mobile First
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

// Common Patterns
className="text-4xl md:text-6xl lg:text-7xl"  // Font sizes
className="px-4 md:px-8 lg:px-16"             // Padding
className="gap-4 md:gap-6 lg:gap-8"           // Grid gaps
```

## 🎨 COLOR COMBINATIONS (Tested)

```jsx
// Blue Primary + White Text
bg-gradient-to-r from-blue-500 to-blue-600 text-white

// Amber Accent + White Text
bg-gradient-to-r from-amber-500 to-amber-600 text-white

// Light Background + Dark Text
bg-slate-50 text-slate-800

// Card on Light Background
bg-white/80 border-slate-200 text-slate-700

// Active State (Blue)
bg-blue-500/20 text-blue-600 border-blue-500/50
```

## 🔍 ICONS (Lucide React)

```jsx
import { 
  MessageCircle,  // Chat/Conversation
  BookOpen,       // Lessons
  Mic2,           // Pronunciation/Voice
  Target,         // Goals/Progress
  Sparkles,       // AI/Magic
  TrendingUp,     // Growth/Stats
  User,           // Profile
  Home            // Dashboard
} from 'lucide-react';

<MessageCircle className="h-6 w-6 text-blue-500" />
```

## 🐛 COMMON FIXES

```bash
# Cache issues
rm -rf node_modules/.vite
npm run dev

# Import errors
# Always use @ alias for src:
import Component from '@/components/Component';

# Font not loading
# Check Google Fonts CDN in index.html
# Fallback: system fonts akan auto-load

# Colors not applying
# Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

## 📦 PACKAGE.JSON SCRIPTS

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🔗 USEFUL LINKS

- Tailwind Docs: https://tailwindcss.com/docs
- Shadcn Components: https://ui.shadcn.com
- Lucide Icons: https://lucide.dev
- Color Palette: https://coolors.co/3b82f6-f59e0b-f8fafc-1e293b

---

**Last Updated**: 2026-06-07
**Version**: 1.0 (EngMate Rebrand)
