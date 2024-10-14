import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'

import { Invoice } from '@/interfaces/invoice'
import { ModalType } from '@/interfaces/modal'
import {
  invoicesFilterFormSchema,
  InvoicesSchemaFormType,
} from '@/pages/private/invoices-management/schema'
import { invoice } from '@/services/invoice'
import { ModalState, useModal } from '@/store/modal-store'

interface Props {
  handlePage(page: number): void
  data: Invoice[]
  isFetching: boolean
  totalPages: number
  page: number
  form: UseFormReturn<InvoicesSchemaFormType>
  onSearchByFilter(): void
}
export const useFetchInvoices = (): Props => {
  const [page, setPage] = useState(1)
  const [pageItems, setPageItems] = useState<Invoice[]>([])
  const [totalItems, setTotalItems] = useState<Invoice[]>([])
  const [itemsPerPage, setItemsPerPage] = useState(40)
  const [totalPages, setTotalPages] = useState(0)

  const closeModal = useModal(
    (state: ModalState<ModalType>) => state.setShowModal,
  )

  const form = useForm<InvoicesSchemaFormType>({
    resolver: zodResolver(invoicesFilterFormSchema),
  })

  const handleItemsPerPage = useCallback(() => {
    setPageItems(
      totalItems.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    )
    setTotalPages(Math.ceil(totalItems.length / itemsPerPage))
  }, [itemsPerPage, totalItems, page])

  useEffect(() => {
    handleItemsPerPage()
  }, [totalItems, handleItemsPerPage])

  const fetch = useCallback(async (): Promise<Invoice[] | undefined> => {
    setPage(1)
    const filters = form?.getValues()

    const data = await invoice.getAll(filters)
    setTotalItems(data)
    return data
  }, [form])

  const { isLoading, isRefetching, data, isFetching, isPending } = useQuery<
    Invoice[] | undefined
  >({
    queryKey: [`fetch-invoices`],
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
