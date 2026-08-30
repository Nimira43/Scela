'use client'

import { useParams } from 'next/navigation'
import { getMovieById } from '@/actions/movies'
import Spinner from '@/components/functional/spinner'
import { useEffect, useState } from 'react'
import { IMovie } from '@/interfaces'
import InfoMessage from '@/components/functional/info-message'
import PageTitle from '@/components/ui/page-title'
import dayjs from 'dayjs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function MovieTheatresAndShowsPage() {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState<IMovie | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [date, setDate] = useState<string>(dayjs().format('DD MMMM YYYY'))
  const [selectedTheatre, setSelectedTheatre] = useState<string | null>(null)
  const [selectedShow, setSelectedShow] = useState<string | null>(null)
  
  const fetchMovie = async () => {
    setLoading(true)
    setError(null)

    try {
      const movieData: any = await getMovieById(params.id as string)
      
      if (!movieData.success) {
        throw new Error(movieData.message || 'Failed to fetch movie data.')
      }

      setMovie(movieData.data)
    } catch (err) {
      setError('Failed to fetch movie details.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovie()
  }, [params.id])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <InfoMessage message={error} />
  }

  return (
    <div className='w-full flex justify-center mt-5'>
      <div className='w-full max-w-5xl flex flex-col gap-4 p-4'>
        <PageTitle title={movie?.name!} />
        <div className='flex justify-between items-center'>
          <div className='flex flex-col gap-1'>
            <span className='text-sm'>
              Select Date
            </span>
            <Input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <Button disabled={!selectedTheatre || !selectedShow}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MovieTheatresAndShowsPage
