'use client'

import { Button } from '@/components/ui/button'
import PageTitle from '@/components/ui/page-title'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IMovie } from '@/interfaces'
import { getAllMovies } from '@/actions/movies'
import toast from 'react-hot-toast'
import { CiEdit } from 'react-icons/ci'
import { AiOutlineDelete } from 'react-icons/ai'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

function AdminMoviesPage() {
  const [movies, setMovies] = useState<IMovie[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchMovies = async () => {
    try {
      setLoading(true)
      const response: any = await getAllMovies()

      if (!response.success) {
        throw new Error(response.message)
      }

      setMovies(response.data)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { 
    fetchMovies()
  }, [])

  const columns = [
    'Name',
    'Poster',
    'Release Date',
    'Genre',
    'Duration',
    'Actions'
  ]

  return (
    <div className='w-full flex justify-center mt-5'>
      <div className='w-full max-w-3xl'>
        <div className='flex justify-between items-center'>
          <PageTitle title='Movie List' />
          <Button>
            <Link href='/admin/movies/add'>
              Add Movie
            </Link>          
          </Button>
        </div>

        {loading && (
          <h1 className='text-center'>
            Loading...
          </h1>
        )}

        {!loading && movies.length === 0 && (
          <h1 className='text-center'>
            No movies found.
          </h1>
        )}

        {!loading && movies.length > 0 && (
          <Table className='mt-10'>
            <TableHeader className='bg-grey-4'>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column}
                    className='text-left'
                  >
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {movies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell className='font-medium'>
                    {movie.name}
                  </TableCell>
                  <TableCell>
                    <img
                      src={movie.poster_url}
                      alt={movie.name}
                      className='w-20 h-20 object-contain'
                    />
                  </TableCell>
                  <TableCell>
                    {movie.release_date}
                  </TableCell>
                  <TableCell>
                    {movie.genre}
                  </TableCell>
                  <TableCell>
                    {movie.duration}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-5'>
                      <Button
                        variant='outline'
                        size='icon'
                      >
                        <CiEdit size={15} />
                      </Button>
                      <Button
                        variant='outline'
                        size='icon'
                      >
                        <AiOutlineDelete size={15} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

export default AdminMoviesPage
