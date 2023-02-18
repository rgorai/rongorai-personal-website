import {
  createContext,
  useState,
  PropsWithChildren,
  Context,
  useContext,
  SetStateAction,
  Dispatch,
} from 'react'
import { PageData } from '../Content/components/ContentGenerator'
import { GuestbookEntries } from '../Guestbook/components/GuestbookPage'

type AppState = {
  theme: string
  pageData: { [key: string]: PageData | null }
  guestbookEntries: GuestbookEntries | null
}

const DEFAULT_STATE: AppState = {
  theme: localStorage.getItem('theme') ?? 'light',
  pageData: {},
  guestbookEntries: null,
}

export const appContext: Context<any> = createContext(DEFAULT_STATE)

export const StoreProvider = (props: PropsWithChildren<{}>) => {
  const [store, setStore] = useState(DEFAULT_STATE)
  return <appContext.Provider value={{ store, setStore }} {...props} />
}

export const useStore = (): {
  store: AppState
  setStore: Dispatch<SetStateAction<AppState>>
} => useContext(appContext)
