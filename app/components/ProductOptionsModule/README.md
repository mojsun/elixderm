# ProductOptionsModule Component - SIMPLIFIED

A clean, simple product options module that displays 3 pricing plans with easy Sanity CMS management.

## ✨ **Super Simple Structure**

- **H2**: Main heading
- **Subheading**: Description text
- **3 Cards**: Startup, Professional, Enterprise
- **Features**: Simple bullet points per plan
- **CTA Button**: Goes to contact page

## 🎯 **Easy Sanity Setup**

### Just Fill These Fields:
1. **Main Heading (H2)**: "Choose Your Plan"
2. **Subheading**: "Select the perfect plan for your business needs"
3. **Plan 1 - Startup**: Title + list of features
4. **Plan 2 - Professional**: Title + features + mark as featured
5. **Plan 3 - Enterprise**: Title + list of features
6. **CTA Button Text**: "Get Your Custom Quote"

### Default Features (Ready to Use):
- **Startup**: 2 Shampoos + 1 Conditioner, Custom Label, 500ml & 1L, Three Weeks
- **Professional**: 3 Shampoos + 2 Conditioners, Premium Label, All Sizes, Two Weeks, Priority Support
- **Enterprise**: 5+ Products, Complete Branding, Custom Sizes, One Week, Account Manager

## 🚀 **Usage**

```tsx
{product.productOptions && (
  <ProductOptionsModule 
    options={product.productOptions} 
    showCheckbox={true}
  />
)}
```

## 🎨 **What You Get**

- ✅ **Checkbox toggle** to show/hide plans
- ✅ **3 clean cards** with your content
- ✅ **Featured badge** on middle plan (if enabled)
- ✅ **Responsive design** that looks great everywhere
- ✅ **CTA button** that goes to https://www.elixderm.com/contact-us
- ✅ **No complexity** - just works!

## 📝 **How to Use**

1. Go to `/admin` in Sanity
2. Create "Product Options Module"
3. Fill in the simple fields
4. Assign to a product
5. Done! It appears above FAQ section

**Much simpler than before - no more maze! 🎉**
