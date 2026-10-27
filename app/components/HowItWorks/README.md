# HowItWorks Component

Displays the company's 5-step process. The steps panel sticks below the navbar while the page scrolls through the section, and the step shown follows the scroll position. The page itself always scrolls normally.

## Features

### 🎯 Interactive Navigation
- **Scroll-driven steps**: Any normal scrolling moves through the steps; nothing intercepts the wheel, touch or keyboard
- **Smooth transitions**: Animated step changes with fade effects
- **Progress indication**: Visual progress bar shows current step

### 📱 Responsive Design
- **Mobile-first approach**: Optimized layouts for all screen sizes
- **Adaptive typography**: Font sizes scale appropriately across devices
- **Touch-friendly**: Native touch scrolling, with no gestures to learn
- **Mobile browsers**: The panel is sized with `svh`, so it fits while the browser toolbars show

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
    poster?: string; // Still frame shown before a video plays
    alt?: string;    // Alt text for images
  }
}
```

## Navigation

The mouse wheel, trackpad, touch, arrow and Page keys, and the scrollbar all move through the steps, because they scroll the page.

## Browser Support

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ iPhone Safari (optimized)
- ✅ Touch devices
- ✅ Reduced motion support

## Performance

- **Lazy loading**: Images load only when needed, and a step's video plays only while that step shows
- **Optimized transitions**: Hardware-accelerated CSS animations
- **Memory efficient**: Proper cleanup of event listeners
- **SSR compatible**: Works with Next.js server-side rendering

## Accessibility

- **ARIA labels**: Proper semantic markup
- **Keyboard navigation**: Full keyboard support
- **Screen reader friendly**: Descriptive text and structure
- **Reduced motion**: Respects user motion preferences 