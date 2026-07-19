'use client'

import { Button } from '@/components/ui/button'
import PageTitle from '@/components/ui/page-title'
import { useState } from 'react'
import TheatreForm from './components/theatre-form'

function AdminTheatrePage() {
  const [openTheatreForm, setOpenTheatreForm] = useState(false)

  return (
    <div className='w-full flex justify-center mt-5'>
      <div className='w-full max-w-3xl'>
        <div className='flex justify-between items-center'>
          <PageTitle title='Theatres' />
          <Button
            onClick={
              () => setOpenTheatreForm(true)
            }
          >
            Add Theatre
          </Button>
        </div>
        {openTheatreForm && (
          <TheatreForm
            openTheatreForm={openTheatreForm}
            setOpenTheatreForm={setOpenTheatreForm}
            reloadData={() => { }}
            formType='add'
          />
        )}
      </div>
    </div>
  )
}

export default AdminTheatrePage
