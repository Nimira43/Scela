'use client'

import { Button } from '@/components/ui/button'
import PageTitle from '@/components/ui/page-title'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IShow } from '@/interfaces'
import { deleteShow, getAllShows } from '@/actions/shows'
import toast from 'react-hot-toast'
import { CiEdit } from 'react-icons/ci'
import { AiOutlineDelete } from 'react-icons/ai'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import InfoMessage from '@/components/functional/info-message'
import Spinner from '@/components/functional/spinner'
import { useRouter } from 'next/navigation'
import { formatDate, formatTime } from '@/helpers/date-time-formats'
import { LiaClone } from 'react-icons/lia'

function AdminShowsPage() {
  const [shows, setShows] = useState<IShow[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  const fetchShows = async () => {
    try {
      setLoading(true)
      const response: any = await getAllShows()

      if (!response.success) {
        throw new Error(response.message)
      }

      setShows(response.data)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteShow = async (showId: string) => { 
    try {
      setLoading(true)
      const response = await deleteShow(showId)

      if (!response.success) {
        throw new Error(response.message)
      }

      toast.success('Show deleted successfully.')
      fetchShows()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { 
    fetchShows()
  }, [])

  const columns = [
    'Movie',
    'Theatre',
    'Date',
    'Time',
    'Ticket Price',
    'Available Seats',
    'Actions'
  ]

  return (
    <div className='w-full flex justify-center mt-5'>
      <div className='w-full max-w-3xl'>
        <div className='flex justify-between items-center'>
          <PageTitle title='Show List' />
          <Button>
            <Link href='/admin/shows/add'>
              Add Show
            </Link>          
          </Button>
        </div>

        {loading && <Spinner />}

        {!loading && shows.length === 0 && (
          <InfoMessage
            message='No shows found' />
        )}

        {!loading && shows.length > 0 && (
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
              {shows.map((show: IShow) => (
                <TableRow key={show.id}>
                  <TableCell className='font-medium'>
                    {show.movie.name}
                  </TableCell>
                  <TableCell>
                    {show.theatre.name}
                  </TableCell>
                  <TableCell>
                    {formatDate(show.date)}
                  </TableCell>
                  <TableCell>
                    {formatTime(show.time)}
                  </TableCell>
                  <TableCell>
                    £{show.ticket_price.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {show.available_seats_count}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-5'>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() => router.push(`/admin/shows/edit/${show.id}`)}
                      >
                        <CiEdit size={15} />
                      </Button>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() => router.push(`/admin/shows/add/?showId=${show.id}`)}
                      >
                        <LiaClone size={15} />
                      </Button>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() => handleDeleteShow(show.id)}
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
      </div>
    </div>
  )
}

export default AdminShowsPage