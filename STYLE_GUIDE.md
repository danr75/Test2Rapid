# Interactive Learning Hub - Style Guide

## Colors

### Primary
- Primary: `#4F46E5` (Indigo)
- Primary Hover: `#4338CA`
- Primary Light: `#818CF8`

### Secondary
- Secondary: `#10B981` (Emerald)
- Secondary Hover: `#059669`
- Secondary Light: `#34D399`

### Status
- Success: `#10B981`
- Warning: `#F59E0B`
- Error: `#EF4444`

### Neutrals
- Background: `#F9FAFB`
- Surface: `#FFFFFF`
- Text: `#1F2937`
- Text Secondary: `#6B7280`
- Border: `#E5E7EB`

## Typography

### Font Family
- Primary: `Inter`, sans-serif

### Font Weights
- Regular: `400`
- Medium: `500`
- Semibold: `600`
- Bold: `700`

### Headings
- H1: `3rem` (48px)
- H2: `2.25rem` (36px)
- H3: `1.875rem` (30px)
- H4: `1.5rem` (24px)
- H5: `1.25rem` (20px)
- H6: `1.125rem` (18px)

## Spacing

### Base Unit
8px

### Scale
- xs: `0.25rem` (4px)
- sm: `0.5rem` (8px)
- md: `1rem` (16px)
- lg: `1.5rem` (24px)
- xl: `2rem` (32px)
- 2xl: `3rem` (48px)
- 3xl: `4rem` (64px)
- 4xl: `6rem` (96px)

## Border Radius
- sm: `0.25rem` (4px)
- DEFAULT: `0.375rem` (6px)
- md: `0.5rem` (8px)
- lg: `0.75rem` (12px)
- xl: `1rem` (16px)
- 2xl: `1.5rem` (24px)
- full: `9999px`

## Shadows
- sm: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
- DEFAULT: `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`
- md: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`
- lg: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`
- xl: `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`
- 2xl: `0 25px 50px -12px rgb(0 0 0 / 0.25)`
- inner: `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)`

## Components

### Buttons
```jsx
// Primary Button
<button className="btn btn-primary">Primary Button</button>

// Secondary Button
<button className="btn btn-secondary">Secondary Button</button>

// Outline Button
<button className="btn btn-outline">Outline Button</button>
```

### Cards
```jsx
<div className="card">
  <div className="card-header">
    <h3>Card Title</h3>
  </div>
  <div className="card-body">
    <p>Card content goes here</p>
  </div>
  <div className="card-footer">
    <button className="btn btn-primary">Action</button>
  </div>
</div>
```

### Alerts
```jsx
<div className="alert alert-info">This is an info alert</div>
<div className="alert alert-success">This is a success alert</div>
<div className="alert alert-warning">This is a warning alert</div>
<div className="alert alert-error">This is an error alert</div>
```

### Forms
```jsx
<label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
  Email
</label>
<input
  type="email"
  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
  placeholder="you@example.com"
/>
```

## Responsive Design

### Breakpoints
- sm: `640px`
- md: `768px`
- lg: `1024px`
- xl: `1280px`
- 2xl: `1536px`

### Example
```jsx
<div className="w-full md:w-1/2 lg:w-1/3">
  Responsive width
</div>
```

## Dark Mode
The application supports dark mode using the `dark:` variant:

```jsx
<div className="bg-white dark:bg-gray-800">
  <h1 className="text-gray-900 dark:text-white">Dark mode text</h1>
</div>
```

## Best Practices
1. **Use Utility Classes First**: Prefer Tailwind utility classes over custom CSS
2. **Extract Components**: For repeated UI patterns, create React components
3. **Use Design Tokens**: Reference colors, spacing, and typography from the theme
4. **Responsive Design**: Always consider mobile-first responsive design
5. **Accessibility**: Ensure proper contrast and semantic HTML
