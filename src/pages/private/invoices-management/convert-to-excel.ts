import { Invoice } from '@/interfaces/invoice'
import { exportToExcel } from '@/utils/export-excel'
import { ISOStringToDate } from '@/utils/format'
import { currencyMask } from '@/utils/masks'

export const convertToExcel = (items: Invoice[]) => {
  const data = items.map((item) => {
    return {
      Cliente: item.status,
      UC: item.uc,
      'Mês de referência': item.referenceMonth,
      Vencimento: ISOStringToDate(item.dueDate),
      Valor: currencyMask(item.value),
      'Nosso Número': item.rcNumber,
      'Sicoob Número': item.sicoobNumber,
      'Data de pagamento': ISOStringToDate(item.dateOfPayment),
      Status: item.status,
    }
  })

  exportToExcel({
    data,
    fileName: 'Relatório de faturas',
  })
}
