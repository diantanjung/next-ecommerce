import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const round2 = (value: number | string) => {
  if (typeof value === 'number') {
    return Math.round((value + Number.EPSILON) * 100) / 100 // avoid rounding errors
  } else if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100
  } else {
    throw new Error('value is not a number nor a string')
  }
}