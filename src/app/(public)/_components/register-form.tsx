'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8)
})

function RegisterForm() {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  function onSubmit(values: z.infer<typeof registerFormSchema>) {}
  
  return (
    <div className='w-full px-10'>
      <h1 className='text-2xl mb-6 text-center'>
        Register
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-full'
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
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className='w-full'
            type='submit'
          >
            Register
          </Button>

          <div className='text-center'>
            <span className='text-xs '>
              Already have an account?
            </span>
            <Link
              href={'/?form-login'}
              className='text-xs uppercase ml-2 hover:text-primary transitioning'
            >
              Login
            </Link>
          </div>
        </form>      
      </Form>
    </div>
  )
}

export default RegisterForm