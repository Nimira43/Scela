import { Button } from '@/components/ui/button'
import PageTitle from '@/components/ui/page-title'
import Link from 'next/link'

function AdminMoviesPage() {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <PageTitle title='Movie List' />
        <Button>
          <Link href='/admin/movies/add'>
            Add Movie
          </Link>          
        </Button>
      </div>
    </div>
  )
}

export default AdminMoviesPage
