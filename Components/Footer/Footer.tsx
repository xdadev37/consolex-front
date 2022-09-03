import { memo } from 'react';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography } from '@mui/material';
import Image from 'next/future/image';
import WhatsappQR from 'Components/Footer/consoleXWPQR.jpeg';

const Footer = () => (
  <Grid container>
    <Grid item>
      <Grid item>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3359.0742960581806!2d51.66324861539565!3d32.65746699737838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fbc356402d42323%3A0x173e558e57a227e3!2z2qnZhtiz2YjZhCDYp9uM2qnYsw!5e0!3m2!1sen!2s!4v1662238189721!5m2!1sen!2s"
          width="600"
          height="450"
          style={{ borderWidth: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <Typography>
          اصفهان , جنب مادی فدن مجتمع الماس واحد 10 کنسول ایکس, خیابان شمس
          آبادی, چهارراه, روبروی نظامی فروش ها
        </Typography>
      </Grid>
      <Grid item display="flex">
        <FontAwesomeIcon icon={faPhone} /> 09139146705
      </Grid>
    </Grid>
    <Grid item>
      <FontAwesomeIcon
        icon={faInstagram}
        href="https://www.instagram.com/consolex_store/"
      />
      <FontAwesomeIcon
        icon={faWhatsapp}
        href="https://wa.me/message/QSEN4SDWHXEVJ1"
      />
      <Image alt="whatsapp" src={WhatsappQR} />
    </Grid>
  </Grid>
);

export default memo(Footer);
