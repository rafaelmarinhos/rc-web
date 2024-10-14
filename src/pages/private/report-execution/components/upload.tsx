import { XCircle } from 'lucide-react'
import { useState } from 'react'

import { ModalContent, ModalPage } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/ui/file-upload'
import { useUploadReportExecutionDocument } from '@/hooks/useUploadReportExecutionDocument'
import { ModalType } from '@/interfaces/modal'
import { ModalState, useModal } from '@/store/modal-store'

export const Upload = () => {
  const { isUploading, onUpload } = useUploadReportExecutionDocument()

  const setShowModal = useModal(
    (state: ModalState<ModalType>) => state.setShowModal,
  )

  const [files, setFiles] = useState<File[]>([])

  const onHandleFiles = (file: File) => {
    setFiles((prev) => [...prev, file])
  }

  const onRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <ModalPage title="Enviar fatura" showCloseButton className="w-[30rem]">
      <ModalContent>
        <FileUpload onSelect={onHandleFiles} disabled={isUploading} />
      </ModalContent>

      {files?.map((file, index) => (
        <div key={index} className="flex flex-row gap-3">
          <XCircle
            className="ml-2 mt-0.5 h-4 w-4 cursor-pointer text-red"
            onClick={() => onRemoveFile(index)}
          />
          <span className="mb-4 text-sm font-medium text-black dark:text-white">
            {index + 1} - {file.name}
          </span>
        </div>
      ))}

      <ModalContent className="mb-8 mt-16 w-full flex-row gap-0">
        <Button
          variant="outline"
          className="mr-4 w-full"
          onClick={() => {
            setShowModal()
            setFiles([])
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => onUpload(files)}
          loading={isUploading}
          className="w-full"
        >
          Enviar
        </Button>
      </ModalContent>
    </ModalPage>
  )
}
