'use client'

import { loginUser } from '@/actions/users'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import Cookies from 'js-cookie'

const loginFormSchema: any = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.string()
})

function LoginForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'user'
    }
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      setLoading(true) 
      const response = await loginUser(values)
      
      if (!response.success) {
        throw new Error(response.message)
      }

      toast.success(response.message)
      Cookies.set('jwt_token', response.data!)
      Cookies.set('user_role', values.role)
      form.reset()
      router.push(`/${values.role}/dashboard`)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }

  }
  
  return (
    <div className='w-full px-10'>
      <h1 className='text-2xl mb-6 text-center'>
        Login
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-full'
        >
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
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel className='flex justify-center'>
                  Role
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex gap-40 justify-center'
                  >
                    <FormItem className='flex items-center gap-3'>
                      <FormControl>
                        <RadioGroupItem value='user' />
                      </FormControl>
                      <FormLabel>
                        User
                      </FormLabel> 
                    </FormItem>
                    <FormItem className='flex items-center gap-3'>
                      <FormControl>
                        <RadioGroupItem value='admin' />
                      </FormControl>
                      <FormLabel>
                        Admin
                      </FormLabel> 
                    </FormItem>
                    
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className='w-full'
            type='submit'
            disabled={loading}
          >
            Login
          </Button>

          <div className='text-center'>
            <span className='text-xs '>
              Don't have an account?
            </span>
            <Link
              href={'/?form=register'}
              className='text-xs uppercase ml-2 hover:text-primary transitioning'
            >
              Register
            </Link>
          </div>
        </form>      
      </Form>
    </div>
  )
}

export default LoginForm