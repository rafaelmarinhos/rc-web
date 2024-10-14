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

export const useChangeUserStatus = (): Props => {
  const closeModal = useModal((state) => state.setShowModal)

  const values = useModal((state: ModalState<ModalType>) => state.value)
  const filter = values?.customerFilter || ''

  const { mutateAsync: changeStatus, isPending } = useMutation({
    mutationFn: customer.changeStatus,
    onSuccess() {
      toast.success('Sucesso', {
        description: 'Status alterado',
      })
      queryClient.refetchQueries({
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
    onSubmit: changeStatus,
    isSubmitting: isPending,
  }
}
