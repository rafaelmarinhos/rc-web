import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'

import {
  reportInvoicesFilterFormSchema,
  ReportInvoicesSchemaFormType,
} from '@/pages/private/report-invoices/schema'
import { invoiceReport } from '@/services/invoiceReport'
import { openBlobInNewTab } from '@/utils/openFile'

interface Props {
  isFetchingPDF: boolean
  formPDF: UseFormReturn<ReportInvoicesSchemaFormType>
  onGeneratePDFByFilter(): void
}

export const useGetReportInvoiceFile = (): Props => {
  const formPDF = useForm<ReportInvoicesSchemaFormType>({
    resolver: zodResolver(reportInvoicesFilterFormSchema),
  })

  // Garante que os filtros mais recentes sejam capturados no momento correto
  const fetch = useCallback(async (): Promise<Blob | undefined> => {
    const isValid = await formPDF.trigger()

    if (!isValid) {
      return undefined
    }

    const filters = formPDF.getValues()

    const response = await invoiceReport.getPDF(filters)
    if (!response) {
      throw new Error('Erro ao gerar PDF')
    }

    openBlobInNewTab(response)

    return response
  }, [formPDF])

  const { isLoading, isRefetching, isFetching, isPending, refetch } = useQuery<
    Blob | undefined
  >({
    queryKey: [`fetch-report-invoices-pdf`],
    queryFn: fetch,
    enabled: false,
  })

  const onGeneratePDFByFilter = async () => {
    const isValid = await formPDF.trigger(undefined, { shouldFocus: true })

    if (!isValid) {
      const errors = formPDF.formState.errors
      console.log('Formulário inválido!', errors)
      return
    }
    refetch()
  }

  return {
    isFetchingPDF: isLoading || isRefetching || isFetching || isPending,
    formPDF,
    onGeneratePDFByFilter,
  }
}
