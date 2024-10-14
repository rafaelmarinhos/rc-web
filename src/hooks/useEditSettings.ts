import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { Settings } from '@/interfaces/settings'
import { settings } from '@/services/settings'

interface Props {
  onSubmit: (data: Settings) => void
  isSubmitting: boolean
}

export const useEditSettings = (): Props => {
  const { mutateAsync: edit, isPending } = useMutation({
    mutationFn: settings.edit,
    onSuccess() {
      toast.success('Sucesso', {
        description: 'Parâmetros alterado',
      })
    },
    onError(e) {
      toast.error('Erro', {
        description: e.message,
      })
    },
  })

  return {
    onSubmit: edit,
    isSubmitting: isPending,
  }
}
