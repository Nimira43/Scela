'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { movieGenres } from '@/constants'
import { uploadFileAndGetUrl } from '@/helpers/file-upload'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { addMovie } from '@/actions/movies'
import { IMovie } from '@/interfaces'

interface MovieFormProps {
  formType: 'add' | 'edit'
  initialValues ? : Partial<IMovie>
}

const movieFormSchema: any = z.object({
  name: z.string().min(1, 'Name is required.'),
  description: z.string().min(1, 'Name is required.'),
  release_date: z.string().min(1, 'Release dae is required.'),
  genre: z.string().min(1, 'Genre is required.'),
  duration: z.string().min(1, 'Duration is required.'),
  poster_url: z.string().min(1, 'Poster is required.'),
})

function MovieForm({
  formType, initialValues
}: MovieFormProps) {
  const [selectedPosterFile, setSelectedPosterFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof movieFormSchema>>({
    resolver: zodResolver(movieFormSchema),
    defaultValues: {
      name: initialValues?.name || '',
      description: initialValues?.description || '',
      release_date: initialValues?.release_date || '',
      genre: initialValues?.genre || '',
      duration: initialValues?.duration || '',
      poster_url: initialValues?.poster_url || ''
    }
  })

  async function onSubmit(values: z.infer<typeof movieFormSchema>) {
    try {
      setLoading(true) 
      const payload = {...values}

      if (selectedPosterFile) {
        const uploadResponse = await uploadFileAndGetUrl(selectedPosterFile)

        if (!uploadResponse.success) {
          throw new Error(uploadResponse.message)
        }
        payload.poster_url = uploadResponse.data
      }

      let response = null

      if (formType = 'add') {
        response = await addMovie(payload)
      }

      if (!response?.success) {
        throw new Error(response?.message || 'Failed to add movie.')
      }

      toast.success(response.message || 'Movie added successfully.')
      form.reset()
      router.push(`/admin/movies`)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex justify-center mt-5">
      <div className="w-full max-w-3xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 w-full'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field}>
                    </Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid grid-cols-3 gap-5'>
              <FormField
                control={form.control}
                name='release_date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Release Date</FormLabel>
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
                name='genre'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Movie Genre' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {movieGenres.map((genre) => (
                          <SelectItem
                            value={genre}
                            key={genre}
                          >
                            {genre.charAt(0).toUpperCase() + genre.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />    
              <FormField
                control={form.control}
                name='duration'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input                     
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='w-max'>
              <label
                className='block my-2 text-sm font-medium'
                htmlFor='file selection'
              >
                Select a Poster
              </label>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => {
                  const file = e.target.files?.[0]

                  if (file) {
                    setSelectedPosterFile(file)
                    form.setValue('poster_url', URL.createObjectURL(file))
                  }
                }}
              />
            </div>
              
            {selectedPosterFile && (
              <div className='mt-3'>
                <img
                  src={URL.createObjectURL(selectedPosterFile)}
                  alt='Selected Poster'
                  className='w-32 h-32 object-contained rounded shadow-md'
                />
              </div>
            )}

            <div className='flex justify-end gap-5'>
              <Button
                onClick={() => router.push('/admin/movies')}
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
                {formType === 'add' ? 'Add Movie' : 'Update Movie' }
              </Button>
            </div>
          </form>      
        </Form>
      </div>
    </div>
  )
}

export default MovieForm