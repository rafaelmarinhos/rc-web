import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ModalType } from '@/interfaces/modal'
import { queryClient } from '@/lib/react-query'
import { customer } from '@/services/customer'
import { ModalState, useModal } from '@/store/modal-store'

interface Props {
  onSubmit: (id: string) => void
  isSubmitting?: boolean
}

export const useCustomerExecute = (): Props => {
  const closeModal = useModal((state) => state.setShowModal)
  const values = useModal((state: ModalState<ModalType>) => state.value)
  const filter = values?.customerFilter || ''

  const { mutateAsync: execute, isPending } = useMutation({
    mutationFn: customer.execute,
    onSuccess() {
      toast.success('Sucesso', {
        description: 'Processamento realizado',
      })
      queryClient.fetchQuery({
        queryKey: [`fetch-customers-$${filter}`],
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
    onSubmit: execute,
    isSubmitting: isPending,
  }
}
