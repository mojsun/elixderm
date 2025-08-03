# Breadcrumb Component

A SEO-optimized breadcrumb navigation component with structured data support.

## Features

- ✅ **Responsive design** with mobile-friendly styling
- ✅ **Accessibility** with proper ARIA labels and semantic HTML
- ✅ **SEO optimized** with JSON-LD structured data
- ✅ **Type-safe** TypeScript interfaces
- ✅ **Server-side rendered** with CSS modules

## Usage

### Basic Usage
```tsx
import Breadcrumb from '@/components/Breadcrumb';

export default function Page() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Skincare" } // Current page (no href)
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      {/* Rest of page content */}
    </div>
  );
}
```

### With Custom Base URL
```tsx
<Breadcrumb 
  items={breadcrumbItems}
  baseUrl="https://your-custom-domain.com" 
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | `BreadcrumbItem[]` | ✅ | Array of breadcrumb items |
| `baseUrl` | `string` | ❌ | Custom base URL for structured data |

### BreadcrumbItem Interface
```tsx
interface BreadcrumbItem {
  label: string;    // Display text
  href?: string;    // Link URL (optional for current page)
}
```

## SEO Benefits

### 1. JSON-LD Structured Data
Automatically generates Schema.org BreadcrumbList markup:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": {
        "@type": "WebPage", 
        "@id": "https://elixderm.com/"
      }
    }
  ]
}
```

### 2. Rich Snippets
This structured data enables Google to show breadcrumb navigation in search results:
```
elixderm.com › Products › Skincare
Beautiful Skincare Solutions - Custom Formulations
```

### 3. Accessibility Features
- `aria-label="Breadcrumb navigation"`
- Proper semantic HTML with `<nav>` element
- `aria-hidden="true"` for decorative chevron icons
- Screen reader friendly structure

## Testing SEO Implementation

### Google Rich Results Test
1. Build your page with the breadcrumb
2. Test at [Google Rich Results Test](https://search.google.com/test/rich-results)
3. Look for "BreadcrumbList" in the detected structured data

### Local Testing
View page source and look for the JSON-LD script:
```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList",...}
</script>
```

## Examples

### E-commerce Product Page
```tsx
const productBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Skincare", href: "/skincare" },
  { label: "Serums", href: "/skincare/serums" },
  { label: "Vitamin C Serum" } // Current product
];
```

### Blog Post
```tsx
const blogBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Skincare Tips", href: "/blog/skincare" },
  { label: "How to Choose the Right Cleanser" }
];
```

### Service Page
```tsx
const serviceBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Custom Formulation" }
];
```

## Performance

- **Server-side rendered**: Full HTML generated on server
- **CSS Modules**: Scoped styles, tree-shaken in production
- **Zero JavaScript**: Works without client-side JS
- **Optimized bundle**: Only includes breadcrumb styles when component is used 