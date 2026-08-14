import { Fragment, useState, useEffect, memo } from 'react'
import {
  Toolbar,
  Drawer,
  List,
  IconButton,
  Typography,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useGetMenu_3Query } from 'api/categories'
import Popover_Menu from './Popover'
import { useAppDispatch, useAppSelector } from 'Redux/store'
import { useRouter } from 'next/router'
import { selectParams, setMainPage, setParams } from 'slicers/category'
import List_3 from './List'
import Loading from 'Modules/Loading'
import type { NextPage } from 'next'

const AppBarMenu: NextPage = () => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const toggleDrawer = () => setOpen(!open)
  const params = useAppSelector(selectParams)
  const { isFallback, pathname, push } = useRouter()
  const { data, isLoading } = useGetMenu_3Query(
    { 'filters[topic][$eq]': pathname === '/contents' ? 'contents' : 'shop' },
    {
      skip: isFallback,
    },
  )
  const mainPage = () => {
    pathname === '/' && dispatch(setMainPage(true))
    return dispatch(setParams({ 'filters[menu_1s][key][$eq]': undefined }))
  }
  const gamesPage = () => {
    push('/contents')
    return dispatch(setParams({ 'filters[menu_1s][key][$eq]': 'swny' }))
  }

  useEffect(() => setOpen(false), [params])

  return (
    <Fragment>
      <Toolbar sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Typography
          onClick={mainPage}
          marginLeft={1}
          sx={{ cursor: 'pointer' }}
        >
          صفحه اصلی
        </Typography>
        <Typography
          onClick={gamesPage}
          marginLeft={1}
          sx={{ cursor: 'pointer' }}
        >
          لیست بازی ها
        </Typography>
        {data?.map(m => (
          <Popover_Menu key={m.id} d={m} />
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
          <ListItemButton onClick={mainPage}>
            <ListItemText sx={{ textAlign: 'right' }}>صفحه اصلی</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={gamesPage}>
            <ListItemText sx={{ textAlign: 'right' }}>
              لیست بازی ها
            </ListItemText>
          </ListItemButton>
          {data?.map(m => (
            <List_3 key={m.id} {...m} />
          ))}
        </List>
      </Drawer>
      <Loading open={isLoading} />
    </Fragment>
  )
}

export default memo(AppBarMenu)
