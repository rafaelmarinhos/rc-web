import { Outlet } from 'react-router-dom'

// import { AuthImage, PetchaLogoDark } from '@/assets'

export const AuthLayout = () => {
  return (
    <div className="flex h-screen w-screen">
      <div className="h-full w-3/4 flex-col border-r border-r-stroke bg-primary-foreground">
        {/* <div className="mt-10 flex items-center justify-center">
          <PetchaLogoDark />
        </div>

        <div className="mt-20 flex justify-center">
          <AuthImage />
        </div> */}
      </div>

      <div className="flex h-screen w-2/4 items-center justify-center bg-primary-foreground">
        <Outlet />
      </div>
    </div>
  )
}
