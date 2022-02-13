import React, { createContext, Dispatch, useReducer } from 'react';

import { Action, ACTIONS } from './actions';
import { InitialState, initialState } from './initialState';
import { MainReducer, mainReducer } from './reducers';

const Store = createContext<{
  state: InitialState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

type FinalReducer = React.ReducerWithoutAction<InitialState | MainReducer>;

const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<FinalReducer>(
    mainReducer as FinalReducer,
    initialState,
  );

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export { ACTIONS, Store, StoreProvider };
