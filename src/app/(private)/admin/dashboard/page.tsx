'use client'

import UserInfo from '@/components/functional/user-info'
import { IUsersStore, useUsersStore } from '@/store/users-store'

export default function AdminDashboardPage() {
  const { user } = useUsersStore() as IUsersStore

  if (!user) {
    return (
      <div className="p-5">
        <h1>Admin Dashboard Page</h1>
        <p>Loading user...</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Admin Dashboard Page</h1>
      <UserInfo user={user} />
    </div>
  )
}



// 'use client'

// import UserInfo from '@/components/functional/user-info'
// import { IUsersStore, useUsersStore } from '@/store/users-store'

// function AdminDashboardPage() {
//   const {user} = useUsersStore() as IUsersStore

//   return (
//     <div className='p-5'>
//       <h1>Admin Dashboard Page</h1>
//       <UserInfo user={user!} />
//     </div>
//   )
// }

// export default AdminDashboardPage
