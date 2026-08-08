import PageTitle from '@/components/ui/page-title'
import ShowForm from '../../_components/show-form'
import InfoMessage from '@/components/functional/info-message'
import { getShowById } from '@/actions/shows'

interface EditShowPageProps { 
  params: Promise<{id: string}>
}

async function EditShowPage({ params }: EditShowPageProps) {
  const { id } = await params
  const response = await getShowById(id)  

  if (!response.success) {
    return (
      <InfoMessage message={response.message!} />
    )
  }

  const initialValues = response.data
  return (
    <div>
      <PageTitle title='Edit Show' />
      <ShowForm
        formType='edit'
        initialValues={initialValues}
      />
    </div>
  )
}

export default EditShowPage
