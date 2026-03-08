export const decodeLabel = (label: string) =>
  label
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
