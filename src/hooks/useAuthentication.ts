import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'

import {
  authenticationFormSchema,
  AuthenticationFormType,
} from '@/pages/public/authentication/schema'
import { auth } from '@/services/auth'

interface Props {
  passwordType: string
  onChangePasswordType: () => void
  onSubmit: (params: any) => void
  form: UseFormReturn<AuthenticationFormType>
}

export const useAuthentication = (): Props => {
  const [passwordType, setPasswordType] = useState('password')

  const form = useForm<AuthenticationFormType>({
    resolver: zodResolver(authenticationFormSchema),
  })

  const { handleSubmit } = form

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: auth.login,
    onSuccess(e) {
      console.log(e)
    },
  })

  const onSubmit = async (params: any) => {
    const { email, password } = params
    await authenticate({
      email,
      password,
    })

    console.log(params)
  }

  const onChangePasswordType = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }

  return {
    passwordType,
    onChangePasswordType,
    onSubmit: handleSubmit(onSubmit),
    form,
  }
}
