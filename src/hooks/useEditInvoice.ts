import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { BaseSyntheticEvent, useMemo } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import { Invoice } from '@/interfaces/invoice'
import { ModalType } from '@/interfaces/modal'
import { queryClient } from '@/lib/react-query'
import {
  invoiceEditFormSchema,
  InvoiceEditSchemaFormType,
} from '@/pages/private/invoices-management/schema'
import { invoice as invoiceService } from '@/services/invoice'
import { ModalState, useModal } from '@/store/modal-store'
import { ISOStringToDate } from '@/utils/format'
import { currencyMask } from '@/utils/masks'

interface Props {
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => void
  form: UseFormReturn<InvoiceEditSchemaFormType>
}

export const useEditInvoice = (): Props => {
  const invoice = useModal(
    (state: ModalState<ModalType>) => state.value as Invoice,
  )
  const closeModal = useModal((state) => state.setShowModal)

  const initialValues: InvoiceEditSchemaFormType | undefined = useMemo(() => {
    if (!invoice) return

    return {
      dueDate: ISOStringToDate(invoice.dueDate),
      value: currencyMask(invoice.value),
    }
  }, [invoice])

  const form = useForm<InvoiceEditSchemaFormType>({
    resolver: zodResolver(invoiceEditFormSchema),
    defaultValues: initialValues,
  })

  const { handleSubmit } = form

  const { mutateAsync: edit } = useMutation<
    void,
    unknown,
    { id: string; data: InvoiceEditSchemaFormType }
  >({
    mutationFn: async ({ id, data }) => {
      await invoiceService.edit(id, data)
    },
    onSuccess() {
      toast.success('Sucesso', {
        description: 'Fatura alterada',
      })
      closeModal()
      queryClient.refetchQueries({
        queryKey: [`fetch-invoices`],
      })
    },
    onError(e: any) {
      toast.error('Erro', {
        description: e.message,
      })
    },
  })

  const onSubmit = async (data: InvoiceEditSchemaFormType) => {
    await edit({ id: invoice.id, data })
  }

  return {
    onSubmit: handleSubmit(onSubmit),
    form,
  }
}
