import { useMutation } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

import { ModalType } from '@/interfaces/modal'
import { post } from '@/services'
import { ModalState, useModal } from '@/store/modal-store'

interface Props {
  onUpload: (file: File[]) => Promise<void>
  progress: number | undefined
  isUploading?: boolean
}

export const useUploadReportExecutionDocument = (): Props => {
  const [progress, setProgress] = useState<number | undefined>(undefined)

  const setShowModal = useModal(
    (state: ModalState<ModalType>) => state.setShowModal,
  )

  const { mutateAsync: uploadImage, isPending: isUploading } = useMutation({
    mutationFn: async (files: File[]) =>
      post({
        url: '/execution/upload',
        config: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          transformRequest: () => {
            return files
          },
          onUploadProgress({ progress }: any) {
            if (progress) {
              const percent = Math.round(progress * 100)

              setProgress(percent)
            }
          },
        },
      }),
  })

  const onUpload = useCallback(
    async (data: File[]) => {
      try {
        const files = new FormData()
        data.forEach((file) => {
          files.append('files', file)
        })

        await uploadImage(files as any)

        setShowModal()

        setProgress(undefined)

        toast.success('Sucesso', {
          description: 'Arquivos anexados',
        })
      } catch (error: any) {
        setProgress(undefined)
        toast.error('Erro', {
          description: error.message,
        })
      }
    },
    [uploadImage, setShowModal],
  )

  return {
    onUpload,
    progress,
    isUploading,
  }
}
