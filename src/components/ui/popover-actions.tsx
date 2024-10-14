import { VerticalDots } from '@/assets/vertical-dots'

import { Popover, PopoverContent, PopoverTrigger } from './popover'

interface Props {
  items: {
    title: string
    action: () => void
    isRed?: boolean
  }[]
}
export const PopoverActions = ({ items }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#292D32]/10">
          <VerticalDots />
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col items-start rounded-md">
        {items?.map((item, index) => (
          <div
            key={index}
            className={`w-full rounded-sm px-3 py-1 ${item.isRed && 'text-red'} ${item.isRed ? 'hover:bg-red/10' : 'hover:bg-muted-foreground/10'}`}
          >
            <button onClick={item.action}>{item.title}</button>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
