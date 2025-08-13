# ServicesMegaMenu Component

A full-width dropdown menu component that displays services in a grid layout with hover effects.

## Features

- **Full-width display**: Spans the entire viewport width
- **Grid layout**: 4 columns on desktop, 2 on tablet, 1 on mobile
- **Hover effects**: Interactive animations and color changes
- **Theme integration**: Uses CSS variables for consistent theming
- **Responsive design**: Adapts to different screen sizes
- **Accessibility**: Keyboard navigation support

## Props

```typescript
interface ServicesMegaMenuProps {
  services: Service[]  // Array of service objects from Sanity
  isOpen: boolean     // Controls menu visibility
  onClose: () => void // Callback when menu should close
}
```

## Service Object Structure

Each service should have:
- `_id`: Unique identifier
- `name`: Service name
- `slug`: URL slug for the service
- `menuName`: Optional custom display name for menu
- `menuDescription`: Short description for menu display

## Usage

```tsx
import ServicesMegaMenu from '@/app/components/ServicesMegaMenu'

<ServicesMegaMenu
  services={menuServices}
  isOpen={isServicesMenuOpen}
  onClose={closeMobileMenu}
/>
```

## Styling

The component uses CSS modules with the following key classes:
- `.servicesMegaMenu`: Main container
- `.servicesMenuContent`: Grid container
- `.serviceItem`: Individual service item
- `.serviceTitle`: Service name with arrow
- `.serviceDescription`: Service description text

## Theme Colors

Uses CSS custom properties:
- `--color-primary`: Main green color (#10b981)
- `--color-secondary`: Darker green (#059669)
- `--color-dark`: Text color (#1f2937)
- `--color-gray`: Muted text (#6b7280)
- `--color-light`: Background hover (#f8fafc)
