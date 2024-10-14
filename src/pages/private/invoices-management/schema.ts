import { z } from 'zod'

export const invoicesFilterFormSchema = z.object({
  customerFilter: z.string(),
  dueStartDate: z.string(),
  dueFinishDate: z.string(),
  referenceMonth: z.string(),
  status: z.string(),
})

export type InvoicesSchemaFormType = z.infer<typeof invoicesFilterFormSchema>

export const invoiceEditFormSchema = z.object({
  dueDate: z.string(),
  value: z.string(),
})

export type InvoiceEditSchemaFormType = z.infer<typeof invoiceEditFormSchema>

export const invoiceDueDateFormSchema = z.object({
  dueDate: z.string(),
})

export type InvoiceDueDateSchemaFormType = z.infer<
  typeof invoiceDueDateFormSchema
>
