'use client'

import { LucideSearch } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import Link from 'next/link';
import { searchRooms } from '@/actions/search.actions';
import useDebounce from '@/lib/useDebounce';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [rooms, setRooms] = useState<any[]>([]);
  // const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // useEffect(() => {
  //   if (debouncedSearchTerm) {
  //     const fetchRooms = async () => {
  //       const results = await searchRooms({ query: debouncedSearchTerm });
  //       setRooms(results);
  //     };
  //     fetchRooms();
  //   } else {
  //     setRooms([]);
  //   }
  // }, [debouncedSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <form className='flex items-center gap-x-1 rounded-xl bg-secondary w-full px-1.5'>
        <LucideSearch className='text-muted-foreground' />
        <Input 
          className='bg-transparent focus:outline-none border-none ring-none'
          placeholder='Search for Rooms...'
          onChange={handleInputChange}
          value={searchTerm}
        />
      </form>
    </>
  );
};

export default SearchForm;
