import React from 'react'
import SearchForm from './forms/search.form'
import { cn } from '@/lib/utils'

const Search = ({ className }: { className?: string }) => {
  return (
    <div className={cn('md:flex hidden', className)}>
        <SearchForm />
    </div>
  )
}

export default Search