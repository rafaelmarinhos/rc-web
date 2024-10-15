import { Controller } from 'react-hook-form'

import { ModalContent, ModalPage } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useFetchSellers } from '@/hooks/useFetchSellers'
import { useRegisterCustomer } from '@/hooks/useRegisterCustomer'
import { ModalType } from '@/interfaces/modal'
import { ModalState, useModal } from '@/store/modal-store'
import { daysOfMonth } from '@/utils/days'
import { cepMask, dayMonthYearMask, getDocumentMask } from '@/utils/masks'

export const EditCustomer = () => {
  const modalType = useModal((state: ModalState<ModalType>) => state.modalType)
  const resetModal = useModal(
    (state: ModalState<ModalType>) => state.resetModal,
  )

  const { isFetching, data } = useFetchSellers()
  const { form, onSubmit } = useRegisterCustomer()

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = form

  const document = watch('document')
  const cep = watch('addressCEP')
  const birthDate = watch('birthDate')

  const options = [
    { id: 'sim', label: 'Sim' },
    { id: 'nao', label: 'Não' },
  ]

  const personType = [
    { value: '1', label: 'Pessoa Física' },
    { value: '2', label: 'Pessoa Jurídica' },
  ]

  const daysOfMonthOptions = daysOfMonth.map((day) => {
    return { value: day.toString(), label: day.toString() }
  })

  const title = modalType === 'EDIT' ? 'Editar cliente' : 'Cadastrar cliente'

  return (
    <ModalPage title={title}>
      <ModalContent title="Dados Pessoais" className="mt-8">
        <div className="flex flex-wrap gap-4">
          <Input
            label="Nome"
            id="nome"
            placeholder="Nome do cliente"
            className="w-72"
            error={form.formState.errors.name?.message}
            {...register('name')}
          />
          <Input
            label="CPF / CNPJ"
            id="cpf"
            placeholder="000.000.000-00"
            className="w-72"
            error={form.formState.errors.document?.message}
            value={getDocumentMask(document)}
            {...register('document')}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Input
            id="nascimento"
            label="Data de nascimento"
            className="w-72"
            placeholder="dd/mm/yyyy"
            value={dayMonthYearMask(birthDate)}
            {...register('birthDate')}
          />

          <Controller
            control={control}
            name={'typePerson'}
            render={({ field: { onChange, value } }) => (
              <Select
                items={personType}
                placeholder="Selecione"
                label="Tipo Pessoa"
                value={value}
                onValueChange={onChange}
                error={form.formState.errors.typePerson?.message}
              />
            )}
          />
        </div>

        <Input
          label="Unidade Consumidora"
          id="uc"
          placeholder="0"
          className="w-72"
          error={form.formState.errors.uc?.message}
          {...register('uc')}
        />
      </ModalContent>

      <ModalContent title="Financeiro" className="mt-8">
        <div className="flex flex-wrap gap-4">
          <Input
            label="Credito negociado (kW)"
            id="credito"
            placeholder="0"
            className="w-72"
            error={form.formState.errors.creditNegotiated?.message}
            {...register('creditNegotiated')}
          />
          <Input
            label="Desconto (%)"
            id="desconto"
            placeholder="0"
            className="w-72"
            error={form.formState.errors.discount?.message}
            {...register('discount')}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Input
            label="Código do cooperado"
            id="code"
            placeholder="0"
            className="w-72"
            error={form.formState.errors.auxiliaryCode?.message}
            {...register('auxiliaryCode')}
          />
          <Controller
            control={control}
            name={'dueDay'}
            render={({ field: { onChange, value } }) => (
              <Select
                items={daysOfMonthOptions}
                placeholder="Selecione"
                label="Dia de vencimento"
                value={value}
                onValueChange={onChange}
                error={form.formState.errors.dueDay?.message}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name={'sellerId'}
          render={({ field: { onChange, value } }) => (
            <Select
              items={data || []}
              loading={isFetching}
              placeholder="Selecione"
              label="Vendedor"
              value={value}
              onValueChange={onChange}
              error={form.formState.errors.sellerId?.message}
            />
          )}
        />
      </ModalContent>

      <ModalContent title="Endereço" className="mt-8">
        <div className="flex flex-wrap gap-4">
          <Input
            label="Cidade"
            id="nome"
            placeholder="Digite a cidade"
            className="w-72"
            error={form.formState.errors.addressCity?.message}
            {...register('addressCity')}
          />
          <Input
            label="UF"
            id="uf"
            placeholder="Digite a UF"
            className="w-72"
            maxLength={10}
            error={form.formState.errors.addressUF?.message}
            {...register('addressUF')}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Input
            label="Rua"
            id="nome"
            placeholder="Digite a rua"
            className="w-72"
            error={form.formState.errors.address?.message}
            {...register('address')}
          />
          <Input
            label="Bairro"
            id="nome"
            placeholder="Digite o bairro"
            className="w-72"
            error={form.formState.errors.addressDistrict?.message}
            {...register('addressDistrict')}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Input
            label="Número"
            id="nome"
            placeholder="Digite a número"
            className="w-72"
            error={form.formState.errors.addressNumber?.message}
            {...register('addressNumber')}
          />
          <Input
            label="CEP"
            id="cpf"
            placeholder="00000-000"
            className="w-72"
            maxLength={10}
            value={cepMask(cep)}
            error={form.formState.errors.addressCEP?.message}
            {...register('addressCEP')}
          />
        </div>
      </ModalContent>

      <ModalContent className="mt-6">
        <Controller
          control={control}
          name={'useRcDocument'}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              options={options}
              label="Cliente migrado?"
              error={form.formState.errors.useRcDocument?.message}
              onChange={onChange}
              checked={value}
            />
          )}
        />
      </ModalContent>

      <ModalContent className="mb-8 mt-16 w-full flex-row gap-0">
        <Button variant="outline" className="mr-4 w-full" onClick={resetModal}>
          Cancelar
        </Button>
        <Button
          loading={isSubmitting}
          className="w-full"
          onClick={handleSubmit(onSubmit as any)}
        >
          Salvar
        </Button>
      </ModalContent>
    </ModalPage>
  )
}
