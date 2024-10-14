import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { queryClient } from '@/lib/react-query'
import { report } from '@/services/report'
import { useModal } from '@/store/modal-store'

interface Props {
  onSubmit: (id: string) => void
  isSubmitting?: boolean
}

export const useDeleteReportExecution = (): Props => {
  const closeModal = useModal((state) => state.setShowModal)

  const { mutateAsync: deleteReportExecution, isPending } = useMutation({
    mutationFn: report.delete,
    onSuccess() {
      toast.success('Sucesso', {
        description: 'Relatório de execução excluído',
      })
      queryClient.refetchQueries({
        queryKey: [`fetch-report-execution`],
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
    onSubmit: deleteReportExecution,
    isSubmitting: isPending,
  }
}
