import { memo } from 'react';
import { AppBar, Toolbar, Grid, Link } from '@mui/material';
import Image from 'next/image';
import LogoText from 'Components/LogoText.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import sx from 'TSS/Header/AppBar.module';
import type { NextPage } from 'next';

const TopAppBar: NextPage = () => (
  <AppBar sx={sx.appBar}>
    <Toolbar>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item sm={4} md={4} lg={4} />
        <Grid item sm={4} md={4} lg={4} textAlign="center">
          <Image width="80" height="40" alt="لوگو" src={LogoText} />
        </Grid>
        <Grid item sm={4} md={4} lg={4} textAlign="right">
          <Link href="#footer" color="primary.100">
            راه های ارتباطی <FontAwesomeIcon icon={faPhone} />
          </Link>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default memo(TopAppBar);
