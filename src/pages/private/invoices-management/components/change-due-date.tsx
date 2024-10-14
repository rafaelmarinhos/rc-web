import { ModalContent, ModalPage } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useChangeInvoiceDueDate } from '@/hooks/useChangeInvoiceDueDate'
import { useModal } from '@/store/modal-store'
import { ISOStringToDate } from '@/utils/format'
import { dayMonthYearMask } from '@/utils/masks'

export const ChangeDueDate = () => {
  const closeModal = useModal((state) => state.setShowModal)

  const { form, onSubmit } = useChangeInvoiceDueDate()

  const {
    resetField,
    formState: { isSubmitting },
    handleSubmit,
    register,
    watch,
  } = form

  const dueDate = watch('dueDate')

  return (
    <ModalPage title="Vencimento">
      <ModalContent>
        <div className="flex flex-wrap gap-4">
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
