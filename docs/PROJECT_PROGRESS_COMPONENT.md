# ProjectProgress Component Documentation

## Overview

The `ProjectProgress` component is an enterprise-level React component designed to showcase project development progress through an interactive image gallery. It features a responsive asymmetric grid layout (as shown in your reference image) with lightbox functionality, keyboard navigation, and full accessibility support.

## Features

✅ **Asymmetric Grid Layout** - Matches the design from your reference image  
✅ **Lightbox Modal** - Click to view images in full size  
✅ **Keyboard Navigation** - Arrow keys, Escape to close  
✅ **Error Handling** - Graceful fallback for broken images  
✅ **Responsive Design** - Mobile, tablet, and desktop optimized  
✅ **Accessibility** - ARIA labels, keyboard support, reduced motion support  
✅ **Dark Mode Support** - Automatic dark mode detection  
✅ **Image Captions** - Optional captions on hover  
✅ **Loading States** - Lazy loading for performance  
✅ **TypeScript Ready** - PropTypes validation included

## Installation

The component has been created in your project at:

- Component: `src/components/ProjectProgress.jsx`
- Styles: `src/styles/ProjectProgress.css`
- Example: `src/components/ProjectProgressExample.jsx`

## Basic Usage

```jsx
import ProjectProgress from "./components/ProjectProgress";

function YourPage() {
  const images = [
    {
      src: "path/to/image1.jpg",
      alt: "Foundation Work",
      caption: "Site preparation completed - Oct 2024",
    },
    {
      src: "path/to/image2.jpg",
      alt: "Construction Phase",
      caption: "Main construction in progress",
    },
    {
      src: "path/to/image3.jpg",
      alt: "Final Touches",
      caption: "Finishing work underway",
    },
  ];

  return (
    <ProjectProgress
      title="Project Progress"
      images={images}
      layout="asymmetric"
    />
  );
}
```

## Props

| Prop     | Type   | Default            | Required | Description                                  |
| -------- | ------ | ------------------ | -------- | -------------------------------------------- |
| `title`  | string | "Project Progress" | No       | Section heading text                         |
| `images` | array  | []                 | Yes      | Array of image objects (see structure below) |
| `layout` | string | "asymmetric"       | No       | Layout type: "asymmetric" or "grid"          |

### Image Object Structure

```javascript
{
  src: string,      // Required - Image URL or path
  alt: string,      // Optional - Alt text for accessibility
  caption: string   // Optional - Caption shown on hover
}
```

## Layout Options

### Asymmetric Layout (Default)

Matches the reference image you provided with a 3-column grid where:

- Item 1: Small square (top-left)
- Item 2: Small square (bottom-left)
- Item 3: Large rectangle (spans both rows on the right)

```jsx
<ProjectProgress layout="asymmetric" images={images} />
```

### Grid Layout

Evenly distributed responsive grid for multiple images:

```jsx
<ProjectProgress layout="grid" images={images} />
```

## Advanced Examples

### Integration with Project Details Page

```jsx
import { useParams } from "react-router-dom";
import ProjectProgress from "./components/ProjectProgress";
import { landDetailsData } from "./data/landsData";

function ProjectDetailsPage() {
  const { id } = useParams();
  const project = landDetailsData[id];

  // Transform existing images to progress format
  const progressImages = project.images.slice(0, 3).map((img, index) => ({
    src: img.src,
    alt: img.alt,
    caption: `Progress Update ${index + 1}`,
  }));

  return (
    <div>
      <h1>{project.name}</h1>
      <ProjectProgress title="Construction Progress" images={progressImages} />
    </div>
  );
}
```

### With Dynamic Content

```jsx
import { useState, useEffect } from "react";
import ProjectProgress from "./components/ProjectProgress";

function DynamicProgress() {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    // Fetch from API
    fetch("/api/project-progress")
      .then((res) => res.json())
      .then((data) => setProgressData(data));
  }, []);

  return (
    <ProjectProgress
      title="Live Project Updates"
      images={progressData}
      layout="asymmetric"
    />
  );
}
```

### Multiple Progress Sections

```jsx
function ProjectTimeline() {
  const phase1Images = [...];
  const phase2Images = [...];
  const phase3Images = [...];

  return (
    <>
      <ProjectProgress
        title="Phase 1: Foundation"
        images={phase1Images}
      />
      <ProjectProgress
        title="Phase 2: Construction"
        images={phase2Images}
      />
      <ProjectProgress
        title="Phase 3: Completion"
        images={phase3Images}
      />
    </>
  );
}
```

## Styling Customization

The component uses CSS custom properties for easy theming:

```css
/* Override in your global CSS or component-specific styles */
.project-progress {
  --progress-primary-color: #d4a574;
  --progress-spacing: 80px;
  --progress-border-radius: 8px;
}

/* Custom title styling */
.project-progress__title {
  font-family: "Your Custom Font", sans-serif;
  color: var(--your-brand-color);
}

/* Custom grid gap */
.project-progress__grid {
  gap: 30px; /* Default is 20px */
}
```

## Accessibility Features

- **Keyboard Navigation**

  - `Tab` - Navigate between images
  - `Enter/Space` - Open lightbox
  - `Esc` - Close lightbox
  - `←/→` - Navigate between images in lightbox

- **Screen Reader Support**

  - Proper ARIA labels on all interactive elements
  - Alt text for all images
  - Role and aria-modal attributes on lightbox

- **Reduced Motion Support**
  - Respects `prefers-reduced-motion` media query
  - Disables animations for users who prefer reduced motion

## Performance Optimization

1. **Lazy Loading** - Images use native lazy loading
2. **Error Handling** - Broken images show graceful placeholder
3. **Event Cleanup** - Proper cleanup of event listeners
4. **Optimized Re-renders** - Uses `useCallback` for stable references

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## Common Use Cases

1. **Real Estate Projects** - Show construction progress
2. **Development Updates** - Track project milestones
3. **Before/After Galleries** - Showcase transformations
4. **Event Coverage** - Display event highlights
5. **Product Development** - Show prototype iterations

## Troubleshooting

### Images not displaying

- Check image paths are correct
- Verify CORS settings if using external images
- Check browser console for errors

### Layout issues

- Ensure parent container has defined width
- Check CSS Grid browser support
- Verify no conflicting global styles

### Lightbox not working

- Check for JavaScript errors in console
- Verify React version compatibility (16.8+)
- Ensure no z-index conflicts

## Best Practices

1. **Image Optimization**

   - Use WebP format when possible
   - Compress images (recommended: under 500KB each)
   - Use appropriate dimensions (recommended: 1920x1080 or similar)

2. **Accessibility**

   - Always provide meaningful alt text
   - Include descriptive captions
   - Test with screen readers

3. **Performance**

   - Limit to 3-6 images per section
   - Use CDN for image hosting (like Cloudinary)
   - Implement progressive image loading

4. **User Experience**
   - Use high-quality images
   - Keep captions concise (1-2 lines)
   - Maintain consistent aspect ratios

## Migration Guide

If you're migrating from an existing gallery component:

```jsx
// Old component
<ImageGallery images={myImages} />

// New component - just update the import and props
<ProjectProgress images={myImages} layout="asymmetric" />
```

## Support

For issues or questions:

1. Check this documentation
2. Review the example file: `ProjectProgressExample.jsx`
3. Check browser console for errors
4. Verify image URLs are accessible

## License

This component is part of your Odiliya Web project.

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Component Location**: `src/components/ProjectProgress.jsx`
