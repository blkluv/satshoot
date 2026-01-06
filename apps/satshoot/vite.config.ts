import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [tailwindcss(), sveltekit()],
    
    build: {
        target: 'esnext',
        sourcemap: true, // Consider disabling for production: sourcemap: false
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    // Group large dependencies into separate chunks
                    if (id.includes('node_modules')) {
                        // Nostr-related libraries
                        if (
                            id.includes('@nostr-dev-kit') ||
                            id.includes('nostr-tools') ||
                            id.includes('@noble') ||
                            id.includes('@scure')
                        ) {
                            return 'nostr-libs';
                        }
                        
                        // UI component libraries
                        if (
                            id.includes('@skeletonlabs') ||
                            id.includes('@zag-js') ||
                            id.includes('@fortawesome')
                        ) {
                            return 'ui-components';
                        }
                        
                        // Charting libraries
                        if (
                            id.includes('chart.js') ||
                            id.includes('chartjs-plugin')
                        ) {
                            return 'chart-libs';
                        }
                        
                        // Crypto/currency libraries
                        if (
                            id.includes('@cashu') ||
                            id.includes('@getalby') ||
                            id.includes('@noble/ciphers') ||
                            id.includes('@noble/hashes')
                        ) {
                            return 'crypto-libs';
                        }
                        
                        // Large utility libraries
                        if (
                            id.includes('highlight.js') ||
                            id.includes('marked') ||
                            id.includes('date-fns') ||
                            id.includes('fuse.js')
                        ) {
                            return 'utils-libs';
                        }
                        
                        // Svelte runtime
                        if (id.includes('svelte')) {
                            return 'svelte-runtime';
                        }
                        
                        // Vite/SvelteKit runtime
                        if (id.includes('@sveltejs/kit') || id.includes('@sveltejs/vite-plugin')) {
                            return 'sveltekit-runtime';
                        }
                        
                        // Default vendor chunk for remaining node_modules
                        return 'vendor';
                    }
                    
                    // Group your own code by routes/features if you have very large components
                    if (id.includes('src/lib/components/Notifications')) {
                        return 'notifications';
                    }
                    
                    if (id.includes('src/lib/components/Cards')) {
                        return 'cards';
                    }
                    
                    if (id.includes('src/lib/components/Modals')) {
                        return 'modals';
                    }
                }
            }
        },
        chunkSizeWarningLimit: 1000, // Increase warning limit from default 500KB
        minify: 'terser', // Use terser for better minification (install: npm i -D terser)
        terserOptions: {
            compress: {
                drop_console: true, // Remove console.log in production
                drop_debugger: true
            }
        }
    },
    
    // Enable faster builds with better caching
    cacheDir: '.vite',
    
    // Optimize dependency pre-bundling
    optimizeDeps: {
        include: [
            '@nostr-dev-kit/ndk',
            '@nostr-dev-kit/ndk-svelte',
            '@nostr-dev-kit/ndk-svelte-components',
            '@skeletonlabs/skeleton',
            '@zag-js/svelte',
            'svelte'
        ],
        exclude: ['@sveltejs/kit'] // Kit should not be pre-bundled
    },
    
    ssr: {
        // Optimize SSR dependencies
        noExternal: [
            '@nostr-dev-kit/ndk-svelte-components',
            '@skeletonlabs/skeleton',
            '@zag-js/svelte'
        ]
    },
    
    // Development server options
    server: {
        fs: {
            // Allow serving files from project root
            allow: ['.']
        }
    },
    
    // Preview server options
    preview: {
        port: 4173,
        host: true
    }
});
