import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ModalType } from '@/interfaces/modal'
import { invoice } from '@/services/invoice'
import { ModalState, useModal } from '@/store/modal-store'
import { openBlobInNewTab } from '@/utils/openFile'

interface Props {
  onSubmit: (id: string) => void
  isSubmitting?: boolean
}

export const useGetInvoiceFile = (): Props => {
  const setShowModal = useModal(
    (state: ModalState<ModalType>) => state.setShowModal,
  )

  const { mutateAsync: onSubmit, isPending } = useMutation({
    mutationFn: invoice.getFile,

    onSuccess(e: any) {
      openBlobInNewTab(e)
      setShowModal()
    },
    onError(e) {
      toast.error('Erro', {
        description: e.message,
      })
      setShowModal()
    },
  })

  return {
    onSubmit,
    isSubmitting: isPending,
  }
}
