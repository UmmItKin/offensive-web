// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import unocss from '@unocss/astro';

export default defineConfig({
  integrations: [vue(), unocss()],
});
