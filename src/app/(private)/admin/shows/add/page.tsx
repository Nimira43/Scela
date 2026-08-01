import PageTitle from '@/components/ui/page-title'
import ShowForm from '../_components/show-form'

function AddShowPage() {
  return (
    <div>
      <PageTitle title='Add Show' />
      <ShowForm formType='add' />
    </div>
  )
}

export default AddShowPage