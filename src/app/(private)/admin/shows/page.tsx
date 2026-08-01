import { Button } from '@/components/ui/button'
import PageTitle from '@/components/ui/page-title'
import Link from 'next/link'

function AdminShowsPage() {
  return (
    <div className='w-full flex justify-center mt-5'>
      <div className='w-full max-w-3xl'>
         <div className='flex justify-between items-center'>
          <PageTitle title='Shows' />
          <Button>
            <Link href='/admin/shows/add'>
              Add Show
            </Link>          
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AdminShowsPage
