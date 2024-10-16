import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import Search from './search'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'

const Navbar = () => {
  return (
    <div className='flex fixed w-full top-0 right-0 left-0 z-10 md:h-20 h-16 items-center justify-center bg-white/80 dark:bg-gray-900/80 shadow-sm border-b backdrop-blur-md md:px-8'>
      <div className='flex flex-row items-center justify-between p-3 w-full'>
        <Link href="/" className='text-primary font-semibold text-2xl'>StaySavvy</Link>

        <div className='flex items-center gap-x-5'>
            <Link href={'/admin'} className={cn(buttonVariants({ variant: "secondary" }), 'rounded-full')}>Admin</Link>
            <Search />
            <UserButton />
        </div>
      </div>
    </div>
  )
}

export default Navbar