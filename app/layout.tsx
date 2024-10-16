import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'
import QueryProvider from "@/providers/query-provider";

export const metadat: Metadata = {
  title: 'Stay savvy XP'
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600']
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(`antialiased min-h-screen w-full`, inter.className)}
        >
          <QueryProvider>
            { children }
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
