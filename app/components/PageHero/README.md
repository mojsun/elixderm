# PageHero Component

A reusable hero section component for page headers with title and optional subtitle.

## Features

- ✅ **Responsive design** with mobile-optimized typography
- ✅ **Gradient background** using theme colors
- ✅ **Flexible content** with optional subtitle
- ✅ **Type-safe** TypeScript interfaces  
- ✅ **Server-side rendered** with CSS modules
- ✅ **Customizable** with optional className prop

## Usage

### Basic Usage
```tsx
import PageHero from '@/components/PageHero';

export default function Page() {
  return (
    <div>
      <PageHero 
        title="Your Page Title"
        subtitle="Optional descriptive subtitle text"
      />
      {/* Rest of page content */}
    </div>
  );
}
```

### Title Only (No Subtitle)
```tsx
<PageHero title="Sitemap" />
```

### With Custom Styling
```tsx
<PageHero 
  title="Custom Page"
  subtitle="With additional styling"
  className="custom-hero-modifications"
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ✅ | Main heading text |
| `subtitle` | `string` | ❌ | Optional descriptive text |
| `className` | `string` | ❌ | Additional CSS classes |

## Design System

### Colors
- **Background**: Primary to secondary gradient (`var(--color-primary)` → `var(--color-secondary)`)
- **Text**: White with 95% opacity for subtitle

### Typography
- **Title**: Heading font family, bold weight, responsive sizing
- **Subtitle**: Body font, normal weight, centered and constrained width

### Responsive Breakpoints
- **Desktop (1024px+)**: Full sizing (3.5rem title)
- **Tablet (768px-1024px)**: Medium sizing (2.75rem title) 
- **Mobile (768px-)**: Compact sizing (2.25rem title)

## Examples in Production

### About Page
```tsx
<PageHero 
  title="Where Science Meets Entrepreneurial Vision"
  subtitle="Founded by scientists who understand both complex formulation and business success. We're not just manufacturers—we're partners in turning beauty visions into reality."
/>
```

### Contact Page
```tsx
<PageHero 
  title="Get Your Custom Beauty Manufacturing Quote"
  subtitle="Ready to launch your beauty brand? Fill out our form below and our manufacturing experts will help you understand your options for private label products, formulations, and packaging needs."
/>
```

### Sitemap Page
```tsx
<PageHero 
  title="Sitemap"
  subtitle="Navigate through all pages on our website"
/>
```

## Styling

The component uses CSS modules for scoped styling. Key styles include:

```css
/* Gradient background with theme colors */
.heroSection {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
}

/* Responsive typography */
.heroTitle {
  font-size: 3.5rem; /* Desktop */
  font-size: 2.75rem; /* Tablet */
  font-size: 2.25rem; /* Mobile */
}
```

## Best Practices

### Content Guidelines
- **Title**: Keep concise but descriptive (5-8 words ideal)
- **Subtitle**: Provide context and value proposition (1-2 sentences)
- **Hierarchy**: Title should be the main H1 of the page

### Accessibility
- Uses semantic `<h1>` for title (proper heading hierarchy)
- High contrast white text on colored background
- Responsive text sizing for readability

### Performance
- **Server-side rendered**: No client-side JavaScript required
- **CSS modules**: Scoped styles prevent conflicts
- **Optimized loading**: Only loads styles when component is used 