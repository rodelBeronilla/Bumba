export const theme = {
  colors: {
    ink: '#0b0d12',
    slate1: '#11141b',
    slate2: '#171c26',
    text: '#e7ecf3',
    textMuted: '#8a93a4',
    accent: '#f59e0b',
    accentSoft: '#fbbf24',
    good: '#22c55e',
    warn: '#ef4444',
    info: '#38bdf8',
    ring: '#1f2937',
  },
  gradient: {
    from: '#0b0d12',
    via: '#11141b',
    to: '#0b0d12',
  },
} as const;

export type Theme = typeof theme;
