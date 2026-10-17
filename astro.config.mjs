// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';


import sitemap from '@astrojs/sitemap';


// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sitemap({
      filter: (page) => !/\/b\/\d+\/?$/.test(page),
    }),
  ],
  site: 'https://yudavidcao.github.io',
  base: '/',
  vite: {
    plugins: [tailwindcss()],
  },
});