import Navbar from '@/components/navbar'
import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='w-full'>
        <Navbar />
        <div className='flex flex-col gap-y-3'>
            { children }
        </div>
    </div>
  )
}

export default Layout