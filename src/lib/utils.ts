import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}

export function renderStars(rating: number): string {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}

export function generateId(): string {
  return `ORD-${Date.now().toString().slice(-6)}`
}
