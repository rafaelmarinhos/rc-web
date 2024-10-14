import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { BaseSyntheticEvent, useMemo } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import { Invoice } from '@/interfaces/invoice'
import { ModalType } from '@/interfaces/modal'
import { queryClient } from '@/lib/react-query'
import {
  invoiceDueDateFormSchema,
  InvoiceDueDateSchemaFormType,
} from '@/pages/private/invoices-management/schema'
import { invoice as invoiceService } from '@/services/invoice'
import { ModalState, useModal } from '@/store/modal-store'
import { ISOStringToDate } from '@/utils/format'

interface Props {
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => void
  form: UseFormReturn<InvoiceDueDateSchemaFormType>
}

export const useChangeInvoiceDueDate = (): Props => {
  const invoice = useModal(
    (state: ModalState<ModalType>) => state.value as Invoice,
  )
  const closeModal = useModal((state) => state.setShowModal)

  const initialValues: InvoiceDueDateSchemaFormType | undefined =
    useMemo(() => {
      if (!invoice) return

      return {
        dueDate: ISOStringToDate(invoice.dueDate),
      }
    }, [invoice])

  const form = useForm<InvoiceDueDateSchemaFormType>({
    resolver: zodResolver(invoiceDueDateFormSchema),
    defaultValues: initialValues,
  })

  const { handleSubmit } = form

  const { mutateAsync: edit } = useMutation<
    void,
    unknown,
    { id: string; data: InvoiceDueDateSchemaFormType }
  >({
    mutationFn: async ({ id, data }) => {
      await invoiceService.changeDueDate(id, data)
    },
    onSuccess() {
      toast.success('Sucesso', {
        description: 'Data de vencimento alterada',
      })
      closeModal()
      queryClient.refetchQueries({
        queryKey: [`fetch-invoices`],
      })
    },
  })

  const onSubmit = async (data: InvoiceDueDateSchemaFormType) => {
    await edit({ id: invoice.id, data })
  }

  return {
    onSubmit: handleSubmit(onSubmit),
    form,
  }
}
