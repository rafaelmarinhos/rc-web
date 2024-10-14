import { ModalPage } from '@/components/modal'
import { Loader } from '@/components/ui/loader'
import { useFetchInvoiceBaseCalculate } from '@/hooks/useFetchInvoiceBaseCalculate'

export const BaseCalculate = () => {
  const { data, isFetching } = useFetchInvoiceBaseCalculate()

  return (
    <ModalPage title="Base de cálculo" showCloseButton>
      {isFetching && (
        <div className="flex h-[20rem] w-72 items-center justify-center pb-8">
          <Loader className="h-12 w-12" />
        </div>
      )}

      {!isFetching && (
        <div className="my-8 overflow-y-auto rounded-t-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="sticky top-0 bg-muted">
            <div className="grid grid-cols-2 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
              <div className="col-span-1 flex items-center">
                <p className="font-medium">Descrição</p>
              </div>
              <div className="col-span-1 hidden items-center justify-end sm:flex">
                <p className="font-medium">Valor</p>
              </div>
            </div>
          </div>

          {data?.map((item, index) => (
            <div
              className="grid grid-cols-2 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
              key={index}
            >
              <div className="col-span-1 flex items-center">
                <div className="flex items-center justify-end">
                  <p className="text-sm text-black dark:text-white">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="col-span-1 hidden items-center justify-end sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </ModalPage>
  )
}
