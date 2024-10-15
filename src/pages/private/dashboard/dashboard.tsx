import { Page } from '@/components/page'
import { DataStatistic } from '@/components/ui/data-statistic'
import { useFetchDashboard } from '@/hooks/useDashboard'

export const Dashboard = () => {
  const { data, isFetching } = useFetchDashboard()

  return (
    <Page>
      <div className="flex flex-col space-y-10 rounded-md">
        <DataStatistic.Container title="Totalizadores">
          <DataStatistic.Item
            text="Total de Cooperados"
            value={data?.totalCustomers}
            loading={isFetching}
          />
          {/* <DataStatistic.Item
            text="Total de energia injetada"
            value={data?.totalEnergyInjected}
            loading={isFetching}
          /> */}
          <DataStatistic.Item
            text="Quantidade de faturas geradas"
            value={data?.totalInvoices}
            loading={isFetching}            
          />
          <DataStatistic.Item
            text="Valor de faturas pagas"
            value={data?.totalInvoicesPaidValue}
            loading={isFetching}
          />
          <DataStatistic.Item
            text="Valor de faturas em atraso"
            value={data?.totalInvoicesOverdueValue}
            loading={isFetching}
            showDivider={false}
          />
        </DataStatistic.Container>
      </div>
    </Page>
  )
}
