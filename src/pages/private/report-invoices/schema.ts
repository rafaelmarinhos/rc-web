import { z } from 'zod'

export const reportInvoicesFilterFormSchema = z.object({
  customerFilter: z.string().optional(),
  rcNumber: z.string().optional(),
  sicoobNumber: z.string().optional(),
  dateOfIssueStart: z.string().optional(),
  dateOfIssueFinish: z.string().optional(),
  dueDateStart: z.string().optional(),
  dueDateFinish: z.string().optional(),
  dateOfPaymentStart: z.string().optional(),
  dateOfPaymentFinish: z.string().optional(),
  paymentType: z.string().optional(),
  includeWaitingApproval: z.boolean().default(true),
  inclusePaymentPending: z.boolean().default(true),
  includePaid: z.boolean().default(true),
  includeOverdue: z.boolean().default(true),
  includeCanceled: z.boolean().default(true),
})

export type ReportInvoicesSchemaFormType = z.infer<
  typeof reportInvoicesFilterFormSchema
>
