import { defineConfig } from 'vite';

// For a user/organization GitHub Pages site (neuromeshlab.github.io), base should be '/'.
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});


