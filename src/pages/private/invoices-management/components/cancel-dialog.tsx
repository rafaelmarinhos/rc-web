import { SmallDialog } from '@/components/ui/small-dialog'
import { useCancelInvoice } from '@/hooks/useCancelInvoice'
import { useModal } from '@/store/modal-store'

export const CancelDialog = () => {
  const { onSubmit, isSubmitting } = useCancelInvoice()
  const id = useModal((state) => state.value)

  return (
    <SmallDialog
      title="Deseja dar baixa nesta fatura?"
      subtitle="Essa ação não pode ser desfeita"
      onSubmit={() => onSubmit(id)}
      loading={isSubmitting}
    />
  )
}
