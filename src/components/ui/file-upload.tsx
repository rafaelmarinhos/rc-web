import { useRef } from 'react'

import { Upload } from '@/assets/upload'

interface Props {
  onSelect: (file: File) => void
  disabled?: boolean
}
export const FileUpload = ({ onSelect, disabled }: Props) => {
  const hiddenFileInputRef = useRef<any>(null)

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return

    if (e.target.files) {
      onSelect(e.target.files[0])
    }
  }

  return (
    <div
      id="FileUpload"
      className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
    >
      <input
        ref={hiddenFileInputRef}
        onChange={onSelectFile}
        type="file"
        accept=".pdf"
        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
      />
      <div className="flex flex-col items-center justify-center space-y-3">
        <Upload />
        <p className="text-sm font-medium text-muted-foreground">
          <span className="text-primary">Clique aqui</span> ou arraste e solte
        </p>
        <p className="mt-1.5 font-medium text-muted-foreground">PDF</p>
      </div>
    </div>
  )
}
