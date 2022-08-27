import { memo } from "react";
import { AppBar, Toolbar, Grid } from "@mui/material";
import Image from "next/image";

const TopAppBar = () => (
  <AppBar>
    <Toolbar>
      <Grid justifyContent='space-between'>
        <Grid item />
        <Grid item>
          {/* <Image alt='لوگو'  /> */}
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default memo(TopAppBar);
