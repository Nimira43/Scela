import { IUser } from '@/interfaces'

function UserInfo({ user } : { user: IUser }) {
  return (
    <div className='flex flex-col gap-5 p-5 w-max'>
      <h1>User Id: {user.id}</h1>
      <h1>User Name: {user.name}</h1>
      <h1>User Email: {user.email}</h1>
      <h1>User Role: {user.role}</h1>
      
    </div>
  )
}

export default UserInfo
