import { addTheatre, updateTheatre } from '@/actions/theatres'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ITheatre } from '@/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

interface ITheatreFormProps {
  openTheatreForm: boolean
  setOpenTheatreForm: Dispatch<SetStateAction<boolean>>
  reloadData: () => void
  selectedTheatre?: Partial<ITheatre>
  formType: 'add' | 'edit'
}

const theatreFormSchema: any = z.object({
  name: z.string().min(1, 'Name is required.'),
  address: z.string().min(1, 'Address is required.'),
  capacity: z.coerce.number().min(1, 'Capacity must be greater than 0.')
})

function TheatreForm({
  openTheatreForm,
  setOpenTheatreForm,
  reloadData,
  selectedTheatre,
  formType = 'add'
}: ITheatreFormProps) {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof theatreFormSchema>>({
    resolver: zodResolver(theatreFormSchema),
    defaultValues: {
      name: selectedTheatre?.name || '',
      address: selectedTheatre?.address || '',
      capacity: selectedTheatre?.capacity ?? 0,
    }
  })
  
  async function onSubmit(values: z.infer<typeof theatreFormSchema>) {
    try {
      setLoading(true) 
      let response = null

      if (formType === 'add') {
        response = await addTheatre(values)
      } else if (formType === 'edit') {
        response = await updateTheatre(
          selectedTheatre?.id || '',
          values
        )
      }

      if (!response?.success) {
        throw new Error(response?.message || 'Failed to add theatre.')
      }

      toast.success(response.message || 'Theatre added successfully.')
      reloadData()
      form.reset()
      setOpenTheatreForm(false)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={openTheatreForm}
      onOpenChange={setOpenTheatreForm}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {formType === 'add'
              ? 'Add Theatre'
              : 'Edit Theatre'
            }
          </DialogTitle>
          <DialogDescription>
            {formType === 'add'
              ? 'Add new theatre to database'
              : 'Edit the details for this theatre'
            }
          </DialogDescription>
        </DialogHeader>
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
              name='capacity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type='number'                      
                      {...field}
                      onChange={
                        (e) => form.setValue('capacity', parseInt(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className='flex justify-end gap-5'>
              <Button
                onClick={
                  () => {
                    setOpenTheatreForm(false)
                    form.reset()
                  }}
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
                {formType === 'add' ? 'Add Theatre' : 'Edit Theatre' }
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default TheatreForm
