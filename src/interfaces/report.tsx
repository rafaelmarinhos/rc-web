export type Status = 'Sucesso' | 'Erro' | 'Processando'

export interface ReportExecution {
  id: string
  name: string
  uc: string
  referenceMonth: string
  referenceDate: string
  energyInjectedTotal: string
  status: Status
  message: string
  rcNumber: string
  totalToPay: string
  energyType: string
  average: string
  creditReceived: string
  creditBalance: string
  executionEnergies: {
    type: string
    unit: string
    quantity: string
    fee: string
    value: string
  }[]
  document: string
  startedAt: Date
  finishedAt: Date
  invoiceEquatorialUrlFile: string
}
