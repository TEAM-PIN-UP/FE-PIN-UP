import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), // Put the Sentry vite plugin after all other plugins
  sentryVitePlugin({
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    telemetry: false,

    // Auth tokens can be obtained from https://sentry.io/orgredirect/organizations/:orgslug/settings/auth-tokens/
    authToken: process.env.SENTRY_AUTH_TOKEN,
  }), sentryVitePlugin({
    org: "pinup-p6",
    project: "pinup-web"
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      plugins: [visualizer({ open: true })],
    },
    sourcemap: true, // sentry
  },
});