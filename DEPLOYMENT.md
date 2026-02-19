# Deployment Guide - Fixing Route Redirects

## Problem

After hosting, direct navigation to routes (like `/about`, `/contact`, `/residence`) returns 404 errors or fails to load properly. This happens because the server tries to find these files instead of serving the SPA's index.html.

## Solution

We've created configuration files for different hosting platforms. Choose the appropriate solution based on your hosting provider:

---

## 1. Netlify (Recommended)

**Files created:**

- `public/_redirects`
- `netlify.toml`

**How it works:**

- The `_redirects` file tells Netlify to serve `index.html` for all routes
- The `netlify.toml` provides build configuration and caching headers

**Deploy:**

```bash
npm run build
# Connect your repo to Netlify, or drag & drop the 'dist' folder
```

**Manual Configuration (if needed):**

- Go to Site Settings → Build & Deploy → Post Processing
- Enable "Pretty URLs" and "Asset Optimization"

---

## 2. Vercel

**File created:**

- `vercel.json`

**How it works:**

- Rewrites all routes to `/index.html`
- Adds security headers
- Configures caching for static assets

**Deploy:**

```bash
npm run build
# Connect your repo to Vercel or use Vercel CLI
```

---

## 3. Apache Server (.htaccess)

**File created:**

- `public/.htaccess`

**How it works:**

- Uses mod_rewrite to redirect all non-file requests to index.html
- Enables GZIP compression
- Sets proper cache headers

**Deploy:**

1. Build the project: `npm run build`
2. Upload the `dist` folder contents to your server
3. Ensure `.htaccess` is uploaded (it's in the dist folder)
4. Make sure Apache's `mod_rewrite` is enabled

**Enable mod_rewrite (if needed):**

```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

---

## 4. Nginx

**Create this file:** `/etc/nginx/sites-available/your-site`

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/your-site/dist;
    index index.html;

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Don't cache HTML
    location ~* \.(html)$ {
        expires -1;
        add_header Cache-Control "no-cache, must-revalidate";
    }
}
```

**Deploy:**

```bash
npm run build
sudo ln -s /etc/nginx/sites-available/your-site /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 5. GitHub Pages

**Update vite.config.js:**

```javascript
export default defineConfig({
  base: "/repository-name/", // Your repo name
  // ... rest of config
});
```

**Create:** `public/404.html` (copy of index.html)

**Deploy:**

```bash
npm run build
# Use gh-pages package or GitHub Actions
```

---

## 6. Firebase Hosting

**Create:** `firebase.json`

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

**Deploy:**

```bash
npm run build
firebase deploy
```

---

## Testing After Deployment

1. **Direct URL Navigation:**

   - Visit `https://your-domain.com/about`
   - Visit `https://your-domain.com/contact`
   - Visit `https://your-domain.com/residence`

2. **Page Refresh:**

   - Navigate within the app
   - Refresh the page (F5)
   - Should stay on the same page

3. **Browser Back/Forward:**
   - Click through multiple pages
   - Use browser back/forward buttons
   - Routes should work correctly

---

## Common Issues & Solutions

### Issue: 404 on page refresh

**Solution:** Server configuration not properly set up. Check the appropriate config file for your hosting provider.

### Issue: Blank page on direct URL

**Solution:** Check browser console for errors. May need to adjust `base` in vite.config.js

### Issue: CSS/JS files not loading

**Solution:**

- Check `base` path in vite.config.js
- Ensure correct path in index.html
- Clear browser cache

### Issue: Assets return 404

**Solution:**

- Verify build output structure
- Check asset paths in deployed files
- Ensure public folder contents are copied to dist

---

## Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Test routes locally after build
npm run preview
# Then visit: http://localhost:4173/about
```

---

## Environment Variables

Don't forget to set environment variables on your hosting platform:

- `VITE_GOOGLE_MAPS_API_KEY` - Your Google Maps API key
- Any other environment variables from `.env`

**Netlify/Vercel:** Add in dashboard under Environment Variables
**Other platforms:** Set according to platform documentation

---

## Current Configuration Status

✅ **Created:**

- `public/_redirects` - Netlify redirects
- `netlify.toml` - Netlify configuration
- `vercel.json` - Vercel configuration
- `public/.htaccess` - Apache configuration

📝 **Note:** The appropriate config file will be automatically included in the build based on your hosting platform.
