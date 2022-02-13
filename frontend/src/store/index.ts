import { createContext, Dispatch } from "react";

import { Action } from "./actions";
import { InitialState, initialState } from "./initialState";

export const Store = createContext<{
  state: InitialState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});
