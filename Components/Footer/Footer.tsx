import { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { Grid, Typography, Link } from '@mui/material'
import sx from 'TSS/Footer.module'
import Image from 'next/image'
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import WhatsappQR from 'Components/Footer/consoleXWPQR.jpeg'
import constants from 'Constants/constants.enum'
import type { NextPage } from 'next'

const Footer: NextPage = () => (
  <Grid
    container
    justifyContent='space-between'
    alignItems='flex-end'
    sx={sx.footer}
    display='flex'
  >
    <Grid item xs={12} sm={8} md={4} lg={4} xl={3}>
      <Grid
        item
        onLoadedData={() => console.clear()}
        title='map'
        component='iframe'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3359.0744650533507!2d51.6654373!3d32.6574625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fbc356402d42323%3A0x173e558e57a227e3!2z2qnZhtiz2YjZhCDYp9uM2qnYsw!5e0!3m2!1sen!2s!4v1684336713477!5m2!1sen!2s'
        sx={sx.iframe}
        allowFullScreen
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      />
      <Typography textAlign='justify'>
        اصفهان_ ابتدای خیابان طالقانی از سمت خیابان شمس آبادی_ روبه روی بانک
        ملی_ جنب مادی فدن_ مجتمع تجاری اداری الماس شهر _ طبقه پایین واحد 10
      </Typography>
      <Grid
        item
        display='flex'
        color='primary.300'
        alignItems='center'
        marginTop={2}
      >
        <Typography>031-31318398</Typography> &nbsp;
        <FontAwesomeIcon icon={faPhone} />
      </Grid>
      <Grid item display='flex' color='primary.300' alignItems='center'>
        <Typography>09139146705</Typography> &nbsp;
        <FontAwesomeIcon icon={faPhone} />
      </Grid>
    </Grid>
    <Grid item xs={12} sm={4} md={4} lg={4} xl={3} textAlign='right'>
      <Grid container justifyContent='flex-end' columnGap={2}>
        <Link
          color='primary.200'
          href='https://www.instagram.com/consolex_store'
          target='_blank'
        >
          <FontAwesomeIcon size='4x' icon={faInstagram} />
        </Link>
        <Link
          color='primary.100'
          target='_blank'
          href='https://wa.me/message/QSEN4SDWHXEVJ1'
        >
          <FontAwesomeIcon size='4x' icon={faWhatsapp} />
        </Link>
      </Grid>
      <Grid container justifyContent='flex-end'>
        <Image
          alt='whatsapp'
          width='120'
          height='120'
          src={WhatsappQR}
          priority
        />
      </Grid>
    </Grid>
    <Typography variant='subtitle1' textAlign='justify'>
      {constants.description}
    </Typography>
  </Grid>
)

export default memo(Footer)
