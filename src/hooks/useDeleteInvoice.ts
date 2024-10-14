import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { queryClient } from '@/lib/react-query'
import { invoice } from '@/services/invoice'
import { useModal } from '@/store/modal-store'

interface Props {
  onSubmit: (id: string) => void
  isSubmitting?: boolean
}

export const useDeleteInvoice = (): Props => {
  const closeModal = useModal((state) => state.setShowModal)

  const { mutateAsync: deleteInvoice, isPending } = useMutation({
    mutationFn: invoice.delete,
    onSuccess() {
      toast.success('Sucesso', {
        description: 'Fatura excluída',
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
    onSubmit: deleteInvoice,
    isSubmitting: isPending,
  }
}
