import { Invoice, InvoiceBaseCalculate } from '@/interfaces/invoice'
import {
  InvoiceDueDateSchemaFormType,
  InvoiceEditSchemaFormType,
  InvoicesSchemaFormType,
} from '@/pages/private/invoices-management/schema'
import {
  dateToISOString,
  internationalDate,
  unformatCurrency,
} from '@/utils/format'

import { get, post, remove } from '.'

export interface CustomerResponse {
  invoices: Invoice[]
  page: number
  totalPage: number
}

export const invoice = {
  getAll: async (params: InvoicesSchemaFormType): Promise<Invoice[]> => {
    const response: any = await get({
      url: '/invoice',
      config: {
        params: {
          customerFilter: params.customerFilter || undefined,
          dueStartDate: internationalDate(params.dueStartDate) || undefined,
          dueFinishDate: internationalDate(params.dueFinishDate) || undefined,
          referenceMonth: params.referenceMonth || undefined,
          status: Number(params.status) || undefined,
        },
      },
    })

    return response
  },
  approve: async (id: string) => {
    await post({
      url: `/invoice/${id}/approve`,
    })
  },
  edit: async (id: string, data: InvoiceEditSchemaFormType): Promise<any> => {
    const response = await post({
      url: `/invoice/${id}/update-info`,
      data: {
        dueDate: dateToISOString(data.dueDate),
        value: unformatCurrency(data.value),
      },
    })

    return response
  },
  changeDueDate: async (
    id: string,
    data: InvoiceDueDateSchemaFormType,
  ): Promise<void> => {
    await post({
      url: `/invoice/${id}/update-due-date`,
      data: {
        dueDate: dateToISOString(data.dueDate),
      },
    })
  },
  getDetails: async (id: string): Promise<InvoiceBaseCalculate[]> => {
    const response: any = await get({
      url: `/invoice/${id}/value-detail`,
    })

    return response
  },
  delete: async (id: string) => {
    await remove({
      url: `/invoice/${id}`,
    })
  },
  updateReduction: async (id: string, value: string) => {
    await post({
      url: `/invoice/${id}/update-reduction`,
      data: {
        value: unformatCurrency(value),
      },
    })
  },
  cancel: async (id: string) => {
    await post({
      url: `/invoice/${id}/cancel`,
    })
  },
  getFile: async (id: string): Promise<Blob> => {
    const response = await post({
      url: `/invoice/${id}/get-file`,
      config: {
        responseType: 'blob',
      },
    })

    return response
  },
}
