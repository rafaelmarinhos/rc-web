import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { toast } from 'sonner'

import { InvoiceBaseCalculate } from '@/interfaces/invoice'
import { ModalType } from '@/interfaces/modal'
import { invoice } from '@/services/invoice'
import { ModalState, useModal } from '@/store/modal-store'

interface Props {
  data: InvoiceBaseCalculate[] | undefined
  isFetching: boolean
}
export const useFetchInvoiceBaseCalculate = (): Props => {
  const invoiceId = useModal((state: ModalState<ModalType>) => state.value)

  const fetch = useCallback(async (): Promise<
    InvoiceBaseCalculate[] | undefined
  > => {
    try {
      const data = await invoice.getDetails(invoiceId)
      return data
    } catch (error: any) {
      toast.error('Erro', {
        description: error?.message || 'Erro ao carregar os dados',
      })
    }
  }, [invoiceId])

  const { isLoading, isRefetching, data } = useQuery<
    InvoiceBaseCalculate[] | undefined
  >({
    queryKey: ['fetch-invoice-base-calculate'],
    queryFn: fetch,
  })

  return {
    data,
    isFetching: isLoading || isRefetching,
  }
}
