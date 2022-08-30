import { memo, useState } from "react";
import { Grid } from "@mui/material";
import lazy from "next/dynamic";
import type { FC } from "react";
import type { Modes } from "Types/Toggler";

/** @module lazy @constant import */
const Toggler = lazy(() => import("Components/MainPage/Items/Toggler"));

const MainPage: FC = () => {
  const [mode, setMode] = useState<Modes>("shop");

  return (
    <Grid container>
      <Toggler {...{ mode, setMode }} />
    </Grid>
  );
};

export default memo(MainPage);
