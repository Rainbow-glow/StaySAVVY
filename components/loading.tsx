import { LucideLoader } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='w-full h-full flex items-center justify-center z-10'>
        <LucideLoader className='animate-spin' />
    </div>
  )
}

export default Loader