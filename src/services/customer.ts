import { Customer } from '@/interfaces/customer'
import { SelectOption } from '@/interfaces/select'
import { CustomerSchemaFormType } from '@/pages/private/customers/shema'
import { dateToISOString, onlyNumbers } from '@/utils/format'

import { get, post, put } from '.'

export interface CustomerResponse {
  customers: Customer[]
  page: number
  totalPage: number
}

export const customer = {
  getAll: async (page = 1, filter?: string): Promise<CustomerResponse> => {
    const response: any = await get({
      url: '/customers',
      config: {
        params: {
          page,
          filter,
        },
      },
    })

    const data = response.map((customer: any) => ({
      id: customer.id,
      address: {
        address: customer.address,
        cep: customer?.addressCEP,
        city: customer.addressCity,
        district: customer.addressDistrict,
        uf: customer.addressUF,
        number: customer.addressNumber,
      },
      birthDate: new Date(customer?.birthDate).toISOString() || '',
      creditNegotiated: customer.creditNegotiated,
      discount: customer.discount,
      document: customer.document,
      dueDay: customer.dueDay,
      name: customer.name,
      sellerId: customer.sellerId,
      seller: customer.seller,
      uc: customer.uc,
      typePerson: customer.typePerson,
      status: customer.status,
      useRcDocument: customer.useRcDocument ? 'sim' : 'nao',
      auxiliaryCode: customer.auxiliaryCode,
    }))

    return { customers: data, page: 1, totalPage: 1 }
  },
  create: async (customer: CustomerSchemaFormType) => {
    const data = {
      ...customer,
      document: onlyNumbers(customer.document),
      addressCEP: onlyNumbers(customer.addressCEP),
      useRcDocument: customer.useRcDocument === 'sim',
      typePerson: Number(customer.typePerson),
      birthDate: dateToISOString(customer.birthDate),
    }

    await post({
      url: '/customers',
      data,
    })
  },
  edit: async (customer: CustomerSchemaFormType, customerId: string) => {
    const data = {
      ...customer,
      document: onlyNumbers(customer.document),
      addressCEP: onlyNumbers(customer.addressCEP),
      useRcDocument: customer.useRcDocument === 'sim',
      status: 1,
      birthDate: dateToISOString(customer.birthDate),
      typePerson: Number(customer.typePerson),
    }

    await put({
      url: `/customers/${customerId}`,
      data,
    })
  },
  changeStatus: async (id: string) => {
    await put({
      url: `/customers/${id}/change-status`,
    })
  },
  getSellers: async (): Promise<SelectOption[]> => {
    const response: any = await get({
      url: `/sellers`,
    })

    const sellers = response?.map((seller: any) => ({
      value: seller.id,
      label: seller.name,
    })) as SelectOption[]

    return sellers
  },
  execute: async (id: string): Promise<void> => {
    await post({
      url: `/execution`,
      config: {
        params: {
          id,
        },
      },
    })
  },
}
