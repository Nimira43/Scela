import { getActiveMovies } from '@/actions/movies'
import InfoMessage from '@/components/functional/info-message'
import PageTitle from '@/components/ui/page-title'
import { IMovie } from '@/interfaces'
import MovieTile from './_components/movie-tile'

async function UserMovies() {
  const response: any = await getActiveMovies({})

  if (!response.success) {
    return (
      <InfoMessage message='Failed to load movies.' />
    )
  }
  
  if (response.data.length === 0) {
    return (
      <InfoMessage message='No movies found.' />
    )
  }

  const movies: IMovie[] = response.data

  return (
    <div className="w-full flex justify-center mt-5">
      <div className="w-full max-w-5xl">
      <PageTitle title='Latest Movies' />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-5'>
          {movies.map((movie: IMovie) => (
            <MovieTile
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserMovies
