import { Controller, useFormContext } from 'react-hook-form'

import { ModalContent, ModalPage } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { SelectOption } from '@/interfaces/select'
import { dayMonthYearMask } from '@/utils/masks'

import { ReportExecutionSchemaFormType } from '../schema'

interface Props {
  onSearch(): void
}

export const ExecutionFilter = ({ onSearch }: Props) => {
  const status: SelectOption[] = [
    {
      label: 'Processando',
      value: '1',
    },
    {
      label: 'Sucesso',
      value: '2',
    },
    {
      label: 'Erro',
      value: '3',
    },
  ]

  const options = [
    {
      label: 'Sim',
      id: 'sim',
    },
    {
      label: 'Não',
      id: 'nao',
    },
  ]

  const { register, control, resetField, watch } =
    useFormContext<ReportExecutionSchemaFormType>()

  const executionStartDate = watch('executionStartDate')
  const executionFinishDate = watch('executionFinishDate')

  return (
    <ModalPage title="Filtro" showCloseButton>
      <ModalContent>
        <div className="flex flex-wrap gap-4">
          <Input
            id="Search"
            label="Pesquisar"
            placeholder="Nome, documento ou UC"
            className="w-72"
            {...register('customerFilter')}
          />

          <Input
            id="date"
            label="Data inicial"
            className="w-72"
            placeholder="DD/MM/AAAA"
            value={dayMonthYearMask(executionStartDate)}
            {...register('executionStartDate')}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Input
            id="date"
            label="Data inicial"
            className="w-72"
            placeholder="DD/MM/AAAA"
            value={dayMonthYearMask(executionFinishDate)}
            {...register('executionFinishDate')}
          />

          <Input
            id="mes-referencia"
            label="Mês referência"
            placeholder="MM/AAAA"
            className="w-72"
            {...register('referenceMonth')}
          />
        </div>
      </ModalContent>

      <ModalContent>
        <Controller
          control={control}
          name={'status'}
          render={({ field: { onChange, value } }) => (
            <Select
              items={status}
              placeholder="Selecione"
              label="Status"
              value={value}
              onValueChange={onChange}
            />
          )}
        />
      </ModalContent>

      <ModalContent className="mt-4">
        <Controller
          control={control}
          name={'onlyWithNotInvoiceCreated'}
          defaultValue="nao"
          render={({ field: { onChange, value } }) => (
            <Checkbox
              options={options}
              label="Apenas execuções sem fatura gerada?"
              onChange={onChange}
              checked={value}
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
            resetField('executionStartDate', { defaultValue: '' })
            resetField('executionFinishDate', { defaultValue: '' })
            resetField('referenceMonth')
            resetField('status', { defaultValue: '' })
            resetField('onlyWithNotInvoiceCreated', { defaultValue: 'nao' })
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
