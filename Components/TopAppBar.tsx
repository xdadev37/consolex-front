import { memo } from 'react'
import { AppBar, Toolbar, Grid, Link, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import sx from 'TSS/Header/AppBar.module'
import Menu from './Header/Menu'
import type { NextPage } from 'next'

const TopAppBar: NextPage = () => {
  return (
    <AppBar sx={sx.appBar}>
      <Toolbar>
        <Grid container alignItems='center' justifyContent='space-between'>
          <Grid item sm={4} md={4} lg={4}>
            <Menu />
          </Grid>
          <Grid item sm={4} md={4} lg={4} textAlign='center'>
            <Typography variant='body1' fontStyle='italic'>
              کنسول ایکس | ConsoleX
            </Typography>
          </Grid>
          <Grid item sm={4} md={4} lg={4} textAlign='right'>
            <Grid container justifyContent='flex-end' gap={2}>
              <Link href='tel://09139146705' color='primary.100'>
                09139146705 &nbsp;
                <FontAwesomeIcon icon={faPhone} />
              </Link>
              <Grid item alignItems='center'>
                <Link
                  color='primary.200'
                  href='https://www.instagram.com/consolex_store'
                  target='_blank'
                >
                  <FontAwesomeIcon size='3x' icon={faInstagram} />
                </Link>
              </Grid>
              <Grid item alignItems='center'>
                <Link
                  color='primary.100'
                  target='_blank'
                  href='https://wa.me/message/QSEN4SDWHXEVJ1'
                >
                  <FontAwesomeIcon size='3x' icon={faWhatsapp} />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default memo(TopAppBar)
