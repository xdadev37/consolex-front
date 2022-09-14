import type { Dispatch, SetStateAction } from "react";

type Modes = "/shop" | "/contents";

interface IToggler {
  mode: Modes;
  setMode: Dispatch<SetStateAction<Modes>>;
}
