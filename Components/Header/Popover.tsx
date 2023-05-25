import { useState, Fragment, memo } from 'react'
import { Grid, Popper, Typography, Divider, Paper } from '@mui/material'
import { useAppDispatch } from 'Redux/store'
import { setParams, setMainPage } from 'slicers/category'
import Image from 'next/image'
import appSettings from 'AppSettings'
import { useRouter } from 'next/router'
import type { ICategories, IMenu_3 } from 'Types/Redux/Categories.d'
import type { NextPage } from 'next'
import type { MouseEvent } from 'react'

const Popover_Menu: NextPage<Record<'d', ICategories<IMenu_3>>> = ({ d }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const dispatch = useAppDispatch()
  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)

  const handlePopoverClose = () => setAnchorEl(null)
  const open = Boolean(anchorEl)
  const { replace } = useRouter()
  const setParamsHandler = (value: string) => () => {
    replace('')
    dispatch(setParams({ 'filters[menu_1s][key][$eq]': value }))
    dispatch(setMainPage(false))
    return setAnchorEl(null)
  }

  return (
    <Grid
      item
      key={d.attributes.key}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        marginX={2}
        marginY={1}
        zIndex={2}
      >
        {d.attributes.value}
      </Typography>
      <Popper
        id='mouse-over-popover'
        disablePortal
        keepMounted
        open={open}
        anchorEl={anchorEl}
      >
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          component={Paper}
          width={800}
          paddingY={4}
          paddingX={2}
          marginRight={4}
          borderRadius={5}
          marginTop={1}
        >
          <Grid item sm={5} md={5} lg={5}>
            {d?.attributes.menu_2s?.data.map(m => (
              <Fragment key={m.id}>
                <Divider />
                <Typography color='red' marginTop={3} marginBottom={1}>
                  {m.attributes.value}
                </Typography>
                <Grid item sx={{ paddingRight: 2 }}>
                  {m.attributes.menu_1s?.data.map(i => (
                    <Typography
                      key={i.id}
                      onClick={setParamsHandler(i.attributes.key)}
                      sx={{ cursor: 'pointer' }}
                      marginBottom={1}
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
              width={10}
              height={5}
              layout='responsive'
              style={{ borderRadius: 5 }}
              alt={d?.attributes.value}
              src={`${appSettings.baseUrl}${
                d?.attributes.image.data?.attributes.formats.medium
                  ? d?.attributes.image.data?.attributes.formats.medium.url
                  : d?.attributes.image.data?.attributes.formats.small?.url
              }`}
            />
          </Grid>
        </Grid>
      </Popper>
    </Grid>
  )
}

export default memo(Popover_Menu)
