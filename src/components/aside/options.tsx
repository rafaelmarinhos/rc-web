import { ROUTES } from '@/routers/routes'

export const options = [
  {
    name: 'Dashboard',
    options: [
      {
        title: 'Dashboard Financeiro',
        to: ROUTES.DASHBOARD,
      },
    ],
  },
  {
    name: 'Clientes',
    options: [
      {
        title: 'Lista de clientes',
        to: ROUTES.CUSTOMERS,
      },
    ],
  },
  {
    name: 'Relatórios',
    options: [
      {
        title: 'Relatório de execução',
        to: ROUTES.EXECUTION_REPORT,
      },
      {
        title: 'Relatório de financeiro',
        to: ROUTES.INVOICES_REPORT,
      },
    ],
  },
  {
    name: 'Gestão',
    options: [
      {
        title: 'Gestão de faturas',
        to: ROUTES.INVOICES_MANAGEMENT,
      },
    ],
  },
]
