import { Badge } from '@/components/ui/badge'
import { PopoverActions } from '@/components/ui/popover-actions'
import { Customer, Status } from '@/interfaces/customer'
import { ModalType } from '@/interfaces/modal'
import { cpfCnpjMask } from '@/utils/masks'

interface Props {
  data?: Customer[]
  loading?: boolean
  action: (modalType: ModalType, value?: string | number | Customer) => void
}

export const CustomersTable = ({ data, loading, action }: Props) => {
  return (
    <div className="overflow-y-auto rounded-t-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="sticky top-0 bg-white">
        <div className="px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Clientes
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Nome</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Documento</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">UC</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Status</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Código do cooperado</p>
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
          <p className="text-muted-foreground">Nenhum cliente encontrado</p>
        </div>
      )}

      {data?.map((customer, index) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={index}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex items-center">
              <p className="text-sm text-black dark:text-white">
                {customer.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {cpfCnpjMask(customer.document)}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{customer.uc}</p>
          </div>
          <div className="col-span-1 flex items-center">
            {Status[customer.status] === 'Ativo' ? (
              <Badge text="Ativo" />
            ) : (
              <Badge text="Inativo" variant="red" />
            )}
          </div>
          <div className="col-span-1 ml-8 flex items-center">
            <p className="text-sm">{customer.auxiliaryCode}</p>
          </div>
          <div className="col-span-1 ml-3 flex items-center">
            <PopoverActions
              items={[
                {
                  title: 'Editar',
                  action: () => action('EDIT', customer),
                },
                // {
                //   title: 'Processar',
                //   action: () => {
                //     action('LOADING')
                //     onSubmit(customer.id)
                //   },
                // },
                {
                  title: 'Inativar',
                  action: () => action('CHANGE-STATUS', customer.id),
                  isRed: true,
                },
              ]}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
