import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import ReactRefreshPlugin from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ReactRefreshPlugin()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
});
