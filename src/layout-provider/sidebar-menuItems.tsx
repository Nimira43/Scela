import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { IUsersStore, useUsersStore } from '@/store/users-store'
import { RiDashboardLine, RiMovie2Line, RiTicketLine, RiUser6Line } from 'react-icons/ri'

function SidebarMenuItems({
  openSidebar,
  setOpenSidebar
}: {
  openSidebar: boolean
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
  }) {
  
  const {user} = useUsersStore() as IUsersStore
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
  const adminMenuItems: any[] = []
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
      </SheetContent>
    </Sheet>
  )
}

export default SidebarMenuItems
