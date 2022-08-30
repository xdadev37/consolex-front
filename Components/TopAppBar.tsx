import { memo } from "react";
import { AppBar, Toolbar, Grid } from "@mui/material";
import Image from "next/image";
import Logo from "Logo.png";
import type { FC } from "react";

const TopAppBar: FC = () => (
  <AppBar>
    <Toolbar>
      <Grid justifyContent="space-between">
        <Grid item />
        <Grid item>
          <Image alt="لوگو" src={Logo} />
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default memo(TopAppBar);
