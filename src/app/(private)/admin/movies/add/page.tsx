import PageTitle from '@/components/ui/page-title'
import MovieForm from '../_components/movie-form'

function AddMoviePage() {
  return (
    <div>
      <PageTitle title='Add Movie' />
      <MovieForm formType='add' />
    </div>
  )
}

export default AddMoviePage
