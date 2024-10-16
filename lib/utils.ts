import { clsx, type ClassValue } from "clsx"
import { Book, Home, Settings2, Sidebar } from "lucide-react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNigerianNaira = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
  }).format(amount);
};

export const formatCurrency = ({amount, currency, lang}:{amount: number, currency: string, lang: string}): string => {
  return new Intl.NumberFormat(lang, {
      style: 'currency',
      currency,
  }).format(amount)
}

export const navLinks = [
  {
    label: "Home",
    icon: Home,
    path: '/admin',
  },
  {
    label: "Bookings",
    icon: Sidebar,
    path: '/admin/bookings',
  },
  {
    label: "Rooms",
    icon: Book,
    path: '/admin/rooms',
  },
  {
    label: "Settings",
    icon: Settings2,
    path: '/admin/settings',
  },
]