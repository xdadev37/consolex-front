import { useState, Fragment, memo } from 'react'
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import SubList from './SubList'
import type { ICategories, IMenu_3 } from 'Types/Redux/Categories.d'
import type { NextPage } from 'next'

const List_3: NextPage<ICategories<IMenu_3>> = data => {
  const [open, setOpen] = useState(false)
  const toggleList = () => setOpen(!open)

  return (
    <Fragment key={data.attributes.key}>
      <ListItemButton onClick={toggleList}>
        <ListItemText sx={{ textAlign: 'right' }}>
          {data.attributes.value}
        </ListItemText>
        <FontAwesomeIcon icon={open ? faCaretUp : faCaretDown} />
      </ListItemButton>
      <Divider />
      <Collapse in={open}>
        <List>
          {data.attributes.menu_2s.data.map(i => (
            <SubList key={i.id} {...i} />
          ))}
        </List>
      </Collapse>
    </Fragment>
  )
}

export default memo(List_3)
