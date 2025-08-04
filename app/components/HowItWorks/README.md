# HowItWorks Component

A dynamic, interactive component that displays the company's 5-step process using scroll-based navigation and smooth transitions.

## Features

### 🎯 Interactive Navigation
- **Scroll-based progression**: Navigate through steps using mouse wheel or keyboard arrows
- **Auto-scroll detection**: Activates when section comes into view
- **Smooth transitions**: Animated step changes with fade effects
- **Progress indication**: Visual progress bar shows current step

### 📱 Responsive Design
- **Mobile-first approach**: Optimized layouts for all screen sizes
- **Adaptive typography**: Font sizes scale appropriately across devices
- **Touch-friendly**: Keyboard navigation support for accessibility
- **iPhone Safari optimized**: Special fixes for Safari mobile rendering

### 🎨 Visual Elements
- **Video/Image media**: Supports both video and image content for each step
- **Gradient backgrounds**: Beautiful gradient text and backgrounds
- **Hover effects**: Interactive hover states on images
- **Loading states**: Proper error handling for media content

## Usage

```tsx
import HowItWorks from '@/components/HowItWorks';

export default function Page() {
  return (
    <div>
      <HowItWorks />
    </div>
  );
}
```

## Step Data Structure

Each step follows this structure:

```typescript
{
  number: string;    // Step number (e.g., "01")
  title: string;     // Step title
  description: string; // Step description
  media: {
    type: "video" | "image";
    src: string;     // Media source URL
    alt?: string;    // Alt text for images
  }
}
```

## Keyboard Navigation

- **Arrow Down/Right**: Next step
- **Arrow Up/Left**: Previous step
- **Scroll wheel**: Navigate through steps when section is active

## Browser Support

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ iPhone Safari (optimized)
- ✅ Touch devices
- ✅ Reduced motion support

## Performance

- **Lazy loading**: Images load only when needed
- **Optimized transitions**: Hardware-accelerated CSS animations
- **Memory efficient**: Proper cleanup of event listeners
- **SSR compatible**: Works with Next.js server-side rendering

## Accessibility

- **ARIA labels**: Proper semantic markup
- **Keyboard navigation**: Full keyboard support
- **Screen reader friendly**: Descriptive text and structure
- **Reduced motion**: Respects user motion preferences 