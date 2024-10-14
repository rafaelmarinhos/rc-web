import { ReportExecution } from '@/interfaces/report'
import { exportToExcel } from '@/utils/export-excel'
import { ISOStringToDate } from '@/utils/format'

export const convertToExcel = (items: ReportExecution[]) => {
  const data = items.map((item) => {
    return {
      Status: item.status,
      Mensagem: item.message,
      Cliente: item.name,
      'Data inicial': ISOStringToDate(item.startedAt),
      'Data final': ISOStringToDate(item.finishedAt),
      UC: item.uc,
      'Energia Injetada': item.energyInjectedTotal,
      'N° Fatura': item.rcNumber,
      'Dia de vencimento': item.referenceDate,
    }
  })

  exportToExcel({
    data,
    fileName: 'Relatório de consumo',
  })
}
