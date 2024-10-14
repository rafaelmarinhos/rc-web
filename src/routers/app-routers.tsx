import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from '@/pages/_layout/auth'
import { Customers } from '@/pages/private/customers/customers'
import { Dashboard } from '@/pages/private/dashboard/dashboard'
import { InvoicesManagement } from '@/pages/private/invoices-management/invoices-management'
import { ReportExecution } from '@/pages/private/report-execution/report-execution'
import { InvoiceReport } from '@/pages/private/report-invoices/report-invoices'
import { Setting } from '@/pages/private/settings/settings'
import { Authentication } from '@/pages/public/authentication/authentication'

import { PrivateRoutes } from './private-routes'
import { ROUTES } from './routes'

export const routers = createBrowserRouter([
  {
    path: ROUTES.AUTHENTICATION,
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.AUTHENTICATION,
        element: <Authentication />,
      },
    ],
  },
  {
    path: ROUTES.DASHBOARD,
    element: <PrivateRoutes />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: ROUTES.CUSTOMERS,
    element: <PrivateRoutes />,
    children: [
      {
        path: ROUTES.CUSTOMERS,
        element: <Customers />,
      },
    ],
  },
  {
    path: ROUTES.EXECUTION_REPORT,
    element: <PrivateRoutes />,
    children: [
      {
        path: ROUTES.EXECUTION_REPORT,
        element: <ReportExecution />,
      },
    ],
  },
  {
    path: ROUTES.INVOICES_REPORT,
    element: <PrivateRoutes />,
    children: [
      {
        path: ROUTES.INVOICES_REPORT,
        element: <InvoiceReport />,
      },
    ],
  },
  {
    path: ROUTES.INVOICES_MANAGEMENT,
    element: <PrivateRoutes />,
    children: [
      {
        path: ROUTES.INVOICES_MANAGEMENT,
        element: <InvoicesManagement />,
      },
    ],
  },
  {
    path: ROUTES.SETTINGS,
    element: <PrivateRoutes />,
    children: [
      {
        path: ROUTES.SETTINGS,
        element: <Setting />,
      },
    ],
  },
])
