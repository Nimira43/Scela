import { getLoggedInUser } from '@/actions/users'
import Header from './header'
import toast from 'react-hot-toast'
import { IUsersStore, useUsersStore } from '@/store/users-store'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { setUser } = useUsersStore() as IUsersStore
  const router = useRouter()
  
  const fetchData = async () => {
    try {
      const response = await getLoggedInUser()

      if (!response.success) {
        throw new Error(response.message)
      }
      setUser(response.data)
    } catch (error) {
      Cookies.remove('jwt_token')
      router.push('/?form=login')
      toast.error('Something went wrong while fetching data.')
    }
  }

  useEffect(() => {
      fetchData()
  }, [])
  
  return (
    <div>
      <Header />
      <div className='p-5'>
        {children}
      </div>
    </div>
  )
}

export default PrivateLayout
