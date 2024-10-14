import { SmallDialog } from '@/components/ui/small-dialog'
import { useChangeUserStatus } from '@/hooks/useChangeUserStatus'
import { useModal } from '@/store/modal-store'

export const ChangeStatusDialog = () => {
  const { onSubmit, isSubmitting } = useChangeUserStatus()
  const id = useModal((state) => state.value)

  return (
    <SmallDialog
      title="Deseja alterar o status?"
      subtitle="Essa ação pode ser desfeita a qualquer momento"
      onSubmit={() => onSubmit(id)}
      loading={isSubmitting}
    />
  )
}
