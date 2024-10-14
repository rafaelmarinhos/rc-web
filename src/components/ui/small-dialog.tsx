import { cva } from 'class-variance-authority'
import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import { ModalState, useModal } from '@/store/modal-store'

import { Button } from './button'
import { DialogContent, DialogOverlay } from './dialog'

const styles = cva(
  'w-full max-w-142.5 rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:px-17.5 md:py-15',
)

interface Props extends ComponentProps<'div'> {
  title: string
  subtitle?: string
  onSubmit?: () => void
  onClose?: () => void
  loading?: boolean
}

export const SmallDialog = ({ title, subtitle, onSubmit, loading }: Props) => {
  const closeModal = useModal((state: ModalState<any>) => state.resetModal)

  return (
    <DialogOverlay className="flex h-screen w-screen items-center justify-center px-10 py-8">
      <DialogContent className={cn(styles())}>
        <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
          {title}
        </h3>

        <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
        <p className="mb-10">{subtitle}</p>
        <div className="-mx-3 flex flex-wrap gap-y-4">
          <div className="w-full px-3 2xsm:w-1/2">
            <Button
              onClick={closeModal}
              className="border-stroke bg-gray text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
            >
              Não
            </Button>
          </div>
          <div className="w-full px-3 2xsm:w-1/2">
            <Button onClick={onSubmit} loading={loading}>
              Sim
            </Button>
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}
