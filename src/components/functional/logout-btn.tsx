import toast from 'react-hot-toast'
import { Button } from '../ui/button'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

function LogoutButton() {
  const router = useRouter()
  const handleLogout = () => {
    Cookies.remove('jwt_token')
    Cookies.remove('user_role')
    toast.success('Logged out successfully.')
    router.push('/?form=login')
  }

  return (
    <Button
      className='w-full'
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}

export default LogoutButton
