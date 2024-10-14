import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { BaseSyntheticEvent, useMemo } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import { Customer } from '@/interfaces/customer'
import { ModalType } from '@/interfaces/modal'
import { queryClient } from '@/lib/react-query'
import {
  customerFormSchema,
  CustomerSchemaFormType,
} from '@/pages/private/customers/shema'
import { customer } from '@/services/customer'
import { ModalState, useModal } from '@/store/modal-store'
import { ISOStringToDate } from '@/utils/format'
import { getDocumentMask } from '@/utils/masks'

interface Props {
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => void
  form: UseFormReturn<CustomerSchemaFormType>
}

export const useRegisterCustomer = (): Props => {
  const user = useModal(
    (state: ModalState<ModalType>) => state.value as Customer,
  )
  const closeModal = useModal((state) => state.setShowModal)
  const modalType = useModal((state) => state.modalType)
  const resetModal = useModal((state) => state.resetModal)

  const values = useModal((state: ModalState<ModalType>) => state.value)
  const filter = values?.customerFilter || ''

  const initialValues: CustomerSchemaFormType | undefined = useMemo(() => {
    if (!user) return

    return {
      name: user.name,
      document: getDocumentMask(user.document),
      birthDate: ISOStringToDate(user.birthDate),
      typePerson: user.typePerson?.toString(),
      creditNegotiated: user.creditNegotiated?.toString(),
      discount: user.discount?.toString(),
      auxiliaryCode: user.auxiliaryCode,
      useRcDocument: user.useRcDocument,
      addressCEP: user?.address?.cep,
      address: user.address.address,
      addressNumber: user.address.number,
      addressDistrict: user.address.district,
      addressCity: user.address.city,
      addressUF: user.address.uf,
      dueDay: user.dueDay?.toString(),
      sellerId: user.sellerId,
      uc: user.uc,
    }
  }, [user])

  const form = useForm<CustomerSchemaFormType>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: initialValues,
  })

  const { handleSubmit } = form

  const { mutateAsync: register } = useMutation({
    mutationFn: customer.create,
    onSuccess() {
      toast.success('Sucesso', {
        description: 'Usuário cadastrado',
      })
      resetModal()
      queryClient.refetchQueries({
        queryKey: [`fetch-customers-$${filter}`],
      })
    },
    onError(e) {
      toast.error('Erro', {
        description: e.message,
      })
    },
  })

  const { mutateAsync: edit } = useMutation({
    mutationFn: async (data) => customer.edit(data as any, user?.id),
    onSuccess() {
      toast.success('Sucesso', {
        description: 'Usuário alterado',
      })
      resetModal()
      closeModal()
      queryClient.refetchQueries({
        queryKey: [`fetch-customers-$${filter}`],
      })
    },
    onError(e) {
      toast.error('Erro', {
        description: e.message,
      })
    },
  })

  const onSubmit = async (data: CustomerSchemaFormType) => {
    if (modalType === 'EDIT') {
      await edit(data as any)
      return
    }

    await register(data)
  }

  return {
    onSubmit: handleSubmit(onSubmit),
    form,
  }
}
