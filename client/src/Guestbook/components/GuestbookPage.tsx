import { useEffect, useRef, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import Loading from '../../Misc/components/Loading'
import ApiError from '../../Misc/components/ApiError'
import styles from '../styles/guestbookPage.module.scss'
import { useStore } from '../../services/store'
import GuestbookForm from './GuestbookForm'
import GuestbookList from './GuestbookList'

export type GuestbookEntries = Array<{
  name: string
  background: string
  message: string
  date: string
}>

const GuestbookPage = () => {
  const {
    store: { guestbookEntries },
    setStore,
  } = useStore()
  const [apiError, setApiError] = useState<AxiosResponse | null>(null)
  const entriesHeaderRef = useRef<HTMLHeadingElement>(null)

  const getEntries = () =>
    axios
      .get('/api/guestbook')
      .then((res) => {
        // sort by date descending
        setStore((prev) => ({
          ...prev,
          guestbookEntries: (res.data as GuestbookEntries).sort(
            (a, b) => Date.parse(b.date) - Date.parse(a.date)
          ),
        }))
        window.scrollTo(0, 0)
      })
      .catch((err) => setApiError(err.response))

  // request guestbook data
  useEffect(() => {
    setApiError(null)
    if (!guestbookEntries) getEntries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return apiError ? (
    <ApiError {...apiError} />
  ) : guestbookEntries ? (
    <div className={styles.guestbookPageContainer}>
      <div className={styles.formContainer}>
        <h1>Sign my guestbook</h1>
        <GuestbookForm
          updateData={() =>
            getEntries().then(() =>
              window.scrollTo(
                0,
                window.innerWidth > 900
                  ? 0
                  : (entriesHeaderRef.current?.offsetTop ?? 0) - 75
              )
            )
          }
        />
      </div>
      <div className={styles.listContainer}>
        <h1 id="entries" ref={entriesHeaderRef}>
          Entries
        </h1>
        <GuestbookList data={guestbookEntries} />
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default GuestbookPage
