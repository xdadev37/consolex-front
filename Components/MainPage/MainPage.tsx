import { memo } from 'react'
import { Grid } from '@mui/material'
import Head from 'next/head'
import Toggler from 'Components/MainPage/Items/Toggler'
import TopAppBar from 'Components/TopAppBar'
import Footer from 'Components/Footer/Footer'
import ps from 'Components/MainPage/image.png'
import type { NextPage } from 'next'
import type { IChildren } from 'Types/Children'

const MainPage: NextPage<IChildren> = ({ children }) => (
  <Grid
    container
    sx={{
      backgroundImage: ` linear-gradient(rgb(0 0 0 / 35%), rgb(0 0 0 / 50%)), url(${ps.src})`,
    }}
  >
    <Head>
      <title>
        | ps5 اصفهان | ps4 xbox | پلی استیشن ایکس باکس | خرید نصب بازی
      </title>
    </Head>
    <TopAppBar />
    <Grid
      // bgcolor='#f6f6f6'
      container
      paddingTop={10}
      paddingX={4}
    >
      <Toggler />
    </Grid>
    <Grid
      container
      direction='column'
      paddingX={1}
      justifyContent='center'
      // minHeight='1000px !important'
      // bgcolor='#f6f6f6'
      gap={3}
      marginTop={2}
      // sx={{
      //   backgroundImage: ` linear-gradient(rgb(0 0 0 / 50%), rgb(0 0 0 / 50%)), url(${ps.src})`,
      // }}
    >
      {children}
    </Grid>
    <Footer />
  </Grid>
)

export default memo(MainPage)
