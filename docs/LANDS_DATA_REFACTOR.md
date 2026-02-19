# Land Projects Data Refactor

## Overview

Separated land project data from the `Lands.jsx` component into a dedicated data file, following the same pattern used for residence projects.

## Changes Made

### 1. Created New Data File

**File:** `src/data/landsData.js`

This file contains:

- **`landsProjectsData`**: Array of basic land project information for listing views
  - Contains id, name, description, image, and category for each land project
- **`landDetailsData`**: Object containing detailed information for each land project

  - Includes full project details: images, map, location, property advisor info
  - Used for individual project detail pages

- **`LandProjects`**: Array with extended details for search section
  - Includes id, title, description, image, location, area, price, and availability
  - Used in ProjectsWithSearchSection component

### 2. Updated Lands.jsx Component

**File:** `src/pages/Lands.jsx`

Changes:

- Added import for `landDetailsData`, `landsProjectsData`, and `LandProjects` from `@/data/landsData`
- Removed inline `landDetailsData` definition (was using `useMemo`)
- Removed inline `projectsData` array definition
- Removed inline `LandProjects` array definition
- Removed unused `useMemo` import from React
- Removed unused image imports (img1, img2, img3) - now imported in landsData.js
- Updated `OurProjectsSection` to use `landsProjectsData` instead of local `projectsData`
- Updated `ProjectsWithSearchSection` to use imported `LandProjects`
- Fixed `useEffect` dependency array to remove `landDetailsData` (unnecessary dependency)

## Benefits

1. **Consistency**: Follows the same pattern as residence projects in `projectsData.js`
2. **Maintainability**: Easier to update land project data in one centralized location
3. **Reusability**: Land data can now be imported and used in other components if needed
4. **Cleaner Code**: Separates data from UI logic in the component
5. **Better Organization**: Data files are grouped in the `src/data/` directory

## File Structure

```
src/
  data/
    landsData.js        (NEW - Land projects data)
    projectsData.js     (Existing - Residence projects data)
  pages/
    Lands.jsx           (Updated - Now imports from landsData.js)
    Residence.jsx       (Existing - Imports from projectsData.js)
```

## Land Projects Included

1. **KASBEWA PREMIUM LANDS**

   - Premium residential land plots
   - Location: Kasbewa, Sri Lanka

2. **KURUNEGALA RESIDENTIAL PLOTS**

   - Strategic residential land development
   - Location: Kurunegala, Sri Lanka

3. **MEEGODA INVESTMENT LANDS**
   - premium investment land parcels
   - Location: Meegoda, Sri Lanka

## Usage Example

```javascript
import {
  landDetailsData,
  landsProjectsData,
  LandProjects,
} from "@/data/landsData";

// Use landsProjectsData for listing views
<OurProjectsSection projects={landsProjectsData} />;

// Use LandProjects for search section
<ProjectsWithSearchSection projects={LandProjects} />;

// Use landDetailsData for detail views
const projectDetails = landDetailsData[projectId];
```

## Date

October 20, 2025
