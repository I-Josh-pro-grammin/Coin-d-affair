import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFmt = (v: number) =>
  new Intl.NumberFormat('fr-BI', { style: 'currency', currency: 'BIF', maximumFractionDigits: 0 }).format(v);

// Resolve image source from multiple possible shapes used in API responses or local mocks.
export function resolveImageSource(src: any): string {
  if (!src) return '/placeholder.svg';
  try {
    if (typeof src === 'string') return src;
    // If it's an array (e.g., media or images)
    if (Array.isArray(src) && src.length) return resolveImageSource(src[0]);
    // If it's a media object
    if (typeof src === 'object') {
      if ('url' in src && src.url) return String(src.url);
      if ('cover_image' in src && src.cover_image) return String(src.cover_image);
      if ('image_url' in src && src.image_url) return String(src.image_url);
      if ('media' in src && Array.isArray(src.media) && src.media.length) return resolveImageSource(src.media[0]);
    }
  } catch (e) {
    // fallthrough to placeholder
  }
  return '/placeholder.svg';
}
