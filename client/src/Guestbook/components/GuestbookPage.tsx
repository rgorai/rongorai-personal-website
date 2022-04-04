import { useEffect, useRef, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import Loading from '../../Misc/components/Loading'
import ApiError from '../../Misc/components/ApiError'
import styles from '../styles/guestbookPage.module.scss'
import GuestbookForm from './GuestbookForm'
import GuestbookList from './GuestbookList'

type GuestbookEntries = Array<{
  name: string
  background: string
  message: string
  date: string
}>

const GuestbookPage = () => {
  const [guestbookEntries, setGuestbookEntries] = useState(
    [] as GuestbookEntries
  )
  const [apiError, setApiError] = useState({} as AxiosResponse)
  const entryHeaderRef = useRef<HTMLHeadingElement>(null)

  const getEntries = () =>
    axios
      .get('/api/guestbook')
      .then((res) => {
        // sort by date descending
        setGuestbookEntries(
          (res.data as GuestbookEntries).sort((a, b) =>
            Date.parse(a.date) === Date.parse(b.date)
              ? -1
              : Date.parse(b.date) - Date.parse(a.date)
          )
        )
        window.scrollTo(0, 0)
      })
      .catch((err) => setApiError(err.response))

  // request guestbook data
  useEffect(() => {
    setApiError({} as AxiosResponse)
    getEntries()
  }, [])

  return Object.keys(apiError).length ? (
    <ApiError {...apiError} />
  ) : guestbookEntries.length > 0 ? (
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
                  : (entryHeaderRef.current?.offsetTop ?? 0) - 75
              )
            )
          }
        />
      </div>
      <div className={styles.listContainer}>
        <h1 id="entries" ref={entryHeaderRef}>
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
