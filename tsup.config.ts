import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  treeshake: true,
  // Fix the export warning
  esbuildOptions(options) {
    options.banner = {
      js: '"use strict";'
    };
  },
});
