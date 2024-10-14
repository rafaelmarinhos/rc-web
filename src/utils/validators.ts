import { z } from 'zod'

export const email = z
  .string({
    required_error: 'O campo e-mail é obrigatório',
  })
  .email('E-mail inválido')

export const name = z
  .string({
    required_error: 'O campo nome é obrigatório',
  })
  .refine(
    (name) =>
      /^([a-zA-ZÀ-ú]{2,}\s(?:[a-zA-ZÀ-ú]{1,}'?-?[a-zA-ZÀ-ú]+\s)?[a-zA-ZÀ-ú]+(?:\s[a-zA-ZÀ-ú]+)?)$/u.test(
        name,
      ),
    {
      message: 'Formato de nome inválido',
    },
  )

export const password = z
  .string({
    required_error: 'O campo senha é obrigatório',
  })
  .min(6, 'Sua senha deve ter pelo menos 6 caracteres')

export const cpfValidator = (cpf: string) => {
  return /^(\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(cpf)
}

export const cnpjValidator = (cpf: string) => {
  return /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/.test(cpf)
}
