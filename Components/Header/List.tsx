import { useState, Fragment } from 'react'
import { List, ListItemButton, ListItemText, Collapse } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import SubList from './SubList'
import type { ICategories, IMenu_3 } from 'Types/Redux/Categories.d'
import type { NextPage } from 'next'

const List_3: NextPage<ICategories<IMenu_3>> = data => {
  const [open, setOpen] = useState(false)
  const toggleList = () => setOpen(!open)

  return (
    <Fragment key={data.attributes.key}>
      <ListItemButton onClick={toggleList}>
        <ListItemText>{data.attributes.value}</ListItemText>
        <FontAwesomeIcon icon={open ? faArrowUp : faArrowDown} />
      </ListItemButton>
      <Collapse in={open}>
        <List>
          {data.attributes.menu_2.data.map(i => (
            <SubList key={i.id} {...i} />
          ))}
        </List>
      </Collapse>
    </Fragment>
  )
}

export default List_3
