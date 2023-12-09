import { memo, Fragment } from 'react'
import { Grid } from '@mui/material'
import Head from 'next/head'
import Toggler from 'Components/MainPage/Items/Toggler'
import TopAppBar from 'Components/TopAppBar'
import Footer from 'Components/Footer/Footer'
import gvi from './gvi.png'
import type { NextPage } from 'next'
import type { IChildren } from 'Types/Children'

const MainPage: NextPage<IChildren> = ({ children }) => (
  <Fragment>
    <Head>
      <title>
        کنسول ایکس | نصب بازی پلی استیشن ایکس باکس xbox ps4 ps5 اصفهان
      </title>
    </Head>
    <TopAppBar />
    <Grid container paddingTop={10} paddingX={4} bgcolor='#f6f6f6'>
      <Toggler />
    </Grid>
    <Grid
      container
      direction='column'
      paddingX={1}
      justifyContent='center'
      minHeight='1000px !important'
      bgcolor='#f6f6f6'
      sx={{
        backgroundImage: `url(${gvi.src})`,
        backgroundRepeat: 'space',
        backgroundSize: '50px 50px',
      }}
    >
      <Grid container gap={3} marginTop={2} justifyContent='center'>
        {children}
      </Grid>
    </Grid>
    <Footer />
  </Fragment>
)

export default memo(MainPage)
