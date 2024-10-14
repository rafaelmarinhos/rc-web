import { Settings } from '@/interfaces/settings'

import { get, put } from '.'

export const settings = {
  get: async (): Promise<Settings> => {
    const response = (await get({
      url: '/parameters',
    })) as Settings

    return response
  },
  edit: async (data: Settings): Promise<void> => {
    await put({
      url: '/parameters',
      data,
    })
  },
}
