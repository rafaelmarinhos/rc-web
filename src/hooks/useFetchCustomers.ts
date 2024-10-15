import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'

import { Customer } from '@/interfaces/customer'
import { ModalType } from '@/interfaces/modal'
import { customer, CustomerResponse } from '@/services/customer'
import { ModalState, useModal } from '@/store/modal-store'

interface Props {
  handlePage(page: number): void
  data: Customer[]
  isFetching: boolean
  totalPages: number
  page: number
}
export const useFetchCustomers = (): Props => {
  const [page, setPage] = useState(1)
  const [pageItems, setPageItems] = useState<Customer[]>([])
  const [totalItems, setTotalItems] = useState<Customer[]>([])
  const [itemsPerPage] = useState(40)
  const [totalPages, setTotalPages] = useState(0)

  const values = useModal((state: ModalState<ModalType>) => state.value)
  const filter = values?.customerFilter || ''

  const fetch = useCallback(async (): Promise<CustomerResponse | undefined> => {
    setPage(1)

    const data = await customer.getAll(page, filter)
    setTotalItems(data.customers)
    return data
  }, [page, filter])

  const handleItemsPerPage = useCallback(() => {
    setPageItems(
      totalItems?.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    )
    setTotalPages(Math.ceil(totalItems.length / itemsPerPage))
  }, [itemsPerPage, totalItems, page])

  useEffect(() => {
    handleItemsPerPage()
  }, [totalItems, handleItemsPerPage])

  const { isLoading, isRefetching, isFetching, isPending } = useQuery<
    CustomerResponse | undefined
  >({
    queryKey: [`fetch-customers-$${filter}`],
    queryFn: fetch,
  })

  const handlePage = (page: number) => {
    setPage(page)
    handleItemsPerPage()
  }

  return {
    data: pageItems,
    isFetching: isLoading || isRefetching || isFetching || isPending,
    handlePage,
    totalPages,
    page,
  }
}
