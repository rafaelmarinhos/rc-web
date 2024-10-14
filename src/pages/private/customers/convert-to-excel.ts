import { Customer, Status, TypePerson } from '@/interfaces/customer'
import { exportToExcel } from '@/utils/export-excel'
import { cpfCnpjMask } from '@/utils/masks'

export const convertToExcel = (customers: Customer[]) => {
  const data = customers.map((customer) => {
    return {
      Nome: customer.name,
      Documento: cpfCnpjMask(customer.document),
      Status: Status[customer.status],
      'Tipo Pessoa': TypePerson[customer.typePerson],
      'Cod.Cooperado': customer.uc,
      'Cod.Auxiliar': customer.auxiliaryCode,
      'Cota negociada': customer.creditNegotiated,
      'Desconto (%)': customer.discount,
      'Dia de vencimento': customer.dueDay,
      'Cliente Migrado': customer.useRcDocument ? 'Sim' : 'Não',
      Vendedor: customer.seller,
    }
  })

  exportToExcel({
    data,
    fileName: 'Relatório de clientes',
  })
}
