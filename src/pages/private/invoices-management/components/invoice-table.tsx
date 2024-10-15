import { memo } from 'react'

import { Badge } from '@/components/ui/badge'
import { PopoverActions } from '@/components/ui/popover-actions'
import { Invoice, Status } from '@/interfaces/invoice'
import { ModalType } from '@/interfaces/modal'
import { ISOStringToDate } from '@/utils/format'
import { currencyMask } from '@/utils/masks'
import { openLink } from '@/utils/openLink'

interface Props {
  data?: Invoice[]
  loading?: boolean
  action: (modalType: ModalType, value: string | number | Invoice) => void
  getFile: (id: string) => void
}

export const InvoiceTable = memo(
  ({ data, loading, action, getFile }: Props) => {
    const statusBadge = (status: keyof typeof Status) => {
      if (status === 1) return <Badge text={Status[status]} variant="yellow" />
      if (status === 2) return <Badge text={Status[status]} variant="orange" />
      if (status === 3) return <Badge text={Status[status]} />
      if (status === 4) return <Badge text={Status[status]} variant="red" />
      return <Badge text={Status[status]} />
    }

    const popoverActions = (statusCode: keyof typeof Status, item: Invoice) => {
      if (statusCode === 1) {
        return [
          {
            title: 'Aprovar fatura',
            action: () => action('APPROVE', item.id),
          },
          {
            title: 'Alterar informações',
            action: () => action('EDIT', item),
          },
          {
            title: 'Fatura Equatorial',
            action: () => openLink(item.invoiceEquatorialUrlFile),
          },
          {
            title: 'Base de cálculo',
            action: () => action('DETAIL', item.id),
          },
          {
            title: 'Excluir fatura',
            action: () => action('DELETE', item.id),
            isRed: true,
          },
        ]
      }

      return [
        {
          title: 'Fatura RC',
          action: () => getFile(item.id),
        },
        {
          title: 'Fatura Equatorial',
          action: () => openLink(item.invoiceEquatorialUrlFile),
        },
        {
          title: 'Base de cálculo',
          action: () => action('DETAIL', item.id),
        },
        {
          title: 'Alterar vencimento',
          action: () => action('DUE-DATE', item),
        },
        {
          title: 'Lançar abatimento',
          action: () => action('UPDATE-REDUCTION', item.id),
        },
        {
          title: 'Baixar fatura',
          action: () => action('CHANGE-STATUS', item.id),
        },
      ]
    }

    return (
      <div className="overflow-y-auto rounded-t-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="sticky top-0 bg-white">
          <div className="px-4 py-6 md:px-6 xl:px-7.5">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Faturas
            </h4>
          </div>

          <div className="grid grid-cols-10 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Nome</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">UC</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Mês de Referência</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Vencimento</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Valor</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Nosso Número</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Número Sicoob</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Data pagamento</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Status</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Ações</p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="mb-6 flex w-full items-center justify-center">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        )}
        {data?.length === 0 && !loading && (
          <div className="mb-6 flex w-full items-center justify-center">
            <p className="text-muted-foreground">Nenhuma fatura encontrada</p>
          </div>
        )}

        {data?.map((item, index) => (
          <div
            className="grid grid-cols-10 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
            key={index}
          >
            <div className="col-span-1 flex items-center">
              <div className="flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {item.name}
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">{item.uc}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {item.referenceMonth}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {ISOStringToDate(item.dueDate)}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {currencyMask(item.value)}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {item.rcNumber}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {item.sicoobNumber}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {ISOStringToDate(item.dateOfPayment)}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <div className="text-sm text-black dark:text-white">
                {statusBadge(item.statusCode)}
              </div>
            </div>

            <div className="col-span-1 ml-3 flex items-center">
              <PopoverActions items={popoverActions(item.statusCode, item)} />
            </div>
          </div>
        ))}
      </div>
    )
  },
)

InvoiceTable.displayName = 'InvoiceTable'
