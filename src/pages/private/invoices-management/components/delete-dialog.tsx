import { SmallDialog } from '@/components/ui/small-dialog'
import { useDeleteInvoice } from '@/hooks/useDeleteInvoice'
import { useModal } from '@/store/modal-store'

export const DeleteDialog = () => {
  const { onSubmit, isSubmitting } = useDeleteInvoice()
  const id = useModal((state) => state.value)

  return (
    <SmallDialog
      title="Deseja excluir essa fatura?"
      subtitle="Essa ação não pode ser desfeita"
      onSubmit={() => onSubmit(id)}
      loading={isSubmitting}
    />
  )
}
