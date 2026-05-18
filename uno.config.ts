import { defineConfig, presetWind } from 'unocss'

export default defineConfig({
  presets: [presetWind()],
  theme: {
    colors: {
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      card: 'var(--card)',
      'card-foreground': 'var(--card-foreground)',
      primary: 'var(--primary)',
      'primary-foreground': 'var(--primary-foreground)',
      secondary: 'var(--secondary)',
      'secondary-foreground': 'var(--secondary-foreground)',
      muted: 'var(--muted)',
      'muted-foreground': 'var(--muted-foreground)',
      accent: 'var(--accent)',
      'accent-foreground': 'var(--accent-foreground)',
      destructive: 'var(--destructive)',
      border: 'var(--border)',
      input: 'var(--input)',
      ring: 'var(--ring)',
      sidebar: 'var(--sidebar)',
      'sidebar-foreground': 'var(--sidebar-foreground)',
      'sidebar-primary': 'var(--sidebar-primary)',
      'sidebar-primary-foreground': 'var(--sidebar-primary-foreground)',
      'sidebar-accent': 'var(--sidebar-accent)',
      'sidebar-accent-foreground': 'var(--sidebar-accent-foreground)',
      'sidebar-border': 'var(--sidebar-border)',
      'sidebar-ring': 'var(--sidebar-ring)',
    },
    borderRadius: {
      sm: 'calc(var(--radius) - 4px)',
      md: 'calc(var(--radius) - 2px)',
      lg: 'var(--radius)',
      xl: 'calc(var(--radius) + 4px)',
    },
  },
  shortcuts: {
    'ring-offset-background': 'ring-offset-[var(--background)]',
  },
})
