import { memo } from 'react'

import { Badge } from '@/components/ui/badge'
import { InvoiceReport } from '@/interfaces/invoiceReport'
import { ModalType } from '@/interfaces/modal'
import { ISOStringToDate } from '@/utils/format'

interface Props {
  data?: InvoiceReport[]
  loading?: boolean
  action: (modalType: ModalType, value: string | number | InvoiceReport) => void
}

export const InvoiceReportTable = memo(({ data, loading }: Props) => {
  const badgeStatus = (status: string) => {
    if (status === 'Pago') return <Badge text={status} variant="green" />
    if (status === 'Em aberto') return <Badge text={status} variant="red" />
    if (status === 'Em atraso') return <Badge text={status} variant="red" />
    if (status === 'Aguardando aprovação')
      return <Badge text={status} variant="yellow" />
    return <Badge text={status} />
  }

  return (
    <div className="overflow-y-auto rounded-t-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="sticky top-0 bg-white">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Relatório Financeiro
          </h4>
        </div>

        <div className="grid grid-cols-12 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Cliente</p>
          </div>
          <div className="col-span-1 ml-10 items-center">
            <p className="font-medium">N° RC</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">N° Sicoob</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Emissão</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Vencimento</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Status</p>
          </div>
          <div className="col-span-1 ml-2 flex items-center">
            <p className="font-medium">Pagamento</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Forma de Pgto</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Valor</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Valor Mora</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Valor Pago</p>
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
          <p className="text-muted-foreground">Nenhum relatório encontrado</p>
        </div>
      )}

      {data?.map((item, index) => (
        <div
          className="grid grid-cols-12 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
          key={index}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex items-center">
              <p className="text-sm text-black dark:text-white">
                {item.customer}
              </p>
            </div>
          </div>
          <div className="col-span-1 ml-10 hidden items-center sm:flex">
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
              {item.dateOfIssue
                ? ISOStringToDate(item.dateOfIssue.toString())
                : '-'}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {item.dueDate ? ISOStringToDate(item.dueDate.toString()) : '-'}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            {badgeStatus(item.status)}
          </div>
          <div className="col-span-1 ml-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {item.dateOfPayment
                ? ISOStringToDate(item.dateOfPayment.toString())
                : '-'}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {item.paymentType || '-'}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(item.value)}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(item.paymentFee ?? 0)}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(item.paymentValue ?? 0)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
})

InvoiceReportTable.displayName = 'InvoiceReportTable'
