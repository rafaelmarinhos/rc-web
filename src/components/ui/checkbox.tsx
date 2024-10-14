import { useState } from 'react'

interface Option {
  id: string
  label: string
}

interface Props {
  options: Option[]
  onChange: (value: string) => void
  label?: string
  error?: string
  checked: string
}

export const Checkbox = ({
  onChange,
  options,
  label,
  error,
  checked,
}: Props) => {
  const [isChecked, setIsChecked] = useState<string>(checked)

  const handleRadioChange = (value: string) => {
    setIsChecked(value)
  }

  return (
    <div>
      <label
        htmlFor="roleSelect"
        className="mb-4.5 block text-xl font-bold text-black dark:text-white"
      >
        {label}
      </label>

      <div className="flex flex-wrap items-center gap-5.5">
        {options.map((option) => (
          <div key={option.id}>
            <label className="relative flex cursor-pointer select-none items-center gap-2 text-sm font-medium text-black dark:text-white">
              <input
                className="sr-only"
                type="radio"
                name="roleSelect"
                id={option.id}
                onChange={() => {
                  handleRadioChange(option.id)
                  onChange(option.id)
                }}
                checked={isChecked === option.id}
              />
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  isChecked === option.id ? 'border-primary' : 'border-body'
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full bg-primary ${
                    isChecked === option.id ? 'flex' : 'hidden'
                  }`}
                ></span>
              </span>
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error ? (
        <p className="mt-3 text-xs font-normal text-red">{error}</p>
      ) : null}
    </div>
  )
}
