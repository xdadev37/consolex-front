import type { Dispatch, SetStateAction } from 'react'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface IHeader {
  title: string
  subheader?: string
  actions?: JSX.Element | JSX.Element[]
}

interface IOpen {
  value: boolean
  setValue: Dispatch<SetStateAction<boolean>>
}

interface ICollapse {
  open: IOpen
  backgroundColor: string
  children: JSX.Element | JSX.Element[]
}

interface IMedia {
  url?: string
  alt: string
}

interface ICard {
  header: IHeader
  backgroundColor: string
  children?: JSX.Element | JSX.Element[]
  cardActions?: JSX.Element | JSX.Element[]
  media: IMedia
  collapse?: ICollapse
  onClick?: () => void
}
