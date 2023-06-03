import { memo, Fragment } from 'react'
import { Grid } from '@mui/material'
import Head from 'next/head'
import Toggler from 'Components/MainPage/Items/Toggler'
import TopAppBar from 'Components/TopAppBar'
import Footer from 'Components/Footer/Footer'
import type { NextPage } from 'next'
import type { IChildren } from 'Types/Children'

const MainPage: NextPage<IChildren> = ({ children }) => (
  <Fragment>
    <Head>
      <title>کنسول ایکس | PS4 | PS5 | Xbox | بازی | اصفهان</title>
    </Head>
    <TopAppBar />
    <Grid container paddingTop={13} paddingX={4} bgcolor='#f6f6f6'>
      <Toggler />
    </Grid>
    <Grid
      container
      direction='column'
      paddingX={1}
      justifyContent='center'
      minHeight='1000px !important'
      bgcolor='#f6f6f6'
    >
      <Grid container gap={3} marginTop={2} justifyContent='center'>
        {children}
      </Grid>
    </Grid>
    <Footer />
  </Fragment>
)

export default memo(MainPage)
