import { LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

export const Loader = (props: React.SVGProps<SVGSVGElement>) => (
  <LoaderCircle
    className={cn(
      'relative h-6 w-6 animate-spin text-primary',
      props.className,
    )}
  />
)
