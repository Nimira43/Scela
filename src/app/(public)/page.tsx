'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useState } from 'react'

export default function HomePage() {
  const [openSheet, setOpenSheet] = useState(false)
  
  return (
    <div className='min-h-screen flex flex-col'>
      <nav className='w-full flex items-center justify-between px-6 py-4 border-b'>
        <h1 className='text-xl logo-text'>
          Scéla
        </h1>
        <Button
          onClick={() => setOpenSheet(true)}
        >
          Login
        </Button>
      </nav>

      <div className='flex flex-col items-center justify-center flex-1 px-6 text-center'>
        <h1 className='text-3xl text-primary tracking-tight sm:text-6xl'>
          Book Your Next Movie Effortlessly
        </h1>

        <p className='mt-4 max-w-xl text-lg text-muted-foreground'>
          Discover showtimes, reserve seats, and enjoy a seamless cinema experience — all in one place.
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
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

    </div>
  )
}


