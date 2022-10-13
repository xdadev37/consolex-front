import { memo } from 'react';
import { AppBar, Toolbar, Grid, Link, Typography } from '@mui/material';
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
          <Typography variant="body1" fontStyle="italic">
            کنسول ایکس
          </Typography>
        </Grid>
        <Grid item sm={4} md={4} lg={4} textAlign="right">
          <Link href="#footer" color="primary.100">
            09139146705 &nbsp;
            <FontAwesomeIcon icon={faPhone} />
          </Link>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default memo(TopAppBar);
