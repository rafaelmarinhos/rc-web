import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

import { cn } from '@/lib/utils'

const Title = (props: ComponentProps<'div'>) => {
  return (
    <span
      className={cn('flex font-medium text-muted-foreground', props.className)}
    >
      {props.children}
    </span>
  )
}

const Content = (props: ComponentProps<'div'>) => {
  return (
    <div className={cn('flex text-xl font-bold text-black', props.className)}>
      {props.children}
    </div>
  )
}

const variantColorCard = tv({
  base: 'flex-col gap-8 flex rounded-md text-white bg-white shadow-md py-3 px-5',
})

const Container = ({
  children,
  className,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <div className={`${variantColorCard({ className })}`} {...props}>
      {children}
    </div>
  )
}

export const Card = {
  Title,
  Content,
  Container,
}
