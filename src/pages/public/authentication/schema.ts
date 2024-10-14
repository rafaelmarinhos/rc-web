import { z } from 'zod'

import { email, password } from '@/utils/validators'

export const authenticationFormSchema = z.object({
  email,
  password,
})

export type AuthenticationFormType = z.infer<typeof authenticationFormSchema>
