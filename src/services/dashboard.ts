import { Dashboard } from '@/interfaces/dashboard'

import { get } from '.'

export const dashboard = {
  get: async (): Promise<Dashboard> => {
    const response = (await get({
      url: '/dashboard',
    })) as Dashboard

    return response
  },
}
