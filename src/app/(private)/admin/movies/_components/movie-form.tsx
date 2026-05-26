'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { movieGenres } from '@/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

interface MovieFormProps {
  formType: 'add' | 'edit'
}

const movieFormSchema: any = z.object({
  name: z.string().min(1, 'Name is required.'),
  description: z.string().min(1, 'Name is required.'),
  release_date: z.string().min(1, 'Release dae is required.'),
  genre: z.string().min(1, 'Genre is required.'),
  duration: z.string().min(1, 'Duration is required.'),
  poster_url: z.string().min(1, 'Poster is required.'),
})

function MovieForm({ formType }: MovieFormProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof movieFormSchema>>({
    resolver: zodResolver(movieFormSchema),
    defaultValues: {
      name: '',
      description: '',
      release_date: '',
      genre: '',
      duration: '',
      poster_url: ''
    }
  })

  async function onSubmit(values: z.infer<typeof movieFormSchema>) {
    try {
      setLoading(true) 
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
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <Button
              className='w-full'
              type='submit'
              disabled={loading}
            >
              Submit
            </Button>
          </form>      
        </Form>
      </div>
    </div>
  )
}

export default MovieForm