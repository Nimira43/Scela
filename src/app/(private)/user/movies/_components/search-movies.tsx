'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function SearchMovies() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const router = useRouter()

  const handleSearch = () => {
    router.push(`/user/movies?search=${searchTerm}`)
  }

  return (
    <div className='flex gap-5 mt-5'>
      <Input
        className='h-14'
        placeholder='Search movies...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type='text'  
      />
      <Button
        className='h-14'
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  )
}

export default SearchMovies
