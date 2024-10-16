'use client'

import { cn, navLinks } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const currentPath = usePathname()
  return (
      <div className='h-screen md:flex flex-col bg-primary text-gray-50 p-2 lg:p-2.5 px-4 hidden w-[180px] custom-scrollbar justify-between z-20 overflow-hidden left-0 bottom-0 fixed'>
          <div className="flex flex-col gap-y-10">
              <Link href={'/'} className='text-accent text-2xl font-semibold py-5 italic'>StaySavvy</Link>

              <nav className='flex flex-col gap-y-8'>
                  {
                    navLinks.map((link, index) => (
                        <Link className={'flex items-center gap-x-1.5'} key={index} href={link.path}>
                          <link.icon className={cn(link.path === currentPath && 'text-sky-600')} size={26} />
                          <span>{link.label}</span>
                        </Link>
                    ))
                  }
              </nav>
          </div>

          <footer className="p-2 lg:p-2.5 flex gap-3 flex-col">
            <UserButton />
          </footer>
      </div>
  )
}

export default Sidebar