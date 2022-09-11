import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Grid, Typography, Link } from '@mui/material';
import sx from 'TSS/Footer.module';
import classes from 'CSS/IFrame.module.css';
import Image from 'next/image';
import WhatsappQR from 'Components/Footer/consoleXWPQR.jpeg';
import type { NextPage } from 'next';

const Footer: NextPage = () => (
  <Grid
    container
    justifyContent="space-between"
    alignItems="flex-end"
    sx={sx.footer}
  >
    <Grid item sm={6} md={6} lg={6}>
      <Grid item>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3359.0742960581806!2d51.66324861539565!3d32.65746699737838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fbc356402d42323%3A0x173e558e57a227e3!2z2qnZhtiz2YjZhCDYp9uM2qnYsw!5e0!3m2!1sen!2s!4v1662238189721!5m2!1sen!2s"
          width="300"
          height="250"
          className={classes.iframe}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <Typography>
          اصفهان - جنب مادی فدن مجتمع الماس واحد 10 کنسول ایکس - خیابان شمس
          آبادی - چهارراه - روبروی نظامی فروش ها
        </Typography>
      </Grid>
      <Grid item display="flex" color="primary.300" alignItems="center">
        <Typography>09139146705</Typography> &nbsp;
        <FontAwesomeIcon icon={faPhone} />
      </Grid>
    </Grid>
    <Grid item sm={6} md={6} lg={6} textAlign="right">
      <Grid item color="primary.200" alignItems="center">
        <Link href="https://www.instagram.com/consolex_store" target="_blank">
          <FontAwesomeIcon size="3x" icon={faInstagram} />
        </Link>
        <Typography>ConsoleX_Store@</Typography>
      </Grid>
      <Grid item color="primary.100" alignItems="center">
        <Link target="_blank" href="https://wa.me/message/QSEN4SDWHXEVJ1">
          <FontAwesomeIcon size="3x" icon={faWhatsapp} />
        </Link>
        <Typography>ConsoleX_Store@</Typography>
      </Grid>
      <Grid item>
        <Image
          alt="whatsapp"
          width="100"
          height="100"
          src={WhatsappQR}
          priority
        />
      </Grid>
    </Grid>
  </Grid>
);

export default memo(Footer);
