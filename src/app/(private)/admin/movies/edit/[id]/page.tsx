import PageTitle from '@/components/ui/page-title'
import MovieForm from '../../_components/movie-form'
import { getMovieById } from '@/actions/movies'
import InfoMessage from '@/components/functional/info-message'

interface EditMoviePageProps { 
  params: Promise<{id: string}>
}

async function EditMoviePage({ params }: EditMoviePageProps) {
  const { id } = await params
  const movieResponse = await getMovieById(id)  

  if (!movieResponse.success) {
    return (
      <InfoMessage message={movieResponse.message!} />
    )
  }

  const movie = movieResponse.data

  return (
    <div>
      <PageTitle title='Edit Movie' />
      <MovieForm
        formType='edit'
        initialValues={movie}
      />
    </div>
  )
}

export default EditMoviePage
