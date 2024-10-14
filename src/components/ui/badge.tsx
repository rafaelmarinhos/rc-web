import { cva } from 'class-variance-authority'
import { ComponentProps } from 'react'

const variants = cva(
  'inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium',
  {
    variants: {
      variant: {
        green: 'bg-success text-success',
        red: 'bg-danger text-danger',
        yellow: 'bg-warning text-warning',
        orange: 'bg-cyan-600/10 text-cyan-600',
      },
    },
    defaultVariants: {
      variant: 'green',
    },
  },
)

interface Props {
  text: string
  variant?: 'green' | 'red' | 'yellow' | 'orange'
  className?: ComponentProps<'p'>['className']
}

export const Badge = (props: Props) => {
  return (
    <p
      className={variants({
        variant: props.variant,
        className: props.className,
      })}
    >
      {props.text}
    </p>
  )
}
