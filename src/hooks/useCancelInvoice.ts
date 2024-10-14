import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { queryClient } from '@/lib/react-query'
import { invoice } from '@/services/invoice'
import { useModal } from '@/store/modal-store'

interface Props {
  onSubmit: (id: string) => void
  isSubmitting?: boolean
}

export const useCancelInvoice = (): Props => {
  const closeModal = useModal((state) => state.setShowModal)

  const { mutateAsync: cancelInvoice, isPending } = useMutation({
    mutationFn: invoice.cancel,
    onSuccess() {
      toast.success('Sucesso', {
        description: 'Fatura cancelada',
      })
      queryClient.refetchQueries({
        queryKey: [`fetch-invoices`],
      })
      closeModal()
    },
    onError(e) {
      toast.error('Erro', {
        description: e.message,
      })
      closeModal()
    },
  })

  return {
    onSubmit: cancelInvoice,
    isSubmitting: isPending,
  }
}
