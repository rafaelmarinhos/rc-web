import { Page } from '@/components/page'
import { DataStatistic } from '@/components/ui/data-statistic'
import { useFetchDashboard } from '@/hooks/useDashboard'

export const Dashboard = () => {
  const { data, isFetching } = useFetchDashboard()

  return (
    <Page>
      <div className="flex flex-col space-y-10 rounded-md">
        <DataStatistic.Container title="Totalizadores gerais">
          <DataStatistic.Item
            text="Total de clientes"
            value={data?.totalCustomers}
            loading={isFetching}
          />
          <DataStatistic.Item
            text="Total de energia fornecida"
            value={data?.totalEnergySupplied}
            loading={isFetching}
          />
          <DataStatistic.Item
            text="Total de energia injetada"
            value={data?.totalEnergyInjected}
            loading={isFetching}
          />
          <DataStatistic.Item
            text="Total de faturas geradas"
            value={data?.totalInvoices}
            loading={isFetching}
            showDivider={false}
          />
        </DataStatistic.Container>

        <DataStatistic.Container title="Faturas">
          <DataStatistic.Item
            text="Total gerado"
            value={data?.totalInvoicesValue}
            loading={isFetching}
          />
          <DataStatistic.Item
            text="Aguardando Aprovação"
            value={data?.totalInvoicesWaitingApprovalValue}
            loading={isFetching}
          />
          <DataStatistic.Item
            text="Pagas"
            value={data?.totalInvoicesPaidValue}
            loading={isFetching}
          />
          <DataStatistic.Item
            text="À Receber"
            value={data?.totalInvoicesPaymentPendingValue}
            loading={isFetching}
            showDivider={false}
          />
          <DataStatistic.Item
            text="Em Atraso"
            value={data?.totalInvoicesOverdueValue}
            loading={isFetching}
          />
        </DataStatistic.Container>
      </div>
    </Page>
  )
}
