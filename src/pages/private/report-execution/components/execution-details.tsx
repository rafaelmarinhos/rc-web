import { ModalContent, ModalPage } from '@/components/modal'
import { Input } from '@/components/ui/input'
import { ReportExecution } from '@/interfaces/report'
import { useModal } from '@/store/modal-store'
import { cpfCnpjMask } from '@/utils/masks'

import { ConsumptionTable } from './consumption-table'

export const ExecutionDetails = () => {
  const report = useModal((state) => state.value as ReportExecution)

  const title = 'Detalhes do relatório'

  return (
    <ModalPage title={title} showCloseButton>
      <ModalContent title="Dados pessoais" className="mt-8">
        <div className="flex flex-wrap gap-4">
          <Input
            label="Nome"
            id="nome"
            className="w-72"
            defaultValue={report?.name}
            disabled
          />
          <Input
            label="CPF / CNPJ"
            id="cpf"
            placeholder="Ex.: 000.000.000-00"
            className="w-72"
            defaultValue={cpfCnpjMask(report?.document)}
            disabled
          />
        </div>
      </ModalContent>

      <ModalContent title="Fatura" className="mt-8">
        <div className="flex flex-wrap gap-4">
          <Input
            label="Fornecimento"
            id="fornecimento"
            className="w-72"
            defaultValue={report?.energyType}
            disabled
          />
          <Input
            label="Vencimento"
            id="vencimento"
            className="w-72"
            defaultValue={report?.referenceDate}
            disabled
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Input
            label="Total a pagar"
            id="total"
            placeholder="Ex.: 000"
            className="w-72"
            defaultValue={report?.totalToPay}
            disabled
          />
          <Input
            label="Média"
            id="media"
            defaultValue={report?.average}
            disabled
            className="w-72"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Input
            label="Cota recebida"
            className="w-72"
            id="cota"
            defaultValue={report?.creditReceived}
            disabled
          />
          <Input
            label="Saldo acumulado"
            id="saldo"
            className="w-72"
            defaultValue={report?.creditBalance}
            disabled
          />
        </div>
      </ModalContent>

      <ModalContent title="Consumo" className="my-8">
        <ConsumptionTable data={report?.executionEnergies} />
      </ModalContent>
    </ModalPage>
  )
}
