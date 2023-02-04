import { useState, Fragment } from 'react'
import { List, ListItemButton, ListItemText, Collapse } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch } from 'Redux/store'
import { setParams } from 'slicers/category'
import type { ICategories, IMenu_2 } from 'Types/Redux/Categories.d'
import type { NextPage } from 'next'

const SubList: NextPage<ICategories<IMenu_2>> = data => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const toggleList = () => setOpen(!open)
  const setParamsHandler = (value: string) => () =>
    dispatch(setParams({ 'filters[menu_1][key][$eq]': value }))

  return (
    <Fragment key={data.attributes.key}>
      <ListItemButton onClick={toggleList}>
        <ListItemText>{data.attributes.value}</ListItemText>
        <FontAwesomeIcon icon={open ? faArrowUp : faArrowDown} />
      </ListItemButton>
      <Collapse in={open}>
        <List>
          {data.attributes.menu_1.data.map(i => (
            <ListItemButton
              key={i.attributes.key}
              onClick={setParamsHandler(i.attributes.key)}
            >
              <ListItemText>{i.attributes.value}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </Fragment>
  )
}

export default SubList
