import axios, { AxiosRequestConfig } from 'axios'

import { env } from '@/env'

// import { useAccessTokenStore } from '@/store/token-store'
import ResponseError from './ResponseError'

const api = axios.create({
  baseURL: env.VITE_API_URL,
  // withCredentials: true,
})

interface Params {
  data?: object
  config?: AxiosRequestConfig
  url: string
}

api.interceptors.request.use(
  async (request: any) => {
    console.log(
      `\n\n📄 | BASE URL\n${request.baseURL || ''}\n\n📄 | ENDPOINT\n${
        request.url
      }\n\n📄 | HEADERS\n${JSON.stringify(request.headers)}\n\n📄 | BODY\n${
        JSON.stringify(request.data) || ''
      }\n\n`,
    )

    // const accessToken = useAccessTokenStore.getState()?.accessToken

    // // checking if accessToken exists
    // if (accessToken) {
    //   request.headers.Authorization = accessToken
    // }
    return request
  },
  (error: any) => {
    return Promise.reject(error.response)
  },
)

// api.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error: any) => {
//     const originalRequest = error.config

//     if (error.config.url === 'Home/main') return Promise.reject(error)

//     if (error.response.status === 401) {
//       try {
//         const newToken = await tokenRevalidate()

//         if (newToken) {
//           originalRequest.headers.Authorization = newToken
//           return api.request(originalRequest)
//         }
//       } catch (error) {
//         logout()
//         return new Error('Sessão expirada')
//       }
//       return
//     }

//     return Promise.reject(error)
//   },
// )

export async function get<R>(data: Params) {
  // const accessToken = useAccessTokenStore.getState()?.accessToken

  try {
    const response = await api.get<R>(data.url, {
      ...data.config,
      headers: {
        ...data.config?.headers,

        // Authorization: accessToken,
      },
    })

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) return new ResponseError(error)
  }
}

export async function post({ url, data, config }: Params) {
  // const accessToken = useAccessTokenStore.getState()?.accessToken

  try {
    const response = await api.post(
      url,
      {
        ...data,
      },
      {
        ...config,
        headers: {
          ...config?.headers,
          // Authorization: accessToken,
          'Content-Type': 'application/json',
        },
      },
    )

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new ResponseError(error)
  }
}

export async function put({ url, data, config }: Params) {
  // const accessToken = useAccessTokenStore.getState()?.accessToken

  try {
    const response = await api.put(
      url,
      {
        ...data,
      },
      {
        ...config,
        headers: {
          ...config?.headers,
          // Authorization: accessToken,
          'Content-Type': 'application/json',
        },
      },
    )

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new ResponseError(error)
  }
}

export async function remove({ url, config }: Params) {
  // const accessToken = useAccessTokenStore.getState()?.accessToken
  try {
    const response = await api.delete(url, {
      ...config,
      headers: {
        ...config?.headers,
        // Authorization: accessToken,
      },
    })

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new ResponseError(error)
  }
}

export default api
