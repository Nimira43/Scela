import { IUsersStore, useUsersStore } from '@/store/users-store'
import { useState } from 'react'
import SidebarMenuItems from './sidebar-menuItems'
import { RiMenuLine } from 'react-icons/ri'

function Header() {
  const { user } = useUsersStore() as IUsersStore
  const [openSidebar, setOpenSidebar] = useState<boolean>(false)

  return (
    <div className='flex justify-between items-center p-6 bg-grey-4'>
      <h1 className='text-xl text-primary logo-text'>
        Scéla
      </h1>
      <div className='flex gap-5 items-center'>
        <h1 className='text-sm'>
          {user?.name}
        </h1>
        <RiMenuLine
          className='cursor-pointer hover:text-primary transitioning'
          size={15}
          onClick={() => setOpenSidebar(true)}
        />
      </div>
      {openSidebar && (
        <SidebarMenuItems
          {...{
            openSidebar,
            setOpenSidebar
          }} 
        />
      )}
    </div>
  )
}

export default Header
