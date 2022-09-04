import { memo } from 'react';
import { AppBar, Toolbar, Grid, Link } from '@mui/material';
import Image from 'next/image';
import Logo from 'Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import type { FC } from 'react';

const TopAppBar: FC = () => (
  <AppBar>
    <Toolbar>
      <Grid justifyContent="space-between">
        <Grid item />
        <Grid item>
          <Image alt="لوگو" src={Logo} />
        </Grid>
        <Grid item>
          <Link href="#footer">
            اطلاعات تماس <FontAwesomeIcon icon={faPhone} />
          </Link>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default memo(TopAppBar);
