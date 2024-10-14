import { useEffect, useState } from 'react'

import { Page } from '@/components/page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import { useEditSettings } from '@/hooks/useEditSettings'
import { useFetchSettings } from '@/hooks/useFetchSettings'

export const Setting = () => {
  const { data, isFetching } = useFetchSettings()
  const { onSubmit, isSubmitting } = useEditSettings()

  const [equatorialFee, setEquatorialFee] = useState<any>(data?.equatorialFee)
  const [rcCoopFee, setRcCoopFee] = useState<any>(data?.rcCoopFee)
  const [alertMarginDown, setAlertMarginDown] = useState<any>(
    data?.alertMarginDown,
  )
  const [alertMarginUp, setAlertMarginUp] = useState<any>(data?.alertMarginUp)
  const [rcCoopDocument, setRcCoopDocument] = useState<any>(
    data?.rcCoopDocument,
  )

  useEffect(() => {
    setEquatorialFee(data?.equatorialFee || 0)
    setRcCoopFee(data?.rcCoopFee || 0)
    setAlertMarginDown(data?.alertMarginDown || 0)
    setAlertMarginUp(data?.alertMarginUp || 0)
    setRcCoopDocument(data?.rcCoopDocument || 0)
  }, [data])

  const handleSubmit = () => {
    onSubmit({
      equatorialFee: Number(equatorialFee),
      rcCoopFee: Number(rcCoopFee),
      alertMarginDown: Number(alertMarginDown),
      alertMarginUp: Number(alertMarginUp),
      rcCoopDocument,
    })
  }

  return (
    <Page className="items-center">
      <div className="mt-10 flex h-[33rem] w-[52rem] flex-col gap-4 rounded-sm border border-stroke bg-white shadow-default">
        <div className="border-b border-stroke p-4 dark:border-strokedark">
          <h4 className="ml-2 text-xl font-bold text-black dark:text-white">
            Parâmetros Gerais
          </h4>
        </div>

        {isFetching && (
          <div className="flex h-full items-center justify-center">
            <Loader className="h-16 w-16" />
          </div>
        )}

        {!isFetching && (
          <div className="mx-2 gap-4 p-4">
            <div className="grid grid-cols-2 gap-8">
              <Input
                id="taxa-equatorial"
                label="Taxa equatorial"
                disabled={isFetching}
                onChange={(e) => setEquatorialFee(e.target.value)}
                value={equatorialFee}
              />
              <Input
                id="taxa-rc-coop"
                label="Taxa RC COOP"
                disabled={isFetching}
                onChange={(e) => setRcCoopFee(e.target.value)}
                value={rcCoopFee}
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-8">
              <Input
                id="alerta-proximidade"
                label="Alerta de proximidade"
                disabled={isFetching}
                onChange={(e) => setAlertMarginDown(e.target.value)}
                value={alertMarginDown}
              />
              <Input
                id="alerta-excedente"
                label="Alerta de excedente"
                disabled={isFetching}
                onChange={(e) => setAlertMarginUp(e.target.value)}
                value={alertMarginUp}
              />
            </div>

            <div className="mt-6 grid grid-cols-2">
              <Input
                id="cnpj"
                label="CNPJ RC"
                disabled={isFetching}
                onChange={(e) => setRcCoopDocument(e.target.value)}
                value={rcCoopDocument}
                className="w-94"
              />
            </div>

            <div className="mt-12 flex w-full">
              <Button
                loading={isSubmitting}
                onClick={handleSubmit}
                className="w-full"
              >
                Salvar
              </Button>
            </div>
          </div>
        )}
      </div>
    </Page>
  )
}
