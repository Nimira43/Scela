import { getActiveMovies } from '@/actions/movies'
import InfoMessage from '@/components/functional/info-message'
import { IMovie } from '@/interfaces'

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

  const movie: IMovie[] = response.data

  return (
    <div>
      User Movies
    </div>
  )
}

export default UserMovies
