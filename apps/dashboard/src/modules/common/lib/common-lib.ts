export const hexToRgb = (hex: string): number[] => {
  const normalizedHex = hex.replace(/^#/, '');
  const r = parseInt(normalizedHex.substring(0, 2), 16);
  const g = parseInt(normalizedHex.substring(2, 4), 16);
  const b = parseInt(normalizedHex.substring(4, 6), 16);
  return [r, g, b];
};

export const darken = (hex: string, factor: number): string => {
  const [r, g, b] = hexToRgb(hex);
  const darkenedR = Math.round(r * (1 - factor));
  const darkenedG = Math.round(g * (1 - factor));
  const darkenedB = Math.round(b * (1 - factor));
  return `#${darkenedR.toString(16)}${darkenedG.toString(16)}${darkenedB.toString(16)}`;
};
