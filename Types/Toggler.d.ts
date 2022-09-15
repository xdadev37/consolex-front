import type { Dispatch, SetStateAction } from "react";

interface IToggler {
  mode: string;
  setMode: Dispatch<SetStateAction<Modes>>;
}
