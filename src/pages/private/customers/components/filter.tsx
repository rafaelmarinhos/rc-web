import { useState } from 'react'

import { ModalContent, ModalPage } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ModalType } from '@/interfaces/modal'
import { ModalState, useModal } from '@/store/modal-store'

export const CustomersFilter = () => {
  const closeModal = useModal(
    (state: ModalState<ModalType>) => state.setShowModal,
  )
  const values = useModal((state: ModalState<ModalType>) => state.value)
  const filter = values?.customerFilter || ''

  const onSetFilter = useModal((state: ModalState<ModalType>) => state.setValue)

  const [currentFilter, setCurrentFilter] = useState(filter)

  const onClearFilter = () => {
    setCurrentFilter('')
  }

  const onChangeFilter = (value: string) => {
    setCurrentFilter(value)
  }

  return (
    <ModalPage title="Filtro" showCloseButton>
      <ModalContent>
        <div className="flex flex-wrap gap-4">
          <Input
            id="Search"
            label="Pesquisar"
            placeholder="Nome, documento ou UC"
            className="w-100"
            onChange={(e) => onChangeFilter(e.target.value)}
            value={currentFilter}
            defaultValue={currentFilter}
          />
        </div>
      </ModalContent>

      <ModalContent className="mb-8 mt-16 w-full flex-row gap-0">
        <Button
          variant="outline"
          className="mr-4 w-full"
          onClick={onClearFilter}
        >
          Limpar
        </Button>
        <Button
          onClick={() => {
            onSetFilter({
              customerFilter: currentFilter,
            })
            closeModal()
          }}
          className="w-full"
        >
          Pesquisar
        </Button>
      </ModalContent>
    </ModalPage>
  )
}
