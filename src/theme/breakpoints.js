import { createBreakpoints } from '@chakra-ui/theme-tools'

import em from 'utils/em'

export const breakpointsConfig = {
  sm: em(576),
  md: em(768),
  lg: em(1024),
  xl: em(1280),
  '2xl': em(1536),
  '3xl': em(1760),
}

export const breakpoints = createBreakpoints(breakpointsConfig)

export const fontSizes = {
  base: '13px',
  sm: '14px',
  md: '15px',
  lg: '16px',
}
