export type Status = 'Em Aberto' | 'Aguardando Aprovação' | 'Pago'

export interface InvoiceReport {
  status: Status
  customer: string
  rcNumber: number
  sicoobNumber: number
  dateOfIssue?: Date
  dueDate?: Date
  dateOfPayment?: Date
  paymentType?: string
  value: number
  paymentValue?: number
  paymentFee?: number
}
