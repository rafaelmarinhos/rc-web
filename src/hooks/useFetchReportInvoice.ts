import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { InvoiceReport } from '@/interfaces/invoiceReport'
import { ModalType } from '@/interfaces/modal'
import { ReportInvoicesSchemaFormType } from '@/pages/private/report-invoices/schema'
import { invoiceReport } from '@/services/invoiceReport'
import { ModalState, useModal } from '@/store/modal-store'

interface Props {
  handlePage(page: number): void
  data: InvoiceReport[]
  isFetching: boolean
  totalPages: number
  page: number
  onSearchByFilter(): void
}

export const useFetchInvoiceReport = (
  formMethods: UseFormReturn<ReportInvoicesSchemaFormType>,
): Props => {
  const [page, setPage] = useState(1)
  const [pageItems, setPageItems] = useState<InvoiceReport[]>([])
  const [totalItems, setTotalItems] = useState<InvoiceReport[]>([])
  const itemsPerPage = 40
  const [totalPages, setTotalPages] = useState(0)

  const closeModal = useModal(
    (state: ModalState<ModalType>) => state.setShowModal,
  )

  const handleItemsPerPage = useCallback(() => {
    setPageItems(
      totalItems.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    )
    setTotalPages(Math.ceil(totalItems.length / itemsPerPage))
  }, [itemsPerPage, totalItems, page])

  useEffect(() => {
    handleItemsPerPage()
  }, [totalItems, handleItemsPerPage])

  const fetch = useCallback(async (): Promise<InvoiceReport[]> => {
    setPage(1)
    const filters = formMethods.getValues()

    const data = await invoiceReport.getAllData(filters)

    const safeData = data ?? []

    setTotalItems(safeData)
    return safeData
  }, [formMethods])

  const { isLoading, isRefetching, isFetching, refetch } = useQuery<
    InvoiceReport[]
  >({
    queryKey: [`fetch-report-invoices`],
    queryFn: fetch,
  })

  const handlePage = (pageNumber: number) => {
    setPage(pageNumber)
    handleItemsPerPage()
  }

  const onSearchByFilter = async () => {
    await refetch()
    closeModal()
  }

  return {
    data: pageItems,
    isFetching: isLoading || isRefetching || isFetching,
    handlePage,
    totalPages,
    page,
    onSearchByFilter,
  }
}
