import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFmt = (v: number) =>
  new Intl.NumberFormat('fr-RW', { style: 'currency', currency: 'RWF', maximumFractionDigits: 0 }).format(v);
