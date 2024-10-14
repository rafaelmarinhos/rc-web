import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'

import { Dashboard } from '@/interfaces/dashboard'
import { dashboard } from '@/services/dashboard'

interface Props {
  data: Dashboard | undefined
  isFetching: boolean
}

export const useFetchDashboard = (): Props => {
  const fetch = useCallback(async (): Promise<Dashboard | undefined> => {
    const data = await dashboard.get()
    return data
  }, [])

  const { isLoading, isRefetching, data } = useQuery<Dashboard | undefined>({
    queryKey: ['fetch-dashboard'],
    queryFn: fetch,
  })

  return {
    data,
    isFetching: isLoading || isRefetching,
  }
}
