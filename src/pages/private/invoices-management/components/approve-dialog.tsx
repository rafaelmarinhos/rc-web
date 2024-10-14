import { SmallDialog } from '@/components/ui/small-dialog'
import { useApproveInvoice } from '@/hooks/useApproveInvoice'
import { useModal } from '@/store/modal-store'

export const ApproveDialog = () => {
  const { onSubmit, isSubmitting } = useApproveInvoice()
  const id = useModal((state) => state.value)

  return (
    <SmallDialog
      title="Deseja aprovar essa fatura?"
      subtitle="Essa ação não pode ser desfeita"
      onSubmit={() => onSubmit(id)}
      loading={isSubmitting}
    />
  )
}
