export interface Address {
  address: string
  cep: string
  city: string
  district: string
  uf: string
  number: string
}

export const TypePerson = {
  1: 'Física',
  2: 'Jurídica',
} as const

export const Status = {
  1: 'Ativo',
  2: 'Inativo',
} as const

export interface Customer {
  id: string
  address: Address
  birthDate: string
  creditNegotiated: number
  discount: number
  document: string
  dueDay: number
  name: string
  seller: string
  sellerId: string
  uc: string
  typePerson: keyof typeof TypePerson
  status: keyof typeof TypePerson
  useRcDocument: string
  auxiliaryCode: string
}
