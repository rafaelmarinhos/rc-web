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

export const useUpdateReductionInvoice = (): Props => {
  const setShowModal = useModal(
    (state: ModalState<ModalType>) => state.setShowModal,
  )
  const invoiceId = useModal((state: ModalState<ModalType>) => state.value)

  const { mutateAsync: onSubmit, isPending } = useMutation({
    mutationFn: async (value: string) =>
      await invoice.updateReduction(invoiceId, value),

    onSuccess() {
      toast.success('Sucesso', {
        description: 'Abatimento lançado',
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
