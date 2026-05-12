import { getLoggedInUser } from '@/actions/users'
import Header from './header'
import toast from 'react-hot-toast'
import { IUsersStore, useUsersStore } from '@/store/users-store'
import { useEffect } from 'react'

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { setUser } = useUsersStore() as IUsersStore
  
  const fetchData = async () => {
    try {
      const response = await getLoggedInUser()

      if (!response.success) {
        toast.error(response.message || 'Something went wrong.')
        return
      }
      setUser(response.data)
    } catch (error) {
      toast.error('Something went wrong while fetching data.')
    }
  }

  useEffect(() => {
      fetchData()
  }, [])
  
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default PrivateLayout
