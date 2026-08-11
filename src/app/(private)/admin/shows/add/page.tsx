import PageTitle from '@/components/ui/page-title'
import ShowForm from '../_components/show-form'
import { getShowById } from '@/actions/shows'

interface AddShowPageProps {
  searchParams: Promise<{ showId?: string}>
}

async function AddShowPage({ searchParams}: AddShowPageProps) {
  const { showId } = await searchParams
  let initialValues: any = {}

  if (showId) {  
    let showData = await getShowById(showId)
    initialValues = showData.success ? showData.data : {}
  }

  return (
    <div>
      <PageTitle title='Add Show' />
      <ShowForm
        formType='add'
        initialValues={initialValues}
      />
    </div>
  )
}

export default AddShowPage