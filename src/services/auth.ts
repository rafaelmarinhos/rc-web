import { get } from '.'

export const auth = {
  login: async (params: any) => {
    await get({
      url: '/auth/login',
      config: {
        params,
      },
    })
  },
}
