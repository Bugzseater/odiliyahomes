import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "node:url";
import { copyFileSync, existsSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-htaccess",
      closeBundle() {
        // Check if .htaccess exists before copying
        const sourcePath = path.resolve(__dirname, "public", ".htaccess");
        const destPath = path.resolve(__dirname, "dist", ".htaccess");
        
        if (existsSync(sourcePath)) {
          try {
            copyFileSync(sourcePath, destPath);
            console.log("✓ .htaccess copied to dist folder");
          } catch (err) {
            console.error("Failed to copy .htaccess:", err);
          }
        } else {
          console.warn("⚠️ .htaccess file not found in public folder");
          // Create an empty .htaccess file if needed
          try {
            // Optional: Create default .htaccess
            const defaultContent = `# Apache configuration
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>`;
            copyFileSync(Buffer.from(defaultContent), destPath);
            console.log("✓ Default .htaccess created");
          } catch (createErr) {
            console.error("Could not create .htaccess:", createErr);
          }
        }
      },
    },
  ],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into vendor chunks
          if (id.includes("node_modules")) {
            // Split React libraries separately
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router")) {
              return "react-vendor";
            }
            // Split Firebase libraries separately
            if (id.includes("firebase")) {
              return "firebase-vendor";
            }
            // Split Lucide icons separately
            if (id.includes("lucide-react")) {
              return "icons-vendor";
            }
            // Other node_modules go to vendor chunk
            return "vendor";
          }
        },
        // Optimize file naming
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});