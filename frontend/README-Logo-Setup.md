# Logo Customization Guide

This guide will help you add your own custom logo to the CareConnect application.

## Quick Start

1. **Add your logo file** to the `/public` folder (e.g., `/public/logo.svg`)
2. **Update the App.tsx file** with your logo URL:

```typescript
// In App.tsx, find the logoConfig object and update it:
const logoConfig = {
  logoUrl: '/logo.svg', // Replace with your logo path
  alt: 'Your Company Logo',
  fallbackText: 'Your App Name'
};
```

3. **Save and refresh** - your logo should now appear!

## Logo Requirements

### File Formats (in order of preference)
1. **SVG** (Recommended) - Scalable, crisp at all sizes
2. **PNG** with transparency - Good for complex logos
3. **JPG/JPEG** - Basic support, no transparency

### Dimensions
- **Width**: 150-200px
- **Height**: 40-60px  
- **Aspect Ratio**: 3:1 to 4:1 (landscape orientation)
- **File Size**: Under 50KB for best performance

### Design Guidelines
- Ensure good contrast against white backgrounds
- Test at different sizes (24px, 32px, 48px height)
- Consider how it looks next to colored badges
- Make sure text in logo is readable at small sizes

## File Placement Options

### Option 1: Public Folder (Recommended)
```
/public/
  ├── logo.svg
  ├── logo.png
  └── images/
      └── logo-dark.svg
```

Usage in code:
```typescript
logoUrl: '/logo.svg'
logoUrl: '/images/logo-dark.svg'
```

### Option 2: External URL
```typescript
logoUrl: 'https://your-domain.com/logo.svg'
logoUrl: 'https://cdn.yoursite.com/assets/logo.png'
```

## Size Variants

The Logo component supports three size variants:

```typescript
<Logo size="sm" /> // 24px height - for compact areas
<Logo size="md" /> // 32px height - default size
<Logo size="lg" /> // 48px height - for headers/hero sections
```

## Complete Configuration Options

```typescript
const logoConfig = {
  // Your logo URL (relative path or full URL)
  logoUrl: '/logo.svg',
  
  // Alt text for accessibility
  alt: 'Your Company Logo',
  
  // Fallback text if image fails to load
  fallbackText: 'Your App Name'
};
```

## Advanced Usage

### Using the Logo Component Directly

```typescript
import { Logo } from './components/Logo';

// Basic usage
<Logo logoUrl="/logo.svg" />

// With all options
<Logo 
  logoUrl="/logo.svg"
  alt="Company Logo"
  fallbackText="Company Name"
  size="md"
  className="custom-logo-styles"
/>
```

### Multiple Logo Variants

You can use different logos for different contexts:

```typescript
// Light theme logo
<Logo logoUrl="/logo-light.svg" />

// Dark theme logo  
<Logo logoUrl="/logo-dark.svg" />

// Different sizes
<Logo logoUrl="/logo.svg" size="sm" /> // Navigation
<Logo logoUrl="/logo-large.svg" size="lg" /> // Homepage header
```

## Troubleshooting

### Logo Not Appearing
- ✅ Check file path is correct (`/logo.svg` not `logo.svg`)
- ✅ Ensure file exists in `/public` folder
- ✅ Verify image format is supported (SVG, PNG, JPG)
- ✅ Check browser developer console for errors
- ✅ Try accessing logo URL directly: `yoursite.com/logo.svg`

### Logo Appears Blurry
- ✅ Use SVG format for perfect scaling
- ✅ Ensure PNG is high resolution (2x pixel density)
- ✅ Check original logo dimensions are appropriate
- ✅ Avoid scaling up small images

### Logo Wrong Size
- ✅ Adjust `size` prop: `"sm"`, `"md"`, or `"lg"`
- ✅ Modify original image dimensions
- ✅ Use custom CSS classes for precise control

### Fallback Text Showing
- ✅ Verify `logoUrl` is correct and accessible
- ✅ Check image file isn't corrupted
- ✅ Ensure proper CORS headers for external URLs
- ✅ Test logo URL in browser address bar

## Examples

### Basic Setup
```typescript
// App.tsx
const logoConfig = {
  logoUrl: '/my-company-logo.svg',
  alt: 'My Company Logo',
  fallbackText: 'My Company'
};
```

### External CDN
```typescript
const logoConfig = {
  logoUrl: 'https://cdn.mycompany.com/logo.svg',
  alt: 'My Company Logo', 
  fallbackText: 'My Company'
};
```

### Text-Only Logo
```typescript
const logoConfig = {
  logoUrl: undefined, // No image
  fallbackText: 'My Care Service'
};
```

## Best Practices

1. **Always provide fallback text** for accessibility and reliability
2. **Test at different screen sizes** to ensure readability
3. **Optimize file sizes** for faster loading
4. **Use descriptive alt text** for screen readers
5. **Consider dark/light theme variants** if your app supports themes
6. **Keep backups** of your logo files in multiple formats

## Need Help?

If you're having trouble with logo setup:

1. Check the browser console for error messages
2. Verify your file paths and permissions
3. Test with a simple PNG first, then switch to SVG
4. Make sure your logo dimensions match recommendations

---

*This logo system is designed to be flexible and robust, with automatic fallbacks to ensure your branding always appears correctly.*