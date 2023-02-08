import { useState, Fragment } from 'react'
import { Grid, Popover, Typography, Divider } from '@mui/material'
import { useAppDispatch } from 'Redux/store'
import { setParams } from 'slicers/category'
import Image from 'next/image'
import appSettings from 'AppSettings'
import type { ICategories, IMenu_3 } from 'Types/Redux/Categories.d'
import type { NextPage } from 'next'
import type { MouseEvent } from 'react'

const Popover_Menu: NextPage<ICategories<IMenu_3>> = data => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const dispatch = useAppDispatch()
  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)
  const handlePopoverClose = () => setAnchorEl(null)
  const open = Boolean(anchorEl)
  const setParamsHandler = (value: string) => () => {
    dispatch(setParams({ 'filters[menu_1][key][$eq]': value }))
    return setAnchorEl(null)
  }

  return (
    <Fragment key={data.attributes.key}>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        paddingX={2}
        sx={{ textDecoration: 'underline' }}
      >
        {data.attributes.value}
      </Typography>
      <Popover
        id='mouse-over-popover'
        PaperProps={{
          sx: { width: '40%', paddingY: 2, paddingX: 4, borderRadius: 5 },
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
      >
        <Grid container justifyContent='space-between'>
          <Grid item sm={5} md={5} lg={5}>
            {data.attributes.menu_2s?.data.map(m => (
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
              alt={data.attributes.value}
              src={`${appSettings.baseUrl}${
                data.attributes.image.data?.attributes.formats.medium
                  ? data.attributes.image.data?.attributes.formats.medium.url
                  : data.attributes.image.data?.attributes.formats.small?.url
              }`}
            />
          </Grid>
        </Grid>
      </Popover>
    </Fragment>
  )
}

export default Popover_Menu
