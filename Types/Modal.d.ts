import type { Dispatch, SetStateAction } from 'react'
import type { IImages } from 'Types/Redux/Images'
import type { IData } from 'Types/BaseQuery'

interface IModal extends IImages {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
