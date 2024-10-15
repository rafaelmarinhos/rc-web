import { Controller, useFormContext } from 'react-hook-form'

import { ModalContent, ModalPage } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { SelectOption } from '@/interfaces/select'
import { dayMonthYearMask } from '@/utils/masks'

import { ReportInvoicesSchemaFormType } from '../schema'

interface Props {
  onSearch(): void
}

export const InvoicesReportFilter = ({ onSearch }: Props) => {
  const paymentType: SelectOption[] = [
    {
      label: 'Via PIX',
      value: 'VIA PIX',
    },
    {
      label: 'Via Compensacao',
      value: 'VIA COMPENSAÇÃO',
    },
    {
      label: 'Intercreds',
      value: 'INTERCREDIS',
    },
    {
      label: 'Via Sistema RC',
      value: 'VIA SISTEMA RC',
    },
  ]

  const options = [
    {
      label: 'Sim',
      id: 'true',
    },
    {
      label: 'Não',
      id: 'false',
    },
  ]

  const { register, control, resetField, setValue, watch } =
    useFormContext<ReportInvoicesSchemaFormType>()

  const dateOfIssueStart = watch('dateOfIssueStart') || ''
  const dateOfIssueFinish = watch('dateOfIssueFinish') || ''
  const dueDateStart = watch('dueDateStart') || ''
  const dueDateFinish = watch('dueDateFinish') || ''
  const dateOfPaymentStart = watch('dateOfPaymentStart') || ''
  const dateOfPaymentFinish = watch('dateOfPaymentFinish') || ''

  return (
    <ModalPage title="Filtro" showCloseButton>
      <ModalContent>
        <div className="flex flex-wrap gap-4">
          <Input
            id="Search"
            label="Cliente"
            placeholder="Nome, documento ou UC"
            className="w-72"
            {...register('customerFilter')}
          />

          <Controller
            control={control}
            name={'paymentType'}
            render={({ field: { onChange, value } }) => (
              <Select
                items={paymentType}
                placeholder="Selecione"
                label="Tipo de Pagamento"
                defaultValue="Selecione"
                value={value}
                onValueChange={onChange}
              />
            )}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Input
            id="rcNumber"
            label="N° RC"
            placeholder="0"
            className="w-72"
            {...register('rcNumber')}
          />
          <Input
            id="sicoobNumber"
            label="N° Sicooob"
            placeholder="0"
            className="w-72"
            {...register('sicoobNumber')}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Input
            id="date-initial-issue"
            label="Data inicial da emissão"
            className="w-72"
            placeholder="dd/mm/yyyy"
            value={dateOfIssueStart}
            {...register('dateOfIssueStart')}
            onChange={(e) => {
              const maskedValue = dayMonthYearMask(e.target.value)
              setValue('dateOfIssueStart', maskedValue)
            }}
          />

          <Input
            id="date-final-issue"
            label="Data final da emissão"
            className="w-72"
            placeholder="dd/mm/yyyy"
            value={dateOfIssueFinish}
            {...register('dateOfIssueFinish')}
            onChange={(e) => {
              const maskedValue = dayMonthYearMask(e.target.value)
              setValue('dateOfIssueFinish', maskedValue)
            }}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <Input
            id="date-initial-due"
            label="Data inicial do vencimento"
            placeholder="dd/mm/yyyy"
            className="w-72"
            value={dueDateStart}
            {...register('dueDateStart')}
            onChange={(e) => {
              const maskedValue = dayMonthYearMask(e.target.value)
              setValue('dueDateStart', maskedValue)
            }}
          />
          <Input
            id="date-final-due"
            label="Data final do vencimento"
            placeholder="dd/mm/yyyy"
            className="w-72"
            value={dueDateFinish}
            {...register('dueDateFinish')}
            onChange={(e) => {
              const maskedValue = dayMonthYearMask(e.target.value)
              setValue('dueDateFinish', maskedValue)
            }}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <Input
            id="date-initial-payment"
            label="Data inicial do pagamento"
            placeholder="dd/mm/yyyy"
            className="w-72"
            value={dateOfPaymentStart}
            {...register('dateOfPaymentStart')}
            onChange={(e) => {
              const maskedValue = dayMonthYearMask(e.target.value)
              setValue('dateOfPaymentStart', maskedValue)
            }}
          />
          <Input
            id="date-final-payment"
            label="Data final do pagamento"
            placeholder="dd/mm/yyyy"
            className="w-72"
            value={dateOfPaymentFinish}
            {...register('dateOfPaymentFinish')}
            onChange={(e) => {
              const maskedValue = dayMonthYearMask(e.target.value)
              setValue('dateOfPaymentFinish', maskedValue)
            }}
          />
        </div>
      </ModalContent>

      {/* <ModalContent className="mt-4">
        <Controller
          control={control}
          name={'includeWaitingApproval'}
          defaultValue={true}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              options={options}
              label="Apenas execuções sem fatura gerada?"
              onChange={onChange}
              checked={value ? 'true' : 'false'}
            />
          )}
        />
      </ModalContent> */}

      <ModalContent className="mt-2">
        <Controller
          control={control}
          name={'includePaymentPending'}
          defaultValue={true}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              options={options}
              label="Faturas em aberto"
              onChange={onChange}
              checked={value ? 'true' : 'false'}
            />
          )}
        />
      </ModalContent>

      <ModalContent className="mt-4">
        <Controller
          control={control}
          name={'includePaid'}
          defaultValue={true}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              options={options}
              label="Faturas pagas"
              onChange={onChange}
              checked={value ? 'true' : 'false'}
            />
          )}
        />
      </ModalContent>

      <ModalContent className="mt-4">
        <Controller
          control={control}
          name={'includeOverdue'}
          defaultValue={true}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              options={options}
              label="Faturas em atraso"
              onChange={onChange}
              checked={value ? 'true' : 'false'}
            />
          )}
        />
      </ModalContent>

      <ModalContent className="mt-4">
        <Controller
          control={control}
          name={'includeCanceled'}
          defaultValue={true}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              options={options}
              label="Faturas baixadas"
              onChange={onChange}
              checked={value ? 'true' : 'false'}
            />
          )}
        />
      </ModalContent>

      <ModalContent className="mb-8 mt-16 w-full flex-row gap-0">
        <Button
          variant="outline"
          className="mr-4 w-full"
          onClick={() => {
            resetField('customerFilter')
            resetField('rcNumber')
            resetField('sicoobNumber')
            resetField('dateOfIssueStart')
            resetField('dateOfIssueFinish')
            resetField('dueDateStart')
            resetField('dueDateFinish')
            resetField('dateOfPaymentStart')
            resetField('dateOfPaymentFinish')
            resetField('paymentType')
            resetField('includeWaitingApproval', { defaultValue: true })
            resetField('includePaymentPending', { defaultValue: true })
            resetField('includePaid', { defaultValue: true })
            resetField('includeOverdue', { defaultValue: true })
            resetField('includeCanceled', { defaultValue: true })
          }}
        >
          Limpar
        </Button>
        <Button onClick={onSearch} className="w-full">
          Filtrar
        </Button>
      </ModalContent>
    </ModalPage>
  )
}
