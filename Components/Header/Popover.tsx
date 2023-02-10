import { useState, Fragment } from 'react'
import { Grid, Popper, Typography, Divider, Paper } from '@mui/material'
import { useAppDispatch } from 'Redux/store'
import { setParams } from 'slicers/category'
import Image from 'next/image'
import appSettings from 'AppSettings'
import type { ICategories, IMenu_3 } from 'Types/Redux/Categories.d'
import type { NextPage } from 'next'
import type { MouseEvent } from 'react'

const Popover_Menu: NextPage<Record<'data', ICategories<IMenu_3>[]>> = ({
  data,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [menu, setMenu] = useState<ICategories<IMenu_3>>()
  const dispatch = useAppDispatch()
  const handlePopoverOpen = (
    event: MouseEvent<HTMLElement>,
    data: ICategories<IMenu_3>
  ) => {
    setMenu(data)
    return setAnchorEl(event.currentTarget)
  }
  const handlePopoverClose = () => setAnchorEl(null)
  const open = Boolean(anchorEl)
  const setParamsHandler = (value: string) => () => {
    dispatch(setParams({ 'filters[menu_1s][key][$eq]': value }))
    return setAnchorEl(null)
  }

  return (
    <Fragment>
      {data.map(d => (
        <Typography
          key={d.attributes.key}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup='true'
          onMouseEnter={e => handlePopoverOpen(e, d)}
          marginX={2}
          marginY={1}
          zIndex={2}
        >
          {d.attributes.value}
        </Typography>
      ))}
      <Popper
        id='mouse-over-popover'
        disablePortal
        open={open}
        anchorEl={anchorEl}
        onMouseLeave={handlePopoverClose}
      >
        <Grid
          container
          justifyContent='space-between'
          component={Paper}
          sx={{
            width: '300%',
            paddingY: 2,
            paddingX: 4,
            borderRadius: 5,
            marginTop: 1,
          }}
        >
          <Grid item sm={5} md={5} lg={5}>
            {menu?.attributes.menu_2s?.data.map(m => (
              <Fragment key={m.id}>
                <Divider />
                <Typography
                  // onClick={setParamsHandler(m.attributes.key)}
                  color='red'
                  marginTop={3}
                  marginBottom={1}
                >
                  {m.attributes.value}
                </Typography>
                <Grid item sx={{ paddingRight: 2 }}>
                  {m.attributes.menu_1s?.data.map(i => (
                    <Typography
                      key={i.id}
                      onClick={setParamsHandler(i.attributes.key)}
                      sx={{ cursor: 'pointer' }}
                    >
                      {i.attributes.value}
                    </Typography>
                  ))}
                </Grid>
              </Fragment>
            ))}
          </Grid>
          <Grid item sm={6} md={6} lg={6}>
            <Image
              width='100%'
              height='100%'
              layout='responsive'
              style={{ borderRadius: 5 }}
              alt={menu?.attributes.value}
              src={`${appSettings.baseUrl}${
                menu?.attributes.image.data?.attributes.formats.medium
                  ? menu?.attributes.image.data?.attributes.formats.medium.url
                  : menu?.attributes.image.data?.attributes.formats.small?.url
              }`}
            />
          </Grid>
        </Grid>
      </Popper>
    </Fragment>
  )
}

export default Popover_Menu
