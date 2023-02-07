import { Fragment } from 'react'
import { Toolbar, Drawer, Button, List } from '@mui/material'
import { useGetMenu_3Query } from 'api/categories'
import Popover_Menu from './Popover'
import { useRouter } from 'next/router'
import List_3 from './List'
import type { NextPage } from 'next'

const AppBarMenu: NextPage = () => {
  const { isFallback } = useRouter()
  const menu_3 = useGetMenu_3Query(undefined, {
    skip: isFallback,
  })

  return (
    <Fragment>
      <Toolbar>
        {menu_3.data?.data.map(m => (
          <Popover_Menu key={m.id} {...m} />
        ))}
      </Toolbar>
      <Drawer>
        <List>
          {menu_3.data?.data.map(m => (
            <List_3 key={m.id} {...m} />
          ))}
        </List>
      </Drawer>
    </Fragment>
  )
}

export default AppBarMenu
