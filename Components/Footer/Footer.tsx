import { memo, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { Grid, Typography, Link } from '@mui/material'
import sx from 'TSS/Footer.module'
import Image from 'next/image'
import WhatsappQR from 'Components/Footer/consoleXWPQR.jpeg'
import constants from 'Constants/constants.enum'
import type { NextPage } from 'next'

const Footer: NextPage = () => {
  const [hidden, setHidden] = useState(true)
  useEffect(() => {
    setTimeout(() => setHidden(false), 1700)
  }, [])

  return (
    <Grid
      container
      justifyContent='space-between'
      alignItems='flex-end'
      sx={sx.footer}
      display={hidden ? 'none' : 'flex'}
    >
      <Grid item xs={12} sm={8} md={4} lg={4} xl={3}>
        <Grid
          item
          component='iframe'
          src='https://balad.ir/p/7dAvsq9vAAQJY2'
          sx={sx.iframe}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        />
        <Typography>
          اصفهان_ ابتدای خیابان طالقانی از سمت خیابان شمس آبادی_ روبه روی بانک
          ملی_ جنب مادی فدن_ مجتمع تجاری اداری الماس شهر _ طبقه پایین واحد 10
        </Typography>
        <Grid
          item
          display='flex'
          color='primary.300'
          alignItems='center'
          marginTop={1}
        >
          <Typography>09139146705</Typography> &nbsp;
          <FontAwesomeIcon icon={faPhone} />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4} xl={3} textAlign='right'>
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
        <Grid item>
          <Image
            alt='whatsapp'
            width='100'
            height='100'
            src={WhatsappQR}
            priority
          />
        </Grid>
      </Grid>
      <Typography variant='subtitle1'>{constants.description}</Typography>
    </Grid>
  )
}

export default memo(Footer)
