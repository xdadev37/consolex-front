import type { Dispatch, SetStateAction } from 'react'

type Options = Record<string, any> | Record<string, any>[]
interface ISelectors {
  tabIndex?: number
  placeholder?: string
  options: Record<string, any>[]
  multiple?: boolean
  optionLabel: string
  hintText?: string
  defaultValue?: Options
  value?: Options
  disabled?: boolean
  reverseFlexDirection?: boolean
  onChange:
    | Dispatch<SetStateAction<Options>>
    | ((options: Options) => void | Promise<void>)
}
