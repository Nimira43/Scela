import { IMovie } from '@/interfaces'

function MovieTile({ movie }: { movie: IMovie }) {
  return (
    <div className='border border-grey-4 rounded shadow-md p-3'>
      <img
        src={movie.poster_url || 'https://via.placeholder.com/150'}
        alt='Movie' />
    </div>
  )
}

export default MovieTile
