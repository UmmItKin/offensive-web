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

- **Astro 6** static site with **React 19** interactive islands. Pages live in `src/pages/*.astro`, components in `src/components/`.
- **Routing**: `/` → redirect to `/reverse-shell`. Three pages: `/reverse-shell`, `/url-injection`, `/base64`.
- **Sidebar** (`SidebarLayout.tsx`) wraps every page. To add a page, create the `.astro` route and add a nav item to `SidebarLayout`.
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no `tailwind.config.*`). Dark mode enforced globally (`<html class="dark">`), no toggle.
- **ShadCN UI** (new-york style, RSC off). Components in `src/components/ui/`. Config in `components.json`.
- **Path alias**: `@/*` maps to `./src/*` (works in both `.astro` and `.tsx`).
- **Package manager**: Bun.

## Conventions

- New ShadCN components: `bunx shadcn@latest add <component>`.
- Icons: prefer `@iconify/react` (Iconify) with `icon={}` prop; Lucide also available.
- Astro frontmatter blocks use standard Astro patterns (no special framework config).
- `sonner` for toast notifications.
