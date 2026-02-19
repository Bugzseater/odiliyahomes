// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { copyFileSync } from "fs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-htaccess",
      closeBundle() {
        // Copy .htaccess to dist folder after build
        try {
          copyFileSync("public/.htaccess", "dist/.htaccess");
          console.log("✓ .htaccess copied to dist folder");
        } catch (err) {
          console.error("Failed to copy .htaccess:", err);
        }
      },
    },
  ],
  base: "/", // Use absolute paths from root
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1000 kB
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into vendor chunk
          if (id.includes("node_modules")) {
            // Split React libraries separately
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router")
            ) {
              return "react-vendor";
            }
            // Other node_modules go to vendor chunk
            return "vendor";
          }

          // Split large component files
          if (id.includes("/components/")) {
            return "components";
          }

          // Split page files
          if (id.includes("/pages/")) {
            return "pages";
          }
        },
        // Optimize file naming
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
