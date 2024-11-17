// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import alpinejs from '@astrojs/alpinejs';
import htmx from 'astro-htmx';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [
    tailwind(), alpinejs(), htmx()
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
});