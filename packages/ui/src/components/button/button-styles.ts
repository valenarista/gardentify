import { AvaiableSizeVariants, AvailableColorSchemes } from './button';

export const BUTTON_SIZES: AvaiableSizeVariants = {
  xs: 'text-xs px-2.5 py-1.5 rounded',
  sm: 'text-sm px-3 py-2 leading-4 rounded',
  base: 'text-sm px-4 py-2 rounded',
  lg: 'text-base px-4 py-2 rounded-md',
  xl: 'text-lg px-6 py-3 rounded-md',
  '2xl': 'text-xl px-8 py-3 md:py-4 md:text-2xl md:px-8 rounded-lg',
};

export const BUTTON_COLOR_SCHEMES: AvailableColorSchemes = {
  secondary: {
    outline:
      'border-4 border-secondary-300 dark:border-secondary-600 hover:bg-secondary-400 hover:border-secondary-400 focus-visible:ring-secondary-300 dark:hover:bg-secondary-600 dark:focus-visible:ring-secondary-500',
    solid:
      'bg-secondary-300 hover:bg-secondary-400 focus-visible:ring-secondary-300 dark:bg-secondary-700 dark:hover:bg-secondary-900',
    ghost: 'hover:bg-secondary-400 focus-visible:ring-secondary-300 dark:hover:bg-secondary-900',
  },
  primary: {
    outline:
      'border-4 border-primary-300 dark:border-primary-600 hover:bg-primary-400 hover:border-primary-400 focus-visible:ring-primary-300 dark:hover:bg-primary-600 dark:focus-visible:ring-primary-500',
    solid:
      'bg-primary-300 hover:bg-primary-400 focus-visible:ring-primary-300 dark:bg-primary-700 dark:hover:bg-primary-900',
    ghost: 'hover:bg-primary-400 focus-visible:ring-primary-300 dark:hover:bg-primary-900',
  },
  danger: {
    outline:
      'border-4 border-red-300 dark:border-red-600 hover:bg-red-400 hover:border-red-400 focus-visible:ring-red-300 dark:hover:bg-red-600 dark:focus-visible:ring-red-500',
    solid: 'bg-red-300 hover:bg-red-400 focus-visible:ring-red-300 dark:bg-red-700 dark:hover:bg-red-900',
    ghost: 'hover:bg-red-400 focus-visible:ring-red-300 dark:hover:bg-red-900',
  },
};

export const BUTTON_BASE_STYLES: string =
  'inline-flex appearance-none items-center justify-center relative whitespace-nowrap align-middle rounded-lg font-medium focus-visible:outline-none focus-visible:ring-4 transition-colors text-neutral-900 dark:text-neutral-50 disabled:cursor-not-allowed';
