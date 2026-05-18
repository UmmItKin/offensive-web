# Offensive Web — Agent Guide

## Commands

| Action              | Command          |
| ------------------- | ---------------- |
| Install deps        | `bun install`    |
| Dev server (4321)   | `bun dev`        |
| Build (./dist/)     | `bun build`      |
| Preview build       | `bun preview`    |

No test, lint, typecheck, or formatter scripts exist. No ESLint, Prettier, or testing framework is configured.

**Note**: `bun dev` uses `NODE_OPTIONS='--no-deprecation'` to suppress the Node 26 `DEP0205` `module.register()` warning emitted by Vite. This is harmless and will be removed once Vite upstream fixes it.

## Architecture

- **Astro 6** static site with **Vue 3** interactive islands via `@astrojs/vue`. Pages live in `src/pages/*.astro`, components in `src/components/*.vue`.
- **Routing**: `/` → redirect to `/reverse-shell`. Three pages: `/reverse-shell`, `/url-injection`, `/base64`.
- **Sidebar** (`SidebarLayout.vue`) wraps every page. To add a page, create the `.astro` route and add a nav item to `SidebarLayout`.
- **UnoCSS** via `@unocss/astro` (configured in `uno.config.ts`). Dark mode enforced globally (`<html class="dark">`), no toggle.
- Custom UI (no framework like ShadCN). Copy button, tabs, and card-like containers are hand-rolled UnoCSS.
- **Path alias**: `@/*` maps to `./src/*` (works in both `.astro` and `.vue`).
- **Package manager**: Bun.
- **Icons**: `@iconify/vue` with `<Icon icon="mdi:..." />`.

## Conventions

- Vue 3 SFCs with `<script setup lang="ts">`. No Options API.
- Payload data lives in `src/lib/payloads.ts` to avoid Vue SFC compiler issues with HTML-like strings.
- Copy-to-clipboard uses `navigator.clipboard.writeText()` directly (no toast library).
- Astro frontmatter blocks use standard Astro patterns.
