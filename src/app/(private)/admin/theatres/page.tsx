'use client'

import { Button } from '@/components/ui/button'
import PageTitle from '@/components/ui/page-title'
import { useEffect, useState } from 'react'
import TheatreForm from './components/theatre-form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import toast from 'react-hot-toast'
import { CiEdit } from 'react-icons/ci'
import { AiOutlineDelete } from 'react-icons/ai'
import InfoMessage from '@/components/functional/info-message'
import Spinner from '@/components/functional/spinner'
import { ITheatre } from '@/interfaces'
import { getAllTheatres } from '@/actions/theatres'
import { deleteTheatre } from '@/actions/theatres'

function AdminTheatrePage() {
  const [openTheatreForm, setOpenTheatreForm] = useState(false)
  const [theatres, setTheatres] = useState<ITheatre[]>([])
  const [formType, setFormType] = useState<'add' | 'edit'>('add')
  const [selectedTheatre, setSelectedTheatre] = useState<Partial<ITheatre> | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchTheatres = async () => {
    try {
      setLoading(true)
      const response: any = await getAllTheatres()

      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch theatres.')
      }

      setTheatres(response.data)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleTheatreDelete = async (theatreId: string) => { 
    try {
      setLoading(true)

      const response = await deleteTheatre(theatreId)

      if (!response.success) {
        throw new Error(response.message || 'Failed to delete theatre.')
      }

      toast.success('Theatre deleted successfully.')
      fetchTheatres()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { 
      fetchTheatres()
  }, [])
  
  const columns = [
    'Name',
    'Address',
    'Capacity',
    'Actions'
  ]

  return (
    <div className='w-full flex justify-center mt-5'>
      <div className='w-full max-w-3xl'>
        <div className='flex justify-between items-center'>
          <PageTitle title='Theatres' />
          <Button
            onClick={() => {
              setOpenTheatreForm(true)
              setFormType('add')
              setSelectedTheatre(null)
            }}
          >
            Add Theatre
          </Button>
        </div>

        {loading && <Spinner />}

        {!loading && theatres.length === 0 && (
          <InfoMessage
            message='No theatres found' />
        )}
        
        {!loading && theatres.length > 0 && (
          <Table className='mt-10'>
            <TableHeader className='bg-grey-4'>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column}
                    className='text-left'
                  >
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {theatres.map((theatre: ITheatre) => (
                <TableRow key={theatre.id}>
                  <TableCell className='font-medium'>
                    {theatre.name}
                  </TableCell>
                  <TableCell>
                    {theatre.address}
                  </TableCell>
                  <TableCell>
                    {theatre.capacity}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-5'>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() => {
                          setSelectedTheatre(theatre)
                          setFormType('edit')
                          setOpenTheatreForm(true)
                        }}
                      >
                        <CiEdit size={15} />
                      </Button>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() => handleTheatreDelete(theatre.id)}
                      >
                        <AiOutlineDelete size={15} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {openTheatreForm && (
          <TheatreForm
            openTheatreForm={openTheatreForm}
            setOpenTheatreForm={setOpenTheatreForm}
            reloadData={fetchTheatres}
            formType={formType}
            selectedTheatre={selectedTheatre!}
          />
        )}

      </div>
    </div>
  )
}

export default AdminTheatrePage
