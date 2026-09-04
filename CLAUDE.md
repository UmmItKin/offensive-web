# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`AGENTS.md` holds the full agent guide (architecture, conventions, mobile nav). Read it — the notes below are the essentials.

## Commands

- `bun install` — deps (package manager is Bun; lockfile `bun.lock`)
- `bun dev` — dev server at `localhost:4321`
- `bun run build` — build to `./dist/`
- `bun preview` — preview build

No test, lint, typecheck, or formatter scripts exist. Don't add them unless asked.

`NODE_OPTIONS='--no-deprecation'` is baked into the `dev`/`build` scripts to silence a Vite `DEP0205` warning on Node 26 — pass it explicitly only when calling `bunx astro ...` directly.

## Architecture

Static Astro 7 site with Vue 3 interactive islands (`@astrojs/vue`) and UnoCSS. Three tool pages, dark mode only.

- `src/pages/` — `index.astro` (reverse shell tool, no redirect), `url-injection.astro`, `base64.astro`. Add a page = new `src/pages/<name>.astro` + a nav item in the `navItems` array in `Header.vue`.
- `src/components/` — `.vue` islands hydrated with `client:load` (the 3 tools + `Header.vue`); `Footer.astro` is static.
- `src/lib/payloads.ts` — payload strings live here to avoid Vue SFC compiler issues with HTML strings.
- `src/layouts/Layout.astro` — shell with `ClientRouter` (`astro:transitions`) for SPA-style `fade` page swaps; Vue re-hydrates on new `<astro-island>` elements.

## Conventions

- Vue SFCs: `<script setup lang="ts">` only, no Options API.
- Styling via UnoCSS shortcuts in `uno.config.ts` (`bg-main`, `card`, `btn`, `input`, etc.). Dark mode is hardcoded (`<html class="dark">`), no toggle.
- Icons: `i-mdi-*` classes (compile-time). Dynamically-used icons must be added to the `safelist` in `uno.config.ts`.
- Path alias `@/*` → `./src/*` (works in `.astro` and `.vue`).
- Copy-to-clipboard uses `navigator.clipboard.writeText()` directly, no toast library.
