import { CONTRAST_RATIO_NORMAL, CONTRAST_RATIO_LARGE } from '../shared/constants';

interface RGB { r: number; g: number; b: number }

export function hexToRgb(hex: string): RGB | null {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return null;
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}

function luminance(rgb: RGB): number {
  const [rs, gs, bs] = [rgb.r, rgb.g, rgb.b].map(v => {
    v = v / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(c1: RGB, c2: RGB): number {
  const l1 = luminance(c1);
  const l2 = luminance(c2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export function meetsWCAGAAFromHex(
  fgHex: string,
  bgHex: string,
  fontSize?: number,
): { meets: boolean; ratio: number; required: number; level: 'normal' | 'large' } | null {
  const fg = hexToRgb(fgHex);
  const bg = hexToRgb(bgHex);
  if (!fg || !bg) return null;

  const ratio = getContrastRatio(fg, bg);
  const isLarge = fontSize !== undefined && fontSize >= 18;
  const required = isLarge ? CONTRAST_RATIO_LARGE : CONTRAST_RATIO_NORMAL;

  return { meets: ratio >= required, ratio, required, level: isLarge ? 'large' : 'normal' };
}
