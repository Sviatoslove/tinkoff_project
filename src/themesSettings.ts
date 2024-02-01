import { StyleFunctionProps, defineStyleConfig } from '@chakra-ui/react';

export const config = {
  config: { useSystemColorMode: false, initialColorMode: 'light' },
};

export const colors = {
  colorBadgeUser: { dark: '#398f7a7a', light: 'yellow' },
  colorBadgeCounts: { dark: '#727844', light: '#00ffff' },
  colorBadgeChartAll: { dark: '#4e2a24', light: '#a9a958' },
  colorBadgeChartCategories: { dark: '#352935', light: '#5ab2b2' },
  colorBadgeSkeletton: { dark: 'grey', light: '#2828281a' },
  colorBtnAddOperation: { dark: '#074b07', light: '#52cf52' },
  colorBtnTopUpCount: { dark: '#3f0514', light: '#cd748c' },
  colorBtnAddTranslate: { dark: '#080736', light: '#7876e1' },
};

export const shadows = {
  forContainersWhite:
    '2px 2px 4px 0px rgb(255 255 255), 1px 1px 4px 2px rgb(251 251 251)',
  whiteAndLightBlue:
    '2px 2px 4px 0px rgb(255 255 255), 1px 1px 4px 2px rgb(178 218 221)',
};

export const breakpoints = {
  base: '0px',
  sm: '320px',
  '1sm': '628px',
   '2sm': '672px',
  md: '768px',
  '2md': '815px',
  lg: '960px',
  '2lg': '1048px',
  xl: '1200px',
  '2xl': '1536px',
};

const FlexBadge = defineStyleConfig({
  baseStyle: {
    display: 'flex',
    p: '10px',
    mt: 2,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    user: function (props: StyleFunctionProps) {
      return {
        bg: colors.colorBadgeUser[props.colorMode],
        maxW: '277px',
        p:{base: '6px 3px' , '2sm': '10px'}
      };
    },
    counts: function (props: StyleFunctionProps) {
      return {
        bg: colors.colorBadgeCounts[props.colorMode],
        ml: 2,
        flexDirection: 'column',
      };
    },
    chartAll: function (props: StyleFunctionProps) {
      return {
        bg: colors.colorBadgeChartAll[props.colorMode],
        ml: { base: 2, '2md': 0, '2lg': 2 },
        maxW: '277px',
        minW: {base: '100px', '2sm':'277px'},
      };
    },
    chartCategory: function (props: StyleFunctionProps) {
      return {
        bg: colors.colorBadgeChartCategories[props.colorMode],
        ml: 2,
      };
    },
  },
});

export const components = {
  FlexBadge,
  Badge: {
    baseStyle: {
      borderRadius: '10px',
      margin: '10px 10px 0px 0',
      w: 'fit-content',
      px: '10px',
      display: 'flex',
    },
    variants: {
      activeCategory: {
        boxShadow:
          '0px 0px 0px 4px rgb(255 219 0 / 62%), 0px 0px 4px 3px rgb(0 255 10)',
      },
      category: {
        boxShadow:
          '0px 0px 8px 2px rgb(0 0 0), 0px 0px 8px 6px rgb(255 255 255)',
      },
    },
  },
};
