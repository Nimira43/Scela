'use client'

import { IShow } from '@/interfaces'

interface ShowFormProps {
  formType: 'add' | 'edit'
  initialValues ? : Partial<IShow>
}

function ShowForm() {
  return (
    <div className='w-full flex justify-center mt-5'>
      <div className='w-full max-w-3xl'>
        Show Form        
      </div>
    </div>
  )
}

export default ShowForm