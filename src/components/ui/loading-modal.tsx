import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { DialogContent, DialogOverlay } from './dialog'
import { Loader } from './loader'

const styles = cva(
  'w-80 h-50 rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:px-17.5 md:py-15',
)

export const LoadingModal = () => {
  return (
    <DialogOverlay className="flex h-screen w-screen items-center justify-center px-10 py-8">
      <DialogContent className={cn(styles())}>
        <div className="flex items-center justify-center">
          <Loader className="h-10 w-10 animate-spin text-primary" />
        </div>

        <p className="mb-10">Processando...</p>
      </DialogContent>
    </DialogOverlay>
  )
}
