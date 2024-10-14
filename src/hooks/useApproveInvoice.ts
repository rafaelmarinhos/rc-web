import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ModalType } from '@/interfaces/modal'
import { queryClient } from '@/lib/react-query'
import { invoice } from '@/services/invoice'
import { ModalState, useModal } from '@/store/modal-store'

interface Props {
  onSubmit: (id: string) => void
  isSubmitting?: boolean
}

export const useApproveInvoice = (): Props => {
  const setShowModal = useModal(
    (state: ModalState<ModalType>) => state.setShowModal,
  )

  const { mutateAsync: onSubmit, isPending } = useMutation({
    mutationFn: invoice.approve,

    onSuccess() {
      toast.success('Sucesso', {
        description: 'Fatura aprovada',
      })
      queryClient.refetchQueries({
        queryKey: [`fetch-invoices`],
      })
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
