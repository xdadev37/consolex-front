import type { Dispatch, SetStateAction } from 'react'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface ICard {
  header: {
    title: string
    subheader?: string
    actions?: JSX.Element | JSX.Element[]
  }
  backgroundColor: string
  children?: JSX.Element | JSX.Element[]
  cardActions?: JSX.Element | JSX.Element[]
  media: { url?: string; alt: string }
  collapse?: {
    open: { value: boolean; setValue: Dispatch<SetStateAction<boolean>> }
    backgroundColor: string
    children: JSX.Element | JSX.Element[]
  }
  onClick?: () => void
}
