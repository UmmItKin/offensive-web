# Offensive Web — Agent Guide

## Commands

| Action            | Command                                                          |
| ----------------- | ---------------------------------------------------------------- |
| Install deps      | `bun install`                                                    |
| Dev server (4321) | `bun dev`                                                        |
| Build (./dist/)   | `bun run build`                                                  |
| Preview build     | `bun preview`                                                    |

`NODE_OPTIONS='--no-deprecation'` suppresses Node 26 `DEP0205` `module.register()` warning from Vite. Already set in the `dev` / `build` npm scripts in `package.json` — pass it explicitly only if invoking `bunx astro ...` directly.

No test, lint, typecheck, or formatter scripts exist. Do not create them unless asked.

## Stack

- **Astro 7** (static site) + **Vue 3** (interactive islands via `@astrojs/vue`)
- **UnoCSS** (`@unocss/astro`) with presetWind3 + presetIcons + presetWebFonts
- **Package manager**: Bun. Lockfile is `bun.lock`.

## Architecture

```
src/
  components/      *.vue (interactive) + *.astro (static)
  layouts/         Layout.astro — shell with ClientRouter + fade transition
  lib/             payloads.ts  (avoids Vue SFC compiler issues with HTML strings)
  pages/           3 pages: / (reverse shell), +/url-injection, +/base64
  styles/          global.css — bg-dot pattern, font imports, view-transition overrides
```

- **Route**: `index.astro` is the reverse shell tool at `/` (renders `ReverseShellGenerator` directly — no redirect). Add a new page by creating `src/pages/<name>.astro` + adding a nav item in `Header.vue` (`navItems` array).
- **Vue islands** use `client:load` for hydration. Only the 3 tool components and the Header are Vue; Footer is plain Astro.
- **ClientRouter** from `astro:transitions` is active — nav clicks trigger SPA-style page swaps with `fade` animation. Vue re-hydrates automatically on new `<astro-island>` elements.

## Key Conventions

- **UnoCSS shortcuts** (defined in `uno.config.ts`):
  `bg-main` (`#0d1117`), `text-main` (`#bbbbbb`), `text-link` (`#ffffff`),
  `text-title` (`text-link text-4xl font-800`), `border-main` (`border-neutral-600`),
  `nav-link`, `btn`, `btn-primary`, `btn-ghost`, `card` (`bg-hex-161b22`), `input`.
- **Dark mode only** — `<html class="dark">` hardcoded in Layout.astro, no toggle.
- **Icons**: `i-mdi-*` class syntax (compile-time via `presetIcons`). Any icon used dynamically must be added to the `safelist` array in `uno.config.ts`.
- **Copy-to-clipboard**: `navigator.clipboard.writeText()` directly, no toast library.
- **Vue SFCs**: `<script setup lang="ts">`. No Options API.
- **Fonts**: Inter + DM Mono via `@fontsource` packages, loaded in `global.css`.
- **Color palette**: `#0d1117` (bg), `#161b22` (code blocks/cards), `#bbbbbb` (body text), `#ffffff` (links/titles).
- **Path alias**: `@/*` → `./src/*` (works in `.astro` and `.vue` files).

## Mobile Nav

Header uses Vue with a right-side drawer (`sm:hidden` burger icon). Transitions use scoped CSS classes `.fade-*` and `.slide-*`.
