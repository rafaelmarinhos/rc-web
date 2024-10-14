import { memo } from 'react'

import { Badge } from '@/components/ui/badge'
import { PopoverActions } from '@/components/ui/popover-actions'
import { ModalType } from '@/interfaces/modal'
import { ReportExecution, Status } from '@/interfaces/report'
import { openLink } from '@/utils/openLink'

interface Props {
  data?: ReportExecution[]
  loading?: boolean
  action: (
    modalType: ModalType,
    value: string | number | ReportExecution,
  ) => void
}

export const ExecutionTable = memo(({ data, loading, action }: Props) => {
  const badgeStatus = (status: Status) => {
    if (status === 'Sucesso') return <Badge text={status} />
    if (status === 'Erro') return <Badge text={status} variant="red" />
    return <Badge text={status} variant="yellow" />
  }

  return (
    <div className="overflow-y-auto rounded-t-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="sticky top-0 bg-white">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Relatório de execução
          </h4>
        </div>

        <div className="grid grid-cols-8 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
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
            <p className="font-medium">Mensagem</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">N° Fatura RC</p>
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
          <p className="text-muted-foreground">Nenhum relatório encontrado</p>
        </div>
      )}

      {data?.map((item, index) => (
        <div
          className="grid grid-cols-8 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
          key={index}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex items-center">
              <p className="text-sm text-black dark:text-white">{item.name}</p>
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
              {item.referenceDate}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{item.message}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="ml-10 text-sm text-black dark:text-white">
              {item.rcNumber}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            {badgeStatus(item.status)}
          </div>
          <div className="col-span-1 ml-3 flex items-center">
            <PopoverActions
              items={[
                {
                  title: 'Ver detalhes',
                  action: () => action('DETAIL', item),
                },
                {
                  title: 'Fatura Equatorial',
                  action: () => openLink(item.invoiceEquatorialUrlFile),
                },
                {
                  title: 'Gerar fatura',
                  action: () => action('GENERATE', item.id),
                },
                {
                  title: 'Excluir',
                  action: () => action('DELETE', item.id),
                  isRed: true,
                },
              ]}
            />
          </div>
        </div>
      ))}
    </div>
  )
})

ExecutionTable.displayName = 'ExecutionTable'
