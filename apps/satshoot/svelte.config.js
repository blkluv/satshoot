import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // You NEED { script: true } for TypeScript enums in Svelte components
    preprocess: vitePreprocess({ script: true }),
    
    kit: {
        adapter: adapter({
            pages: 'build/htdocs',
            assets: 'build/htdocs',
            fallback: 'index.html',
            precompress: false,
            strict: true,
        }),
        paths: {
            // Uncomment and adjust if deploying to subdirectory
            // base: process.argv.includes('dev') ? '' : process.env.BASE_PATH || ''
        }
    }
};

export default config;
