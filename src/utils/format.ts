import moment from 'moment'

export const screenDate = (date: Date) => {
  if (!date || date.toString() === 'Invalid Date') return ''

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export const onlyNumbers = (value: string) => {
  if (!value) return ''
  return value.replace(/\D/g, '')
}

export const ISOStringToDate = (date: string | null | Date) => {
  if (!date) return ''

  return moment(date).format('DD/MM/YYYY')
}

export const dateToISOString = (date: string | null | Date) => {
  if (!date) return ''

  if (
    typeof date === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(date)
  ) {
    return date
  }

  return moment(date, 'DD/MM/YYYY').toISOString()
}

export const internationalDate = (date: string | null | Date) => {
  if (!date) return ''

  return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
}

export const formatCurrency = (value: number | string) => {
  if (!value) return '0'

  const valueAsNumber = Number(value.toString().replace(/\D/g, '')) / 100

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })
  return formatter.format(valueAsNumber)
}

export const unformatCurrency = (value: string): number | string => {
  if (!value) return ''

  const cleanValue = value.replace(/[R$\s.]/g, '').replace(',', '.')

  return parseFloat(cleanValue)
}
