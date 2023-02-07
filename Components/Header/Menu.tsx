import { Fragment, useState, useLayoutEffect } from 'react'
import { Toolbar, Drawer, List, IconButton } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useGetMenu_3Query } from 'api/categories'
import Popover_Menu from './Popover'
import { useRouter } from 'next/router'
import { useAppSelector } from 'Redux/store'
import { selectParams } from 'slicers/category'
import List_3 from './List'
import type { NextPage } from 'next'

const AppBarMenu: NextPage = () => {
  const [open, setOpen] = useState(false)
  const toggleDrawer = () => setOpen(!open)
  const params = useAppSelector(selectParams)
  const { isFallback, asPath } = useRouter()
  const { data } = useGetMenu_3Query(
    { 'filters[topic][$eq]': asPath === '/contents' ? 'contents' : 'shop' },
    {
      skip: isFallback,
    }
  )

  useLayoutEffect(() => setOpen(false), [params])

  return (
    <Fragment>
      <Toolbar sx={{ display: { xs: 'none', sm: 'flex' } }}>
        {data?.data.map(m => (
          <Popover_Menu key={m.id} {...m} />
        ))}
      </Toolbar>
      <IconButton sx={{ display: { sm: 'none' } }} onClick={toggleDrawer}>
        <FontAwesomeIcon icon={faBars} />
      </IconButton>
      <Drawer
        {...{ open }}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        anchor='right'
      >
        <List>
          {data?.data.map(m => (
            <List_3 key={m.id} {...m} />
          ))}
        </List>
      </Drawer>
    </Fragment>
  )
}

export default AppBarMenu
