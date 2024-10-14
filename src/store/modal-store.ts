import { create } from 'zustand'

export interface ModalState<T> {
  value: any
  modalType: T | undefined
  showModal: boolean
  setShowModal(value?: T): void
  resetModal(): void
  setValue(value: any): void
}

const useStoreBase = create<ModalState<any>>()((set) => ({
  value: undefined,
  modalType: undefined,
  showModal: false,
  setShowModal(data) {
    set(() => ({
      modalType: data,
      showModal: true,
    }))
  },
  setValue(data) {
    set(() => ({
      value: data,
    }))
  },
  resetModal() {
    set({
      value: undefined,
      showModal: false,
      modalType: undefined,
    })
  },
}))

export const useModal = <Item, Slice>(
  selector: (state: ModalState<Item>) => Slice,
) => useStoreBase(selector)
