'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { IMovie, ITheatre, IShow } from '@/interfaces'
import { getAllMovies } from '@/actions/movies'
import { getAllTheatres } from '@/actions/theatres'
import { addShow, updateShow } from '@/actions/shows'
import { Button } from '@/components/ui/button'

interface ShowFormProps {
  formType: 'add' | 'edit'
  initialValues ? : Partial<IShow>
}

const showFormSchema: any = z.object({
  movie_id: z.string().min(1, 'Movie is required.'),
  theatre_id: z.string().min(1, 'Theatre is required.'),
  time: z.string().min(1, 'Time is required.'),
  date: z.string().min(1, 'Date is required.'),
  ticket_price: z.number().min(1, 'Ticket price is required.'),
})

function ShowForm({
  formType,
  initialValues
}: ShowFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState<IMovie[]>([])
  const [theatres, setTheatres] = useState<ITheatre[]>([])
  const [fetchingData, setFetchingData] = useState(false)

  const fetchData = async () => {
    try {
      setFetchingData(true) 
      const [moviesResponse, theatresResponse] = await Promise.all([
        getAllMovies(),
        getAllTheatres()
      ])

      if (!moviesResponse.success || !theatresResponse.success) {
        throw new Error(
          moviesResponse.message || theatresResponse.message || 'Fail to fetch data.'
        )
      }

      setMovies(moviesResponse.data || [])
      setTheatres(theatresResponse.data || [])
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong.')
    } finally {
      setFetchingData(false)
    }
  }
  
  const form = useForm<z.infer<typeof showFormSchema>>({
    resolver: zodResolver(showFormSchema),
    defaultValues: {
      movie_id: initialValues?.movie_id?.toString() || '',
      theatre_id: initialValues?.theatre_id?.toString() || '',
      time: initialValues?.time || '',
      date: initialValues?.date || '',
      ticket_price: initialValues?.ticket_price || ''
    }
  })

  async function onSubmit(values: z.infer<typeof showFormSchema>) {
    try {
      setLoading(true)
      let response = null

      if (formType === 'add') {
        const theatre = theatres.find(
          (theatre) => theatre.id.toString() === values.theatre_id
        )
        values.available_seats_count = theatre?.capacity || 0 
        values.booked_seats = []
        response = await addShow(values)
      } else if (formType === 'edit') {
        response = await updateShow(
          initialValues?.id || '',
          values
        )
      }

      if (!response?.success) {
        throw new Error(response?.message || 'Failed to add show.')
      }

      toast.success(response.message || 'Show added successfully.')
      form.reset()
      router.push(`/admin/shows`)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="w-full flex justify-center mt-5">
      <div className="w-full max-w-3xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 w-full'
          >    
            <FormField
              control={form.control}
              name='movie_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movie</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select Movie' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {movies.map((movie) => (
                        <SelectItem
                          value={movie.id.toString()}
                          key={movie.id}
                        >
                          {movie.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />   
            <FormField
              control={form.control}
              name='theatre_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theatre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select Theatre' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {theatres.map((theatre) => (
                        <SelectItem
                          value={theatre.id.toString()}
                          key={theatre.id}
                        >
                          {theatre.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />   
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      type='date'                      
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='time'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input
                      type='time'                      
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='ticket_price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Price</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value))
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end gap-5'>
              <Button
                onClick={() => router.push('/admin/shows')}
                className='w-full mt-5'
                type='button'
                variant='outline'
              >
                Cancel
              </Button>
              <Button
                className='w-full mt-5'
                type='submit'
                disabled={loading}
              >
                {formType === 'add' ? 'Add Show' : 'Update Show' }
              </Button>
            </div>
          </form>      
        </Form>
      </div>
    </div>
  )
}

export default ShowForm