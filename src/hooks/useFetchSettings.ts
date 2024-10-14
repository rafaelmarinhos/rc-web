import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'

import { Settings } from '@/interfaces/settings'
import { settings } from '@/services/settings'

interface Props {
  data: Settings | undefined
  isFetching: boolean
}
export const useFetchSettings = (): Props => {
  const fetch = useCallback(async (): Promise<Settings | undefined> => {
    const data = await settings.get()
    return data
  }, [])

  const { isLoading, isRefetching, data } = useQuery<Settings | undefined>({
    queryKey: ['fetch-settings'],
    queryFn: fetch,
  })

  return {
    data,
    isFetching: isLoading || isRefetching,
  }
}
