import { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { Grid, Typography, Link, Divider } from '@mui/material'
import sx from 'TSS/Footer.module'
import Image from 'next/image'
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import WhatsappQR from 'Components/Footer/WPQR.png'
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
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4042.7550749282186!2d50.868999912088306!3d35.67808177247395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8d97e4fb143deb%3A0x2960601b5b094628!2z2LPYp9mF2KfZhiDYqtin2KjYtCDYp9mF24zYryDbsg!5e1!3m2!1sen!2s!4v1756983303891!5m2!1sen!2s'
        sx={sx.iframe}
        allowFullScreen
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      />
      <Typography variant='h6' textAlign='center'>
        تهران
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography textAlign='justify'>
        دفتر فروش: خ. فاطمی, روبروی وزارت کشور, خ میرزایی بی غش (چهارم), نبش رامین, پلاک 2
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography textAlign='justify'>
        کارگاه: جاده ی ملارد به صفادشت, ارسطو, ولیعصر هشتم, بلوار شورا, کوچه حافظ, پلاک 8
      </Typography>
      <Grid
        item
        display='flex'
        color='primary.300'
        alignItems='center'
        marginTop={2}
      >
        <Typography>021-88991219</Typography> &nbsp;
        <FontAwesomeIcon icon={faPhone} />
      </Grid>
      <Grid item display='flex' color='primary.300' alignItems='center'>
        <Typography>09124472556</Typography> &nbsp;
        <FontAwesomeIcon icon={faPhone} />
      </Grid>
    </Grid>
    <Grid item xs={12} sm={4} md={4} lg={4} xl={3} textAlign='right'>
      <Grid container justifyContent='flex-end' columnGap={2}>
        <Link
          color='primary.200'
          href='https://instagram.com/samantabesh_omid021'
          target='_blank'
        >
          <FontAwesomeIcon size='4x' icon={faInstagram} />
        </Link>
        <Link
          color='primary.100'
          target='_blank'
          href='https://api.whatsapp.com/send/?phone=9124472556&text&type=phone_number&app_absent=0'
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
  </Grid>
)

export default memo(Footer)
