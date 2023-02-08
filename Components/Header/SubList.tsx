import { useState, Fragment } from 'react'
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch } from 'Redux/store'
import { setParams } from 'slicers/category'
import type { ICategories, IMenu_2 } from 'Types/Redux/Categories.d'
import type { NextPage } from 'next'

const SubList: NextPage<ICategories<IMenu_2>> = data => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const toggleList = () => setOpen(!open)
  const setParamsHandler = (value: string) => () =>
    dispatch(setParams({ 'filters[menu_1s][key][$eq]': value }))

  return (
    <Fragment key={data.attributes.key}>
      <ListItemButton onClick={toggleList}>
        <ListItemText
          sx={{ textAlign: 'right', paddingLeft: 10, paddingRight: 3 }}
        >
          {data.attributes.value}
        </ListItemText>
        <FontAwesomeIcon icon={open ? faCaretUp : faCaretDown} />
      </ListItemButton>
      <Divider />
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List disablePadding>
          {data.attributes.menu_1s.data.map(i => (
            <ListItemButton
              key={i.attributes.key}
              onClick={setParamsHandler(i.attributes.key)}
            >
              <ListItemText sx={{ textAlign: 'right', paddingRight: 6 }}>
                {i.attributes.value}
              </ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </Fragment>
  )
}

export default SubList
