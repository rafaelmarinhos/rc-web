import { z } from 'zod'

export const customerFormSchema = z.object({
  name: z.string({ required_error: 'O campo nome é obrigatório' }).min(3, {
    message: 'O campo nome deve ter pelo menos 3 caracteres',
  }),
  document: z.string({ message: 'O campo documento é obrigatório' }).min(11, {
    message: 'O campo documento deve ter pelo menos 11 caracteres',
  }),
  uc: z.string({ message: 'O campo U.C é obrigatório' }).min(1, {
    message: 'O campo deve ter pelo menos 1 caracteres',
  }),
  birthDate: z.string({
    required_error: 'O campo data de nascimento é obrigatório',
  }),
  typePerson: z.string({
    required_error: 'O campo tipo Pessoa é obrigatório',
  }),
  creditNegotiated: z.string().min(1, {
    message: 'O campo credito negociado é obrigatório',
  }),
  discount: z.string().min(1, {
    message: 'O campo desconto é obrigatório',
  }),
  useRcDocument: z.string({
    required_error: 'A resposta é obrigatório',
  }),
  auxiliaryCode: z
    .string({
      required_error: 'O campo Código Auxiliar é obrigatório',
    })
    .nullable(),
  dueDay: z.string({ required_error: 'O campo vencimento é obrigatório' }),
  address: z.string().min(3, {
    message: 'O campo endereço é obrigatório',
  }),
  addressNumber: z
    .string({ required_error: 'O campo número é obrigatório' })
    .min(1, {
      message: 'O campo endereço é obrigatório',
    }),
  addressDistrict: z.string().min(3, {
    message: 'O campo bairro é obrigatório',
  }),
  addressCity: z.string().min(3, {
    message: 'O campo cidade é obrigatório',
  }),
  addressUF: z.string().min(2, {
    message: 'O campo UF é obrigatório',
  }),
  addressCEP: z.string().min(8, {
    message: 'O campo CEP deve ter 8 caracteres',
  }),
  sellerId: z.string({ required_error: 'O campo vendedor é obrigatório' }),
})

export type CustomerSchemaFormType = z.infer<typeof customerFormSchema>
