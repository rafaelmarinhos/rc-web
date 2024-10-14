import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'

import { ModalType } from '@/interfaces/modal'
import { ReportExecution } from '@/interfaces/report'
import {
  reportExecutionFilterFormSchema,
  ReportExecutionSchemaFormType,
} from '@/pages/private/report-execution/schema'
import { report } from '@/services/report'
import { ModalState, useModal } from '@/store/modal-store'

interface Props {
  handlePage(page: number): void
  data: ReportExecution[]
  isFetching: boolean
  totalPages: number
  page: number
  form: UseFormReturn<ReportExecutionSchemaFormType>
  onSearchByFilter(): void
}
export const useFetchReportExecution = (): Props => {
  const [page, setPage] = useState(1)
  const [pageItems, setPageItems] = useState<ReportExecution[]>([])
  const [totalItems, setTotalItems] = useState<ReportExecution[]>([])
  const [itemsPerPage, setItemsPerPage] = useState(40)
  const [totalPages, setTotalPages] = useState(0)

  const closeModal = useModal(
    (state: ModalState<ModalType>) => state.setShowModal,
  )

  const form = useForm<ReportExecutionSchemaFormType>({
    resolver: zodResolver(reportExecutionFilterFormSchema),
  })

  const handleItemsPerPage = useCallback(() => {
    setPageItems(
      totalItems?.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    )
    setTotalPages(Math.ceil(totalItems.length / itemsPerPage))
  }, [itemsPerPage, totalItems, page])

  useEffect(() => {
    handleItemsPerPage()
  }, [totalItems, handleItemsPerPage])

  const fetch = useCallback(async (): Promise<
    ReportExecution[] | undefined
  > => {
    setPage(1)
    const filters = form?.getValues()

    const data = await report.getAll(filters)
    setTotalItems(data)
    return data
  }, [form])

  const { isLoading, isRefetching, data, isFetching, isPending } = useQuery<
    ReportExecution[] | undefined
  >({
    queryKey: [`fetch-report-execution`],
    queryFn: fetch,
  })

  const handlePage = (page: number) => {
    setPage(page)
    handleItemsPerPage()
  }

  const onSearchByFilter = () => {
    fetch()
    closeModal()
  }

  return {
    data: pageItems,
    isFetching: isLoading || isRefetching || isFetching || isPending,
    handlePage,
    totalPages,
    page,
    form,
    onSearchByFilter,
  }
}
