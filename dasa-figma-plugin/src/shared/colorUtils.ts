export function rgbToHex(color: { r: number; g: number; b: number }): string {
  const r = Math.round(color.r * 255).toString(16).padStart(2, '0');
  const g = Math.round(color.g * 255).toString(16).padStart(2, '0');
  const b = Math.round(color.b * 255).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`.toUpperCase();
}

/** Normalize to 6-char hex for consistent lookup (#FFF -> #FFFFFF). */
export function normalizeHex6(hex: string): string {
  let h = hex.replace('#', '').toUpperCase();
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  return h.length === 6 ? '#' + h : hex;
}

export function hexKey(hex: string): string {
  return normalizeHex6(hex).replace('#', '');
}
