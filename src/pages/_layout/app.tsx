import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/Sidebar'

export const AppLayout = () => {
  return (
    <div className="flex h-full w-full">
      <Sidebar />

      <div className="ml-72 flex h-screen w-screen overflow-y-auto bg-background">
        <Outlet />
      </div>
    </div>
  )
}
