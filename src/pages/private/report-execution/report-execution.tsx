import { Download, Filter } from 'lucide-react'
import { FormProvider } from 'react-hook-form'

import { Page } from '@/components/page'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/custom-pagination'
import { Dialog } from '@/components/ui/dialog'
import { LoadingModal } from '@/components/ui/loading-modal'
import { useFetchReportExecution } from '@/hooks/useFetchReportExecution'
import { ModalType } from '@/interfaces/modal'
import { ModalState, useModal } from '@/store/modal-store'

import { DeleteDialog } from './components/delete-dialog'
import { ExecutionDetails } from './components/execution-details'
import { ExecutionTable } from './components/execution-table'
import { ExecutionFilter } from './components/filter'
import { GenerateDialog } from './components/generate-dialog'
import { Upload } from './components/upload'
import { convertToExcel } from './convert-to-excel'

export const ReportExecution = () => {
  const {
    data,
    isFetching,
    page,
    totalPages,
    handlePage,
    form,
    onSearchByFilter,
  } = useFetchReportExecution()

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
          <ExecutionFilter onSearch={onSearchByFilter} />
        </FormProvider>
      )}

      {modalType === 'DELETE' && <DeleteDialog />}

      {modalType === 'DETAIL' && <ExecutionDetails />}

      {modalType === 'UPLOAD' && <Upload />}

      {modalType === 'LOADING' && <LoadingModal />}

      {modalType === 'GENERATE' && <GenerateDialog />}

      <Page>
        <div className="mb-4 flex flex-col gap-6">
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              className="w-36"
              onClick={() => setShowModal('UPLOAD')}
            >
              <span>Upload de fatura</span>
              {/* <Upload width={20} height={20} className="hover:cursor-pointer" /> */}
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
          <ExecutionTable
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
