# FeatureSection Component

A flexible and reusable feature section component with title, description, and feature cards. Supports both simple static layouts and animated scrolling displays.

## Features

- ✅ **Flexible content** with configurable title, description, and features
- ✅ **Two display modes**: Simple grid and animated scrolling
- ✅ **Responsive design** optimized for all screen sizes
- ✅ **Type-safe** TypeScript interfaces
- ✅ **Server-side rendered** with CSS modules
- ✅ **Mobile-friendly** with touch-optimized layouts
- ✅ **Not full width** - respects container constraints
- ✅ **Reusable** across different page contexts

## Usage

### Basic Usage (Simple Grid)
```tsx
import FeatureSection from '@/components/FeatureSection';

const features = [
  {
    icon: <YourIconComponent />,
    title: "Feature Title",
    description: "Feature description text"
  },
  // ... more features
];

export default function Page() {
  return (
    <FeatureSection
      title="Section Title"
      description="Section description explaining the features"
      features={features}
    />
  );
}
```

### Advanced Usage (With Animation)
```tsx
<FeatureSection
  title="Why We're Different"
  description="Detailed explanation of your unique value proposition"
  features={features}
  enableAnimation={true}
  animationHeight="600px"
  maxInitialCards={4}
  className="custom-styles"
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | ✅ | - | Main section heading |
| `description` | `string` | ✅ | - | Section description text |
| `features` | `Feature[]` | ✅ | - | Array of feature objects |
| `className` | `string` | ❌ | `""` | Additional CSS classes |
| `enableAnimation` | `boolean` | ❌ | `false` | Enable scrolling animation |
| `animationHeight` | `string` | ❌ | `"600px"` | Height of animated container |
| `maxInitialCards` | `number` | ❌ | `4` | Cards visible before animation |

### Feature Interface
```tsx
interface Feature {
  icon: React.ReactNode;    // Icon component or element
  title: string;           // Feature title
  description: string;     // Feature description
}
```

## Examples in Production

### WhyElixderm (Home Page - With Animation)
```tsx
const features = [
  {
    icon: <span className="material-symbols-outlined">inventory</span>,
    title: "MOQs starting at 25 units",
    description: "Perfect for testing markets and scaling gradually"
  },
  // ... 5 more features
];

<FeatureSection
  title="Why Elixderm is Different"
  description="While other manufacturers focus on volume and standardization, we've built our entire operation around flexibility, transparency, and genuine partnership."
  features={features}
  enableAnimation={true}
  animationHeight="600px"
  maxInitialCards={4}
/>
```

### OurStory (About Page - Simple Grid)
```tsx
const storyFeatures = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      </svg>
    ),
    title: "Science-First Foundation",
    description: "PhD scientists bringing clinical precision to beauty"
  },
  // ... 3 more features
];

<FeatureSection
  title="Our Story"
  description="Elixderm was born from a simple observation: most beauty manufacturers operate like factories, prioritizing volume over vision."
  features={storyFeatures}
  enableAnimation={false}
  className="our-story-section"
/>
```

## Design System

### Layout
- **Container**: Max-width 1400px (not full width)
- **Grid**: 1fr 1.5fr on desktop, single column on mobile
- **Cards**: 2-column grid on desktop, single column on mobile

### Colors
- **Background**: Light gradient (`#ffffff` → `#f8fafc`)
- **Cards**: Semi-transparent white with green accent border
- **Icons**: Green gradient background (`#10b981` → `#34d399`)
- **Text**: Dark gray titles, medium gray descriptions

### Typography
- **Title**: Responsive clamp sizing (2.5rem - 3.5rem)
- **Description**: 1.25rem with good line height
- **Card titles**: 1.25rem bold headings
- **Card descriptions**: 1rem body text

## Animation Mode

When `enableAnimation={true}`:

- **Initial state**: Shows first `maxInitialCards` (default 4)
- **Expanded state**: Reveals additional cards with smooth transform
- **Toggle button**: "Discover What Makes Us Different" / "See Our Core Features"
- **Mobile behavior**: Animation disabled on very small screens (480px-)

## Responsive Behavior

### Desktop (1024px+)
- Two-column layout (title/description + features)
- 2×2 feature card grid
- Sticky title section (with animation enabled)

### Tablet (768px-1024px)
- Maintains two-column layout
- Reduced spacing and padding
- Medium text sizing

### Mobile (768px-)
- Single column layout
- Single column feature cards
- Non-sticky title section
- Compact spacing

### Small Mobile (480px-)
- Further reduced padding
- Animation disabled (shows all cards)
- Optimized touch interactions

## Accessibility

- **Semantic HTML**: Proper heading hierarchy (`<h2>`, `<h3>`)
- **Focus management**: Keyboard accessible toggle button
- **Screen readers**: Descriptive button labels
- **Motion**: Respects `prefers-reduced-motion`

## Performance

- **Server-side rendered**: No client-side JavaScript required (except animation)
- **CSS modules**: Scoped styles prevent conflicts
- **Optimized animations**: Hardware-accelerated transforms
- **Lazy content**: Animation only loads when needed

## Best Practices

### Content Guidelines
- **Title**: Clear, concise section heading (3-6 words)
- **Description**: 1-2 sentences explaining the value proposition
- **Features**: 4-6 features work best for visual balance
- **Feature titles**: Keep to 3-5 words when possible
- **Feature descriptions**: 1 sentence, focus on benefits

### Icon Guidelines
- **Size**: 32px recommended for consistency
- **Style**: Use consistent icon family (Material Icons, SVG, etc.)
- **Color**: Let component handle coloring (icons will be white)
- **Format**: React components or SVG elements work best

### Usage Patterns
```tsx
// ✅ Good: Clear, descriptive content
<FeatureSection
  title="Our Advantages"
  description="What sets us apart in the industry"
  features={wellStructuredFeatures}
/>

// ❌ Avoid: Vague or too long content
<FeatureSection
  title="Things"
  description="Here are some really long paragraphs that explain too much detail..."
  features={tooManyFeatures} // 10+ features
/>
``` 