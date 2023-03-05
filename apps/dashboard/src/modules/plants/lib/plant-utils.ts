import { darken, hexToRgb } from '@modules/common/lib/common-lib';
import { PlantType } from '@modules/graphql/@generated/graphql';
import { ThemeType } from '@modules/theme/context/theme-context';

export const BASE_PLANT_TYPE_COLORS: { [key in PlantType]: string } = {
  BEAN: '#a8e6cf',
  BEET: '#dcedc1',
  BROCCOLI: '#ffeaad',
  CABBAGE: '#ffc6c7',
  CARROT: '#c3aed6',
  CELERY: '#f2a1a1',
  CORN: '#c8d6e5',
  CUCUMBER: '#f7ede2',
  EGGPLANT: '#c4b8e7',
  GARLIC: '#9ac48a',
  GINGER: '#e0c0a3',
  GREEN_BEAN: '#d7d7a2',
  KALE: '#c1b1d1',
  LETTUCE: '#b5e7a0',
  MUSTARD: '#f9d5e5',
  NONE: '#ffffff',
  ONION: '#f1c5c5',
  PEA: '#d2e9be',
  PEPPER: '#ffc8b2',
  POTATO: '#c0b1a7',
  SQUASH: '#ffe082',
  TOMATO: '#b2dbd5',
  WATERMELON: '#fcbad3',
};

export const generatePlantColors = (theme: ThemeType, alpha = 1) => {
  const colors = {} as Record<string, string>;

  Object.entries(BASE_PLANT_TYPE_COLORS).forEach(([key, value]) => {
    colors[key] =
      theme === 'dark'
        ? `rgba(${hexToRgb(value).join(',')}, ${alpha})`
        : `rgba(${hexToRgb(darken(value, 0.25)).join(',')}, ${alpha})`;
  });

  return colors;
};
