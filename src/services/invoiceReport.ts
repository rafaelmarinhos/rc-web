import { Customer } from '@/interfaces/customer'
import { InvoiceReport } from '@/interfaces/invoiceReport'
import { ReportInvoicesSchemaFormType } from '@/pages/private/report-invoices/schema'
import { internationalDate } from '@/utils/format'

import { get } from '.'

export interface CustomerResponse {
  customers: Customer[]
  page: number
  totalPage: number
}

export const invoiceReport = {
  getAllData: async (
    params: ReportInvoicesSchemaFormType,
  ): Promise<InvoiceReport[]> => {
    const response: any = await get({
      url: '/report/invoices',
      config: {
        params: {
          customerFilter: params.customerFilter || undefined,
          rcNumber: params.rcNumber || undefined,
          sicoobNumber: params.sicoobNumber || undefined,
          dateOfIssueStart: params.dateOfIssueStart
            ? internationalDate(params.dateOfIssueStart)
            : null,
          dateOfIssueFinish: params.dateOfIssueFinish
            ? internationalDate(params.dateOfIssueFinish)
            : null,
          dueDateStart: params.dueDateStart
            ? internationalDate(params.dueDateStart)
            : undefined,
          dueDateFinish: params.dueDateFinish
            ? internationalDate(params.dueDateFinish)
            : undefined,
          dateOfPaymentStart: params.dateOfPaymentStart
            ? internationalDate(params.dateOfPaymentStart)
            : undefined,
          dateOfPaymentFinish: params.dateOfPaymentFinish
            ? internationalDate(params.dateOfPaymentFinish)
            : undefined,
          paymentType: params.paymentType || undefined,
          includeWaitingApproval: params.includeWaitingApproval,
          inclusePaymentPending: params.inclusePaymentPending,
          includePaid: params.includePaid,
          includeOverdue: params.includeOverdue,
          includeCanceled: params.includeCanceled,
        },
      },
    })

    return response
  },
  getPDF: async (params: ReportInvoicesSchemaFormType): Promise<Blob> => {
    const response: any = await get({
      url: '/report/invoices/pdf',
      config: {
        params: {
          customerFilter: params.customerFilter || undefined,
          rcNumber: params.rcNumber || undefined,
          sicoobNumber: params.sicoobNumber || undefined,
          dateOfIssueStart: params.dateOfIssueStart
            ? internationalDate(params.dateOfIssueStart)
            : undefined,
          dateOfIssueFinish: params.dateOfIssueFinish
            ? internationalDate(params.dateOfIssueFinish)
            : null,
          dueDateStart: params.dueDateStart
            ? internationalDate(params.dueDateStart)
            : undefined,
          dueDateFinish: params.dueDateFinish
            ? internationalDate(params.dueDateFinish)
            : null,
          dateOfPaymentStart: params.dateOfPaymentStart
            ? internationalDate(params.dateOfPaymentStart)
            : null,
          dateOfPaymentFinish: params.dateOfPaymentFinish
            ? internationalDate(params.dateOfPaymentFinish)
            : null,
          paymentType: params.paymentType || undefined,
          includeWaitingApproval: params.includeWaitingApproval,
          inclusePaymentPending: params.inclusePaymentPending,
          includePaid: params.includePaid,
          includeOverdue: params.includeOverdue,
          includeCanceled: params.includeCanceled,
        },
        responseType: 'blob',
      },
    })

    return response
  },
}
