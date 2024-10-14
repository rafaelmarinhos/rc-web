import { z } from 'zod'

export const reportExecutionFilterFormSchema = z.object({
  customerFilter: z.string(),
  executionStartDate: z.string(),
  executionFinishDate: z.string(),
  referenceMonth: z.string(),
  status: z.string(),
  onlyWithNotInvoiceCreated: z.string(),
})

export type ReportExecutionSchemaFormType = z.infer<
  typeof reportExecutionFilterFormSchema
>
