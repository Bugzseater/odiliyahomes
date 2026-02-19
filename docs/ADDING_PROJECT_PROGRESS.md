# Adding Project Progress Images - Guide

## Overview

The ProjectProgress component has been integrated into the ProjectDetails page. It will automatically display when you add `progressImages` to your project data.

## How to Add Progress Images to Your Projects

### Step 1: Add progressImages to Your Data

Open either `src/data/landsData.js` or `src/data/projectsData.js` and add a `progressImages` array to any project:

```javascript
{
  id: 3,
  name: "Meegoda - Crystal",
  description: "...",
  images: [...],

  // Add this new property to show project progress
  progressImages: [
    {
      src: "https://res.cloudinary.com/dswr94sjy/image/upload/v1760465496/progress-1.png",
      alt: "Site Preparation Phase",
      caption: "Initial land clearing and preparation - January 2024"
    },
    {
      src: "https://res.cloudinary.com/dswr94sjy/image/upload/v1760465522/progress-2.png",
      alt: "Infrastructure Development",
      caption: "Road and utility installation - March 2024"
    },
    {
      src: "https://res.cloudinary.com/dswr94sjy/image/upload/v1760465535/progress-3.png",
      alt: "Current Progress",
      caption: "70% complete - Ongoing development"
    }
  ],

  mapEmbedUrl: "...",
  location: "...",
  // ... rest of your data
}
```

### Step 2: Image Object Structure

Each progress image object should have:

```javascript
{
  src: string,      // REQUIRED - Image URL (Cloudinary, local path, etc.)
  alt: string,      // OPTIONAL - Alt text for accessibility
  caption: string   // OPTIONAL - Caption shown on hover and in lightbox
}
```

### Step 3: Real Example for Meegoda - Crystal Project

```javascript
3: {
  id: 3,
  name: "Meegoda - Crystal",
  description: "Discover land for sale in Meegoda...",
  images: [
    {
      src: "https://res.cloudinary.com/dswr94sjy/image/upload/v1760465496/Screenshot_52_ksir5z.png",
      alt: "Meegoda land parcels",
    },
    // ... other main images
  ],

  // Add project progress images
  progressImages: [
    {
      src: "https://res.cloudinary.com/dswr94sjy/image/upload/v1760953929/Panagoda-LandProject-Elliott-01-1920x1280_acroaa.webp",
      alt: "Foundation Work",
      caption: "Site leveling and foundation work completed - Oct 2024"
    },
    {
      src: "https://res.cloudinary.com/dswr94sjy/image/upload/v1760953930/Panagoda-LandProject-Elliott-04-1920x1280_o9yzof.webp",
      alt: "Infrastructure Phase",
      caption: "Road construction and drainage system - Nov 2024"
    },
    {
      src: "https://res.cloudinary.com/dswr94sjy/image/upload/v1760953931/Panagoda-LandProject-Elliott-03-1920x1280_adshwe.webp",
      alt: "Current Status",
      caption: "Ongoing development - Water and electricity installation"
    }
  ],

  mapEmbedUrl: "...",
  location: "Meegoda, Sri Lanka",
  // ... rest of data
}
```

## Layout Options

The component supports two layouts:

### 1. Asymmetric Layout (Default - Matches Your Design)

```javascript
// In ProjectDetails.jsx (already set)
<ProjectProgress
  title="Project Progress"
  images={currentProject.progressImages}
  layout="asymmetric" // This creates the 2 small + 1 large layout
/>
```

**Layout Structure:**

- Left column: 2 small square images (stacked)
- Right column: 1 large rectangular image (spans both rows)

### 2. Grid Layout (Alternative)

```javascript
<ProjectProgress
  title="Project Progress"
  images={currentProject.progressImages}
  layout="grid" // This creates an even grid
/>
```

## Quick Start Examples

### Example 1: Minimal (3 images - perfect for asymmetric layout)

```javascript
progressImages: [
  {
    src: "/images/progress-1.jpg",
    alt: "Phase 1",
  },
  {
    src: "/images/progress-2.jpg",
    alt: "Phase 2",
  },
  {
    src: "/images/progress-3.jpg",
    alt: "Phase 3",
  },
];
```

### Example 2: With Captions

```javascript
progressImages: [
  {
    src: "https://your-cdn.com/image1.jpg",
    alt: "Foundation Work",
    caption: "Land preparation and foundation - January 2024",
  },
  {
    src: "https://your-cdn.com/image2.jpg",
    alt: "Construction",
    caption: "Main construction phase started - March 2024",
  },
  {
    src: "https://your-cdn.com/image3.jpg",
    alt: "Current Status",
    caption: "60% complete - Expected completion December 2024",
  },
];
```

### Example 3: Many Images (use grid layout)

```javascript
progressImages: [
  { src: "/img/1.jpg", alt: "Survey", caption: "Initial survey - Jan" },
  { src: "/img/2.jpg", alt: "Clearing", caption: "Land clearing - Feb" },
  { src: "/img/3.jpg", alt: "Foundation", caption: "Foundation - Mar" },
  { src: "/img/4.jpg", alt: "Infrastructure", caption: "Infrastructure - Apr" },
  { src: "/img/5.jpg", alt: "Roads", caption: "Road construction - May" },
  { src: "/img/6.jpg", alt: "Current", caption: "Current status - Jun" },
];
```

## Best Practices

### Image Recommendations

- **Format**: WebP or JPG
- **Size**: Under 500KB each (compressed)
- **Dimensions**: 1920x1080 or similar 16:9 ratio
- **Quality**: 80-85% compression

### Caption Tips

- Keep captions concise (1-2 lines)
- Include month/year for timeline context
- Mention completion percentage if applicable
- Example formats:
  - "Site preparation completed - October 2024"
  - "Phase 1: 80% complete - Infrastructure work ongoing"
  - "Current status as of November 2024 - Road construction"

### When to Show Progress Section

- Active/ongoing projects
- Recently completed projects (last 6 months)
- Projects with significant updates
- Skip for sold-out or very old projects

## Adding to Multiple Projects

You can add progress images to as many projects as needed. The component will only show up on pages where `progressImages` array exists and has at least one image.

### Example: Adding to 3 Different Projects

```javascript
// landsData.js

export const landDetailsData = {
  1: {
    name: "Kahathuduwa - Topaz",
    // ... other data
    progressImages: [
      { src: "...", alt: "...", caption: "..." },
      { src: "...", alt: "...", caption: "..." },
      { src: "...", alt: "...", caption: "..." },
    ],
  },

  3: {
    name: "Meegoda - Crystal",
    // ... other data
    progressImages: [
      { src: "...", alt: "...", caption: "..." },
      { src: "...", alt: "...", caption: "..." },
      { src: "...", alt: "...", caption: "..." },
    ],
  },

  7: {
    name: "Ja-Ela - Endora",
    // ... other data
    progressImages: [
      { src: "...", alt: "...", caption: "..." },
      { src: "...", alt: "...", caption: "..." },
      { src: "...", alt: "...", caption: "..." },
    ],
  },

  // Projects without progressImages won't show the section
};
```

## Testing

1. Add `progressImages` to one project in your data
2. Navigate to that project's detail page
3. Scroll down to see the "Project Progress" section
4. Test the lightbox by clicking on images
5. Test keyboard navigation (Arrow keys, Escape)

## Troubleshooting

**Progress section not showing?**

- Check that `progressImages` array exists in your project data
- Ensure array has at least 1 image
- Verify image URLs are accessible
- Check browser console for errors

**Images not loading?**

- Verify image URLs are correct
- Check CORS settings if using external images
- Test image URL directly in browser

**Layout looks wrong?**

- For 3 images, use `layout="asymmetric"`
- For 4+ images, consider `layout="grid"`
- Check responsive view on different screen sizes

## Features Included

✅ Click to enlarge (lightbox)
✅ Arrow key navigation in lightbox
✅ ESC to close lightbox
✅ Image captions on hover
✅ Responsive design (mobile/tablet/desktop)
✅ Error handling for broken images
✅ Lazy loading for performance
✅ Accessibility support
✅ Dark mode compatible

## Need Help?

Check the main documentation: `docs/PROJECT_PROGRESS_COMPONENT.md`

---

**Remember**: The component is smart enough to only show when progress images exist, so you can add it to some projects and not others without any issues!
