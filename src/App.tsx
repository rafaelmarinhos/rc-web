import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'

import { queryClient } from './lib/react-query'
import { routers } from './routers/app-routers'

function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | RCEnergy" />
      <Toaster
        toastOptions={{
          classNames: {
            success: 'bg-success text-white border-success',
            error: 'bg-danger text-white border-danger',
          },
        }}
      />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routers} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
