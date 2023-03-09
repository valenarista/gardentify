export const capitalize = (string: string): string => {
  if (string.length === 0) return '';
  return string.charAt(0).toUpperCase().concat(string.substring(1).toLowerCase());
};
