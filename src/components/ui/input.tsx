import * as React from 'react'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

const inputContainer = tv({
  base: 'flex rounded-md border gap-2 outline-none transition focus-within:ring-[1px] focus-within:ring-[#3C50E0] focus-within:border-[#3C50E0] box-border',
  variants: {
    variant: {
      default: 'border-stroke  border-[1.5px]',
      disabled: 'opacity-80 bg-zinc-300',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type InputProps = React.ComponentProps<'input'> &
  React.ComponentProps<'textarea'> &
  VariantProps<typeof inputContainer>

interface Props extends InputProps {
  error?: string
  label?: string
  id: string
  disabled?: boolean
  variant?: 'default' | 'disabled'
  inputClassName?: ComponentProps<'input'>['className']
  containerClassName?: ComponentProps<'div'>['className']
  children?: React.ReactNode
}

const Input = React.forwardRef<any, Props>(
  (
    {
      className,
      inputClassName,
      containerClassName,
      type,
      label,
      id,
      disabled,
      variant = 'default',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn('flex flex-col px-[1px]', containerClassName)}>
        <span className="mb-3 text-sm font-medium text-black dark:text-white">
          {label}
        </span>
        <div className={inputContainer({ className, variant })}>
          <input
            ref={ref}
            id={id}
            type={type}
            className={cn(
              'box-border w-full rounded-md bg-transparent px-5 py-3 text-black outline-none transition-colors disabled:cursor-default disabled:bg-whiter',
              inputClassName,
            )}
            disabled={disabled}
            {...props}
          />
          {children}
        </div>
        {props.error ? (
          <p className="mt-2 text-xs font-normal text-red">{props.error}</p>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
