import LogoutButton from '@/components/functional/logout-btn'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { IUsersStore, useUsersStore } from '@/store/users-store'
import { usePathname } from 'next/navigation'
import { RiDashboardLine, RiMovie2Line, RiTicketLine, RiUser6Line } from 'react-icons/ri'
import { TbTheater, TbUserScreen, TbUsersGroup } from 'react-icons/tb'

function SidebarMenuItems({
  openSidebar,
  setOpenSidebar
}: {
  openSidebar: boolean
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
  }) {
  
  const { user } = useUsersStore() as IUsersStore
  const pathname = usePathname()
  const iconSize = 14

  const userMenuItems: any[] = [
    {
      name: 'Dashboard',
      path: '/user/dashboard',
      icon: <RiDashboardLine size={iconSize} />
    },
    {
      name: 'Movies',
      path: '/user/movies',
      icon: <RiMovie2Line size={iconSize} />
    },
    {
      name: 'Bookings',
      path: '/user/bookings',
      icon: <RiTicketLine size={iconSize} />
    },
    {
      name: 'Profile',
      path: '/user/profile',
      icon: <RiUser6Line size={iconSize} />
    },
  ]

  const adminMenuItems: any[] = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: <RiDashboardLine size={iconSize} />
    },
    {
      name: 'Movies',
      path: '/admin/movies',
      icon: <RiMovie2Line size={iconSize} />
    },
    {
      name: 'Theatres',
      path: '/admin/theatres',
      icon: <TbTheater size={iconSize} />
    },
    {
      name: 'Shows',
      path: '/admin/shows',
      icon: <TbUserScreen size={iconSize} />
    },
    {
      name: 'Bookings',
      path: '/admin/bookings',
      icon: <RiTicketLine size={iconSize} />
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: <TbUsersGroup size={iconSize} />
    }
  ]

  const menuItems: any[] =
    user?.role === 'admin'
      ? adminMenuItems
      : userMenuItems

  return (
    <Sheet
      open={openSidebar}
      onOpenChange={(open) => setOpenSidebar(open)}
    >
      <SheetContent className='min-w-[400px]'>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className='flex flex-col gap-10 px-7 m-10'>
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:text-primary transitioning ${
                pathname === item.path
                  ? 'text-primary bg-grey-4'
                  : ''
              }`}
            >
              {item.icon}
              <h1 className='text-sm font-medium'>
                {item.name}
              </h1>
            </div>
          ))}
          <LogoutButton />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SidebarMenuItems
