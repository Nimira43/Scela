'use client'

import { formatDate } from '@/helpers/date-time-formats'
import { IMovie } from '@/interfaces'
import { useRouter } from 'next/navigation'

function MovieTile({ movie }: { movie: IMovie }) {
  const router = useRouter()

  return (
    <div
      className='border border-grey-4 rounded shadow-md p-3 hover:border-primary transitioning cursor-pointer'
      onClick={() => router.push(`/user/movies/${movie.id}`)}
    >
      <img
        className='w-full h-72 object-cover rounded p-3'
        src={movie.poster_url || 'https://via.placeholder.com/150'}
        alt='Movie' />
      <h1 className='text-lg font-medium text-primary px-3'>
        {movie.name}
      </h1>
      <p className='text-sm px-3 mt-3'>
        {movie.description}
      </p>
      <hr className='my-3 border-primary' />
      <h1 className='px-3 text-sm font-medium'>
        Release Date: {formatDate(movie.release_date)}
      </h1>
      <h1 className='px-3 text-sm font-medium'>
        Genre: {movie.genre}
      </h1>
    </div>
  )
}

export default MovieTile
