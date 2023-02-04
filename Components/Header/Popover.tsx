import { useState, Fragment } from 'react'
import { Grid, Popover, Typography } from '@mui/material'
import { useAppDispatch } from 'Redux/store'
import { setParams } from 'slicers/category'
import Image from 'next/image'
import type { ICategories, IMenu_3 } from 'Types/Redux/Categories.d'
import type { NextPage } from 'next'
import type { MouseEvent } from 'react'

const SubList: NextPage<ICategories<IMenu_3>> = data => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const dispatch = useAppDispatch()
  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)
  const handlePopoverClose = () => setAnchorEl(null)
  const open = Boolean(anchorEl)
  const setParamsHandler = (value: string) => () =>
    dispatch(setParams({ 'filters[menu_1][key][$eq]': value }))

  return (
    <Fragment key={data.attributes.key}>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {data.attributes.value}
      </Typography>
      <Popover
        id='mouse-over-popover'
        sx={{ pointerEvents: 'none' }}
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
          <Grid item>
            {data.attributes.menu_2.data.map(m => (
              <Grid container key={m.id}>
                {m.attributes.menu_1.data.map(i => (
                  <Typography
                    key={i.id}
                    onClick={setParamsHandler(i.attributes.key)}
                  >
                    {i.attributes.value}
                  </Typography>
                ))}
              </Grid>
            ))}
          </Grid>
          <Grid item>
            <Image alt='' src='' />
          </Grid>
        </Grid>
      </Popover>
    </Fragment>
  )
}

export default SubList
