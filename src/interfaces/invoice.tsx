export const Status = {
  1: 'Aguardando aprovação',
  2: 'Em aberto',
  3: 'Pago',
  4: 'Em atraso',
  5: 'Baixado',
} as const

export interface Invoice {
  id: string
  name: string
  uc: string
  referenceMonth: string
  invoiceEquatorialUrlFile: string
  dueDate: Date
  value: number
  rcNumber: number
  sicoobNumber: number
  dateOfPayment: Date
  paymentType: string
  status: typeof Status
  statusCode: keyof typeof Status
}

export interface InvoiceBaseCalculate {
  description: string
  value: number
  isTotal: boolean
}
