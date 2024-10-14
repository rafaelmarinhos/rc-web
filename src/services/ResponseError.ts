import { AxiosError } from 'axios'

export default class ResponseError {
  message: string
  code: number
  returnCode?: number

  constructor({ response }: AxiosError | unknown | any) {
    this.message =
      response?.data?.message ||
      'Desculpe, ocorreu um erro. Tente novamente mais tarde.'
    this.code = response?.status || 0
    this.returnCode = response?.code
  }
}
