import { useState } from 'react'

import { ModalContent, ModalPage } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUpdateReductionInvoice } from '@/hooks/useUpdateReductionInvoice'
import { useModal } from '@/store/modal-store'
import { formatCurrency } from '@/utils/format'

export const UpdateReduction = () => {
  const closeModal = useModal((state) => state.setShowModal)

  const { isSubmitting, onSubmit } = useUpdateReductionInvoice()

  const [value, setValue] = useState('')

  const handleChange = (value: string) => {
    const formattedValue = formatCurrency(value)

    setValue(formattedValue)
  }

  return (
    <ModalPage title="Lançar abatimento">
      <ModalContent>
        <div className="flex flex-wrap gap-4">
          <Input
            id="reduction"
            label="Valor do abatimento"
            className="w-72"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      </ModalContent>

      <ModalContent className="mb-8 mt-16 w-full flex-row gap-0">
        <Button
          variant="outline"
          className="mr-4 w-full"
          onClick={() => {
            closeModal()
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => onSubmit(value)}
          className="w-full"
          loading={isSubmitting}
        >
          Salvar
        </Button>
      </ModalContent>
    </ModalPage>
  )
}
