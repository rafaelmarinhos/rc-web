import { Download, Filter } from 'lucide-react'

import { Page } from '@/components/page'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/custom-pagination'
import { Dialog } from '@/components/ui/dialog'
import { LoadingModal } from '@/components/ui/loading-modal'
import { useFetchCustomers } from '@/hooks/useFetchCustomers'
import { ModalType } from '@/interfaces/modal'
import { ModalState, useModal } from '@/store/modal-store'

import { ChangeStatusDialog } from './components/change-status-dialog'
import { CustomersTable } from './components/customers-table'
import { EditCustomer } from './components/edit-customer'
import { CustomersFilter } from './components/filter'
import { convertToExcel } from './convert-to-excel'

export const Customers = () => {
  const { data, isFetching, page, totalPages, handlePage } = useFetchCustomers()

  const showModal = useModal((state) => state.showModal)
  const modalType = useModal((state: ModalState<ModalType>) => state.modalType)
  const setShowModal = useModal(
    (state: ModalState<ModalType>) => state.setShowModal,
  )
  const setIndexValue = useModal(
    (state: ModalState<ModalType>) => state.setValue,
  )

  const showTable = modalType === 'EDIT' || modalType === 'CREATE'

  return (
    <Dialog open={showModal}>
      {showTable && <EditCustomer />}

      {modalType === 'FILTER' && <CustomersFilter />}

      {modalType === 'CHANGE-STATUS' && <ChangeStatusDialog />}

      {modalType === 'LOADING' && <LoadingModal />}

      <Page>
        <div className="mb-4 flex justify-end">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="w-32"
              onClick={() => setShowModal('CREATE')}
            >
              Novo cliente
            </Button>
            <Button
              size="sm"
              className="w-16"
              onClick={() => convertToExcel(data)}
            >
              <Download
                width={20}
                height={20}
                className="hover:cursor-pointer"
              />
            </Button>
            <Button
              size="sm"
              className="h-10 w-16"
              onClick={() => setShowModal('FILTER')}
            >
              <Filter width={20} height={20} className="hover:cursor-pointer" />
            </Button>
          </div>
        </div>

        <div className="flex max-h-[calc(100vh-200px)] flex-col bg-white shadow-sm">
          <CustomersTable
            data={data}
            loading={isFetching}
            action={(modalType, index) => {
              setShowModal(modalType)
              setIndexValue(index)
            }}
          />

          <Pagination
            loading={isFetching}
            totalPages={totalPages}
            page={page}
            onFirst={handlePage}
            onLast={handlePage}
            onNext={handlePage}
            onPrevious={handlePage}
          />
        </div>
      </Page>
    </Dialog>
  )
}
