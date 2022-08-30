import { memo, useState } from "react";
import { Grid } from "@mui/material";
import lazy from "next/dynamic";
import type { NextPage } from "next";
import type { Modes } from "Types/Toggler";

/** @module lazy @constant import */
const Toggler = lazy(() => import("Components/MainPage/Items/Toggler"));

const MainPage: NextPage = () => {
  const [mode, setMode] = useState<Modes>("shop");

  return (
    <Grid container>
      <Grid container justifyContent="flex-start">
        <Toggler {...{ mode, setMode }} />
      </Grid>
    </Grid>
  );
};

export default memo(MainPage);
