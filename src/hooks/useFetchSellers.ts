import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'

import { SelectOption } from '@/interfaces/select'
import { customer } from '@/services/customer'

interface Props {
  data: SelectOption[] | undefined
  isFetching: boolean
}
export const useFetchSellers = (): Props => {
  const fetch = useCallback(async (): Promise<SelectOption[] | undefined> => {
    const data = await customer.getSellers()
    return data
  }, [])

  const { isLoading, isRefetching, data } = useQuery<
    SelectOption[] | undefined
  >({
    queryKey: ['fetch-sellers'],
    queryFn: fetch,
  })

  return {
    data,
    isFetching: isLoading || isRefetching,
  }
}
