## Google Maps API Troubleshooting Guide

### Common Issues and Solutions:

1. **API Key Restrictions**

   - Go to Google Cloud Console > APIs & Services > Credentials
   - Click on your API key
   - Under "Application restrictions", make sure:
     - Either "None" is selected (for testing)
     - Or "HTTP referrers" is selected with these entries:
       - localhost:\*
       - 127.0.0.1:\*
       - http://localhost:\*
       - https://localhost:\*

2. **API Not Enabled**

   - Go to Google Cloud Console > APIs & Services > Library
   - Search for "Maps JavaScript API"
   - Make sure it's ENABLED

3. **Billing Account**

   - Google Maps requires a billing account even for free tier
   - Go to Google Cloud Console > Billing
   - Attach a billing account to your project

4. **Check Quotas**
   - Go to Google Cloud Console > APIs & Services > Quotas
   - Check if you've exceeded daily limits

### Debug Commands:

Run these in your browser console (F12):

```javascript
// Check if Google Maps API is loaded
console.log("Google Maps loaded:", !!window.google?.maps);

// Check environment variables (in React dev tools)
console.log("API Key exists:", !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
```

### Test API Key Directly:

Open this URL in your browser (replace YOUR_API_KEY):
https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap

If you see JavaScript code, your API key works.
If you see an error, there's an issue with your API key or billing.
