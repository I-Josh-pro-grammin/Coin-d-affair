import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFmt = (v: number) =>
  new Intl.NumberFormat('fr-BI', { style: 'currency', currency: 'BIF', maximumFractionDigits: 0 }).format(v);
