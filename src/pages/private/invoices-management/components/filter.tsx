import { Controller, useFormContext } from 'react-hook-form'

import { ModalContent, ModalPage } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { SelectOption } from '@/interfaces/select'
import { ISOStringToDate } from '@/utils/format'
import { dayMonthYearMask } from '@/utils/masks'

import { InvoicesSchemaFormType } from '../schema'

interface Props {
  onSearch(): void
}

export const InvoiceFilter = ({ onSearch }: Props) => {
  const status: SelectOption[] = [
    {
      label: 'Aguardando aprovação',
      value: '1',
    },
    {
      label: 'Em aberto',
      value: '2',
    },
    {
      label: 'Pago',
      value: '3',
    },
    {
      label: 'Em atraso',
      value: '4',
    },
    {
      label: 'Baixado',
      value: '5',
    },
  ]

  const { register, control, resetField, watch } =
    useFormContext<InvoicesSchemaFormType>()

  const dueStartDate = watch('dueStartDate')
  const dueFinishDate = watch('dueFinishDate')

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
            label="Data Venc.inicial"
            className="w-72"
            value={dayMonthYearMask(dueStartDate)}
            defaultValue={ISOStringToDate(dueStartDate)}
            placeholder="DD/MM/AAAA"
            {...register('dueStartDate')}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Input
            id="date"
            label="Data Venc.Final"
            className="w-72"
            value={dayMonthYearMask(dueFinishDate)}
            defaultValue={ISOStringToDate(dueFinishDate)}
            placeholder="DD/MM/AAAA"
            {...register('dueFinishDate')}
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

      <ModalContent className="mb-8 mt-16 w-full flex-row gap-0">
        <Button
          variant="outline"
          className="mr-4 w-full"
          onClick={() => {
            resetField('customerFilter')
            resetField('dueStartDate')
            resetField('dueFinishDate')
            resetField('referenceMonth')
            resetField('status', { defaultValue: '' })
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
