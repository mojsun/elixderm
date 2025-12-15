# ProductOptionsModule Component

A flexible product options/pricing module that can be added to product pages with Sanity CMS integration.

## Features

- ✅ **Checkbox Toggle**: Optional checkbox to show/hide the options module
- ✅ **Multiple Plans**: Support for up to 5 different pricing plans
- ✅ **Product Details**: Configurable number of shampoos and conditioners
- ✅ **Pack Sizes**: Flexible pack size options (500ml, 1L, Gallon)
- ✅ **Timeline Display**: Customizable completion timeline
- ✅ **Featured Plans**: Highlight recommended plans
- ✅ **CTA Button**: Configurable call-to-action with custom link
- ✅ **Responsive Design**: Mobile-first responsive layout
- ✅ **Sanity Integration**: Full CMS control over content

## Usage

### In Product Pages

The module is automatically integrated into product pages when a `productOptions` reference is added to a product in Sanity.

```tsx
{product.productOptions && (
  <ProductOptionsModule 
    options={product.productOptions} 
    showCheckbox={true}
  />
)}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `ProductOption` | - | Product options data from Sanity |
| `showCheckbox` | `boolean` | `true` | Whether to show the toggle checkbox |

## Sanity Configuration

### Schema Fields

- **Module Name**: Internal identifier
- **Section Title**: Main heading (default: "Choose Your Plan")
- **Section Subtitle**: Optional description
- **Plans**: Array of pricing plans (1-5 plans)
- **CTA**: Call-to-action button configuration
- **Show on Products**: Select which products display this module

### Plan Configuration

Each plan includes:
- **Name**: Plan title (e.g., "Startup", "Professional")
- **Description**: Brief plan description
- **Products**: Number of shampoos and conditioners
- **Label Included**: Whether custom labeling is included
- **Pack Sizes**: Available sizes (500ml, 1L, Gallon)
- **Timeline**: Expected completion time
- **Featured**: Mark as recommended plan
- **Price**: Optional price display

## Styling

The component uses CSS modules with:
- **Modern Design**: Clean, professional appearance
- **Brand Colors**: Matches Elixderm design system
- **Smooth Animations**: Fade-in effects and hover states
- **Responsive Grid**: Adapts to different screen sizes
- **Featured Highlighting**: Visual emphasis for recommended plans

## Default Values

- **Timeline**: "Three weeks"
- **Products**: 2 shampoos + 1 conditioner
- **Pack Sizes**: 500ml, 1L
- **CTA Text**: "Book a Call With Us"
- **CTA Link**: "/contact-us"

## Integration

The module appears above the FAQ section on product pages and can be toggled on/off via checkbox for better user experience.
