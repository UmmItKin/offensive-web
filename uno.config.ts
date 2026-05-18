import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'bg-main': 'bg-hex-0d1117',
    'text-main': 'text-hex-bbbbbb',
    'text-link': 'text-white',
    'border-main': 'border-neutral-600',
    'nav-link': 'text-link opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer decoration-none',
    'btn': 'inline-flex items-center justify-center px-4 py-2 rd-1 text-sm font-medium transition-colors duration-200 cursor-pointer decoration-none border-none',
    'btn-primary': 'btn bg-neutral-700 hover:bg-neutral-600 text-link',
    'btn-ghost': 'btn text-neutral-400 hover:text-link hover:bg-neutral-700/50',
    'card': 'rd-2 border border-neutral-700/50 bg-neutral-800/30',
    'input': 'w-full h-10 px-3 py-2 rd-1 border border-neutral-700 bg-neutral-800 text-sm text-main placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors duration-200 font-mono',
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block',
      },
    }),
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: 'Inter',
        mono: 'DM Mono',
      },
      extendTheme: true,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: [
    'i-mdi-console',
    'i-mdi-web',
    'i-mdi-code-string',
    'i-mdi-content-copy',
    'i-mdi-check',
    'i-mdi-menu',
    'i-mdi-menu-open',
  ],
})
