import { getLoggedInUser } from '@/actions/users'
import UserInfo from '@/components/functional/user-info'

async function UserDashboardPage() {
  const userDataResponse = await getLoggedInUser()
  
  if (!userDataResponse.success) {
    return (
      <h1>Something went wrong.</h1>
    )
  }

  const user = userDataResponse.data
    
  return (
    <div className='p-5'>
      <h1>User Dashboard Page</h1>
      {user && <UserInfo user={user} />}
    </div>
  )
}

export default UserDashboardPage
