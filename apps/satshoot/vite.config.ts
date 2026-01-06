import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        // Minimal chunking to avoid circular dependencies
        manualChunks(id) {
          // Only split node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          // All app code stays together
          return 'app';
        }
      }
    }
  },
  ssr: {
    noExternal: ['@nostr-dev-kit/ndk-wallet']
  },
  optimizeDeps: {
    include: ['@nostr-dev-kit/ndk-wallet']
  }
});
