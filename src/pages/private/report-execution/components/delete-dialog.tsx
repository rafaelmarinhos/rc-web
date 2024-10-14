import { SmallDialog } from '@/components/ui/small-dialog'
import { useDeleteReportExecution } from '@/hooks/useDeleteReportExecution'
import { useModal } from '@/store/modal-store'

export const DeleteDialog = () => {
  const { onSubmit, isSubmitting } = useDeleteReportExecution()
  const id = useModal((state) => state.value)

  return (
    <SmallDialog
      title="Deseja excluir o relatório?"
      subtitle="Essa ação não pode ser desfeita"
      onSubmit={() => onSubmit(id)}
      loading={isSubmitting}
    />
  )
}
