import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export const Page = (props: ComponentProps<'div'>) => {
  return (
    <div className={cn('flex h-full w-full flex-col p-10', props.className)}>
      {props.children}
    </div>
  )
}
