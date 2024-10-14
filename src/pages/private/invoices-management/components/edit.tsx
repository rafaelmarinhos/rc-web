import { Controller } from 'react-hook-form'

import { ModalContent, ModalPage } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEditInvoice } from '@/hooks/useEditInvoice'
import { useModal } from '@/store/modal-store'
import { formatCurrency, ISOStringToDate } from '@/utils/format'
import { currencyMask, dayMonthYearMask } from '@/utils/masks'

export const Edit = () => {
  const closeModal = useModal((state) => state.setShowModal)

  const { form, onSubmit } = useEditInvoice()

  const {
    control,
    resetField,
    formState: { isSubmitting },
    setValue,
    handleSubmit,
    register,
    watch,
  } = form

  const dueDate = watch('dueDate')

  const handleChange = (value: string) => {
    const formattedValue = formatCurrency(value)

    setValue('value', formattedValue)
  }

  return (
    <ModalPage title="Alterar Informações">
      <ModalContent>
        <div className="flex flex-wrap gap-4">
          <Controller
            control={control}
            name={'value'}
            render={({ field: { value } }) => (
              <Input
                id="valor"
                label="Valor do boleto"
                className="w-72"
                defaultValue={currencyMask(Number(value))}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
              />
            )}
          />

          <Input
            id="date"
            label="Data de vencimento"
            className="w-72"
            value={dayMonthYearMask(dueDate)}
            defaultValue={ISOStringToDate(dueDate)}
            {...register('dueDate')}
          />
        </div>
      </ModalContent>

      <ModalContent className="mb-8 mt-16 w-full flex-row gap-0">
        <Button
          variant="outline"
          className="mr-4 w-full"
          onClick={() => {
            resetField('value')
            resetField('dueDate')
            closeModal()
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit(onSubmit as any)}
          className="w-full"
          loading={isSubmitting}
        >
          Salvar
        </Button>
      </ModalContent>
    </ModalPage>
  )
}
