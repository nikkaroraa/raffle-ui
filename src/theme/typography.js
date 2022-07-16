import rem from 'utils/rem'

export const typography = {
  fonts: {
    heading: '"Open Sans", sans-serif',
    body: '"Open Sans", sans-serif',
    mono: '"IBM Plex Mono", monospace',
  },
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    smd: rem(15),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
    '2xl': rem(24),
    '3xl': rem(28),
    '4xl': rem(36),
    '5xl': rem(48),
    '6xl': rem(64),
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 600,
    bold: 700,
    black: 800,
  },
  lineHeights: {
    normal: 'normal',
    none: '1',
    shorter: '1.25',
    short: '1.375',
    base: '1.5',
    tall: '1.625',
    taller: '2',
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    narrow: '0.1px',
    wide: '0.04em',
    wider: '0.08em',
    widest: '0.1em',
    wildest: '0.125em',
  },
}
