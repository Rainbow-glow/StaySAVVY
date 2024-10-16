import React, { PropsWithChildren } from 'react'
import Sidebar from './components/sidebar'
// import { currentUser } from '@clerk/nextjs/server'
// import { redirect } from 'next/navigation'

const Layout = async ({ children }: PropsWithChildren) => {
  // const user = await currentUser()

  // // if (user?.publicMetadata?.role !== 'admin')
  // //   return redirect('/')

  return (
    <div className='flex flex-col w-full h-full bg-gray-100 min-h-screen'>
      <Sidebar />
      <main className='md:ml-[180px] px-4 py-8 w-full'>
        {children}
      </main>
    </div>
  )
}

export default Layout