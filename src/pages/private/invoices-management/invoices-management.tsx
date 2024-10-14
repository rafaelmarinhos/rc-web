import { Download, Filter } from 'lucide-react'
import { FormProvider } from 'react-hook-form'

import { Page } from '@/components/page'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/custom-pagination'
import { Dialog } from '@/components/ui/dialog'
import { LoadingModal } from '@/components/ui/loading-modal'
import { useFetchInvoices } from '@/hooks/useFetchInvoices'
import { useGetInvoiceFile } from '@/hooks/useGetInvoiceFile'
import { ModalType } from '@/interfaces/modal'
import { ModalState, useModal } from '@/store/modal-store'

import { ApproveDialog } from './components/approve-dialog'
import { BaseCalculate } from './components/base-calculate'
import { CancelDialog } from './components/cancel-dialog'
import { ChangeDueDate } from './components/change-due-date'
import { DeleteDialog } from './components/delete-dialog'
import { Edit } from './components/edit'
import { InvoiceFilter } from './components/filter'
import { InvoiceTable } from './components/invoice-table'
import { UpdateReduction } from './components/update-reduction'
import { convertToExcel } from './convert-to-excel'

export const InvoicesManagement = () => {
  const { data, isFetching, form, onSearchByFilter, handlePage } =
    useFetchInvoices()
  const { onSubmit: onSubmitGetFile } = useGetInvoiceFile()

  const showModal = useModal((state) => state.showModal)
  const modalType = useModal((state: ModalState<ModalType>) => state.modalType)
  const setShowModal = useModal(
    (state: ModalState<ModalType>) => state.setShowModal,
  )
  const setIndexValue = useModal(
    (state: ModalState<ModalType>) => state.setValue,
  )

  return (
    <Dialog open={showModal}>
      {modalType === 'FILTER' && (
        <FormProvider {...form}>
          <InvoiceFilter onSearch={onSearchByFilter} />
        </FormProvider>
      )}

      {modalType === 'EDIT' && <Edit />}

      {modalType === 'DETAIL' && <BaseCalculate />}

      {modalType === 'LOADING' && <LoadingModal />}

      {modalType === 'DELETE' && <DeleteDialog />}

      {modalType === 'APPROVE' && <ApproveDialog />}

      {modalType === 'CHANGE-STATUS' && <CancelDialog />}

      {modalType === 'DUE-DATE' && <ChangeDueDate />}

      {modalType === 'UPDATE-REDUCTION' && <UpdateReduction />}

      <Page>
        <div className="mb-4 flex flex-col gap-6">
          <div className="flex items-center justify-end gap-2">
            <Button
              size="sm"
              className="h-10 w-16"
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
          <InvoiceTable
            data={data}
            loading={isFetching}
            action={(modalType, index) => {
              setShowModal(modalType)
              setIndexValue(index)
            }}
            getFile={(id) => {
              setShowModal('LOADING')
              onSubmitGetFile(id)
            }}
          />

          <Pagination
            totalPages={0}
            page={0}
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
