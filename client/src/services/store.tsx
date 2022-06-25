import {
  createContext,
  useState,
  PropsWithChildren,
  Context,
  useContext,
} from 'react'

const DEFAULT_STATE = {
  theme: localStorage.getItem('theme') ?? 'light',
}

let appContext: Context<any> = createContext(DEFAULT_STATE)

const StoreProvider = (props: PropsWithChildren<{}>) => {
  const [store, setStore] = useState(DEFAULT_STATE)
  return <appContext.Provider value={{ store, setStore }} {...props} />
}

const useStore = () => {
  const { store, setStore } = useContext(appContext)
  return { store, setStore }
}

export { appContext, StoreProvider, useStore }
