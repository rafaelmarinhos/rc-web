import { useNavigate } from 'react-router-dom'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { options } from './options'

export const Aside = () => {
  const navigate = useNavigate()

  const pathname = window.location.pathname

  return (
    <div className="fixed left-0 top-0 flex h-screen w-60 flex-col bg-foreground py-2">
      <div>
        {options.map((option) => (
          <Accordion key={option.name} type="single" collapsible>
            <AccordionItem value={`${option.name}-1`}>
              <AccordionTrigger>{option.name}</AccordionTrigger>
              {option.options.map((opt) => (
                <AccordionContent
                  key={opt.title}
                  onClick={() => navigate(opt.to)}
                  className={`${pathname === opt.to && 'bg-muted-foreground/40 font-semibold'}`}
                >
                  {opt.title}
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  )
}
