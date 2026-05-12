'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useState } from 'react'
import RegisterForm from './_components/register-form'
import LoginForm from './_components/login-form'
import { useSearchParams } from 'next/navigation'

export default function HomePage() {
  const [openSheet, setOpenSheet] = useState(false)
  const queryStrings = useSearchParams()
  const form = queryStrings.get('form')
  
  return (
    <div className='min-h-screen flex flex-col'>
      <nav className='w-full flex items-center justify-between px-6 py-4 border-b'>
        <h1 className='text-xl logo-text text-primary'>
          Scéla
        </h1>
        <Button
          onClick={() => setOpenSheet(true)}
        >
          Login / Register
        </Button>
      </nav>

      <div className='flex flex-col items-center justify-center flex-1 px-6 text-center'>
        <h1 className='text-3xl text-primary tracking-tight sm:text-6xl logo-text'>
          Book Faster. Watch Better
        </h1>

        <p className='mt-4 max-w-xl text-lg text-muted-foreground'>
          Explore what's playing, reserve your seats in seconds, and make every movie night feel seamless.
        </p>

        <Button className='mt-6'>
          Get Started
        </Button>

        <Sheet
          open={openSheet}
          onOpenChange={(open) => setOpenSheet(open)}        
        >
          <SheetContent className='min-w-[500px]'>
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <div className='flex flex-col items-center justify-center h-screen'>
                {form === 'register'
                  ? <RegisterForm />
                  : <LoginForm />
                }
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

    </div>
  )
}


