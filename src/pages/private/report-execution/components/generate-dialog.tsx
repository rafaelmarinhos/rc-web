import { SmallDialog } from '@/components/ui/small-dialog'
import { useGenerateExecutionInvoice } from '@/hooks/useGenerateExecutionInvoice'
import { useModal } from '@/store/modal-store'

export const GenerateDialog = () => {
  const { onSubmit, isSubmitting } = useGenerateExecutionInvoice()
  const id = useModal((state) => state.value)

  return (
    <SmallDialog
      title="Deseja gerar a fatura?"
      subtitle="Essa ação não pode ser desfeita"
      onSubmit={() => onSubmit(id)}
      loading={isSubmitting}
    />
  )
}
