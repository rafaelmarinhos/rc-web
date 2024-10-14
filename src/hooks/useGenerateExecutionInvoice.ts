import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ModalType } from '@/interfaces/modal'
import { queryClient } from '@/lib/react-query'
import { report } from '@/services/report'
import { ModalState, useModal } from '@/store/modal-store'

interface Props {
  onSubmit: (id: string) => void
  isSubmitting?: boolean
}

export const useGenerateExecutionInvoice = (): Props => {
  const setShowModal = useModal(
    (state: ModalState<ModalType>) => state.setShowModal,
  )

  const { mutateAsync: onSubmit, isPending } = useMutation({
    mutationFn: report.generate,

    onSuccess() {
      toast.success('Sucesso', {
        description: 'Fatura Gerada',
      })
      queryClient.refetchQueries({
        queryKey: [`fetch-report-execution`],
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
