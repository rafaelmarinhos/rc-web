import { Customer } from '@/interfaces/customer'
import { ReportExecution } from '@/interfaces/report'
import { ReportExecutionSchemaFormType } from '@/pages/private/report-execution/schema'
import { internationalDate } from '@/utils/format'

import { get, post } from '.'

export interface CustomerResponse {
  customers: Customer[]
  page: number
  totalPage: number
}

export const report = {
  getAll: async (
    params: ReportExecutionSchemaFormType,
  ): Promise<ReportExecution[]> => {
    const response: any = await get({
      url: '/execution',
      config: {
        params: {
          customerFilter: params.customerFilter || undefined,
          executionStartDate:
            internationalDate(params.executionStartDate) || undefined,
          executionFinishDate:
            internationalDate(params.executionFinishDate) || undefined,
          referenceMonth: params.referenceMonth || undefined,
          status: params.status || undefined,
          onlyWithNotInvoiceCreated: params.onlyWithNotInvoiceCreated === 'sim',
        },
      },
    })

    return response
  },
  changeStatus: async (id: string) => {
    await post({
      url: `/execution/${id}/inactive`,
    })
  },
  generate: async (id: string) => {
    await post({
      url: `/invoice/${id}/create-from-execution`,
    })
  },
  delete: async (id: string) => {
    await post({
      url: `/execution/${id}/inactivate`,
    })
  },
}
