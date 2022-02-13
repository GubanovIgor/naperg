import '../styles/globals.css'
import React, { useReducer } from 'react'
import type { AppProps } from 'next/app'
import { Store } from '../store'
import { InitialState, initialState } from '../store/initialState'
import { MainReducer, mainReducer } from '../store/reducers';

type FinalReducer = React.ReducerWithoutAction<InitialState | MainReducer>;

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer<FinalReducer>(
    mainReducer as FinalReducer,
    initialState,
  );

  return (
    <Store.Provider value={{ state: initialState, dispatch: dispatch  }}>
      <Component {...pageProps} />
    </Store.Provider>
  )
}

export default MyApp
