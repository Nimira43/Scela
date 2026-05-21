import PageTitle from '@/components/ui/page-title'
import MovieForm from '../../_components/movie-form'

function EditMoviePage() {
  return (
    <div>
      <PageTitle title='Edit Movie' />
      <MovieForm formType='edit' />
    </div>
  )
}

export default EditMoviePage
