import { zodResolver } from '@hookform/resolvers/zod'
import { Download, Filter } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

import { Page } from '@/components/page'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/custom-pagination'
import { Dialog } from '@/components/ui/dialog'
import { useFetchInvoiceReport } from '@/hooks/useFetchReportInvoice'
import { ModalType } from '@/interfaces/modal'
import { invoiceReport } from '@/services/invoiceReport'
import { ModalState, useModal } from '@/store/modal-store'
import { downloadBlob } from '@/utils/downloadFile'

import { InvoicesReportFilter } from './components/filter'
import { InvoiceReportTable } from './components/invoice-report-table'
import {
  reportInvoicesFilterFormSchema,
  ReportInvoicesSchemaFormType,
} from './schema'

export const InvoiceReport = () => {
  const formMethods = useForm<ReportInvoicesSchemaFormType>({
    resolver: zodResolver(reportInvoicesFilterFormSchema),
    defaultValues: {
      customerFilter: '',
      rcNumber: '',
      sicoobNumber: '',
      dateOfIssueStart: '',
      dateOfIssueFinish: '',
      dueDateStart: '',
      dueDateFinish: '',
      dateOfPaymentStart: '',
      dateOfPaymentFinish: '',
      paymentType: '',
      includeWaitingApproval: true,
      inclusePaymentPending: true,
      includePaid: true,
      includeOverdue: true,
      includeCanceled: true,
    },
  })

  const { data, isFetching, page, totalPages, handlePage, onSearchByFilter } =
    useFetchInvoiceReport(formMethods)

  const showModal = useModal((state) => state.showModal)
  const modalType = useModal((state: ModalState<ModalType>) => state.modalType)
  const setShowModal = useModal((state) => state.setShowModal)
  const setIndexValue = useModal((state) => state.setValue)

  const handleGeneratePDF = async () => {
    const filters = formMethods.getValues()
    try {
      const response = await invoiceReport.getPDF(filters)
      if (!response) {
        throw new Error('Error generating PDF')
      }
      const date = new Date()

      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()

      const formattedDate = `${day}-${month}-${year}`
      downloadBlob(response, `relatório-financeiro-${formattedDate}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  return (
    <FormProvider {...formMethods}>
      <Dialog open={showModal}>
        {modalType === 'FILTER' && (
          <InvoicesReportFilter onSearch={onSearchByFilter} />
        )}
      </Dialog>

      <Page>
        <div className="mb-4 flex flex-col gap-6">
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              className="w-16"
              onClick={handleGeneratePDF} // Updated to use handleGeneratePDF
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
          <InvoiceReportTable
            data={data || []}
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
    </FormProvider>
  )
}
