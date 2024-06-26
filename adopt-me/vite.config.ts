import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "src",
  test: {
    environment: "happy-dom",
    setupFiles: ['./setupVitest.js']
  }
});
