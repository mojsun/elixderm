# Material Icons System

This directory contains reusable Material Design icons for the Elixderm project, optimized for Next.js.

## Usage

### Basic Import
```typescript
import { TrendingUpIcon, StarIcon } from '@/components/icons';

// In your component
<TrendingUpIcon size={24} className="text-green-500" />
```

### Available Props
All icons accept the following props:
- `size?: number` - Icon size in pixels (default varies by icon)
- `className?: string` - CSS classes for styling
- `color?: string` - Icon color (default: 'currentColor')

### Available Icons
- `TrendingUpIcon` - Upward trending arrow (replaces ↗ emoji)
- `StarIcon` - Five-pointed star
- `ArrowForwardIcon` - Right-pointing arrow
- `CheckCircleIcon` - Check mark in circle
- `EmailIcon` - Email/envelope icon
- `PhoneIcon` - Phone icon
- `LocationIcon` - Location pin icon
- `MenuIcon` - Hamburger menu icon
- `CloseIcon` - X/close icon

### Adding New Icons

1. Find the icon SVG path from [Google Material Icons](https://fonts.google.com/icons)
2. Add a new component to `MaterialIcons.tsx`:

```typescript
export const NewIcon: React.FC<IconProps> = ({ 
  size = 24, 
  className = '', 
  color = 'currentColor' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
  >
    <path d="YOUR_SVG_PATH_HERE"/>
  </svg>
);
```

3. Export it in the default object at the bottom
4. Add it to the `index.ts` export list

### Examples

```typescript
// Basic usage
<TrendingUpIcon />

// Custom size and color
<StarIcon size={32} color="#fbbf24" />

// With CSS classes
<EmailIcon className="text-blue-500 hover:text-blue-600" />

// Trend indicators (used in testimonials)
{trend === "up" && <TrendingUpIcon size={20} />}
{trend === "down" && <TrendingUpIcon size={20} className="rotate-180" />}
```

### Benefits of This System

- ✅ **Consistent rendering** across all devices and browsers
- ✅ **No emoji font dependencies** - icons work everywhere
- ✅ **Optimized for Next.js** - tree-shakable and performant
- ✅ **Type-safe** - TypeScript support with proper props
- ✅ **Customizable** - Easy to style with CSS classes
- ✅ **Scalable** - Easy to add new icons following the same pattern 