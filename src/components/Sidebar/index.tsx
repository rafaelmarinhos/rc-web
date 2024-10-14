import { Landmark, LogOut, Settings, Sheet, User } from 'lucide-react'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { ChevronUpDown } from '@/assets/chevron-up-down'
import { DashboardIcon } from '@/assets/dashboard'
import Logo from '@/assets/logo.png'
import { ROUTES } from '@/routers/routes'

import SidebarLinkGroup from './SidebarLinkGroup'

export const Sidebar = () => {
  const location = useLocation()
  const { pathname } = location

  return (
    <aside
      className={`fixed left-0 top-0 flex h-screen w-72 flex-col bg-black duration-300 ease-linear dark:bg-boxdark`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-8 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-hidden overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 flex h-screen flex-col justify-between px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to={ROUTES.DASHBOARD}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('dashboard') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <DashboardIcon />
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={ROUTES.CUSTOMERS}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('clientes') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <User size={20} />
                  Clientes
                </NavLink>
              </li>

              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/' ||
                            pathname.includes('relatorios')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          handleClick()
                        }}
                      >
                        <Sheet size={20} />
                        Relatórios
                        <ChevronUpDown open={open} />
                      </NavLink>

                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mb-5 mt-4 flex flex-col gap-2 pl-6">
                          <li>
                            <NavLink
                              to={ROUTES.EXECUTION_REPORT}
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Relatório de execução
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mb-5 flex flex-col gap-2 pl-6">
                          <li>
                            <NavLink
                              to={ROUTES.INVOICES_REPORT}
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Relatório financeiro
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>

              <li>
                <NavLink
                  to={ROUTES.INVOICES_MANAGEMENT}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('faturas') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <Landmark size={20} />
                  Faturas
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={ROUTES.SETTINGS}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('configuracoes-gerais') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <Settings size={20} />
                  Parâmetros Gerais
                </NavLink>
              </li>
            </ul>
          </div>

          <NavLink
            to={ROUTES.AUTHENTICATION}
            className={`' } group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark hover:text-rose-500 dark:hover:bg-meta-4`}
          >
            <LogOut size={20} />
            Sair
          </NavLink>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  )
}
