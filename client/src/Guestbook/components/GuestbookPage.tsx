import { useEffect, useState } from 'react'
import axios from 'axios'
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
    null as null | GuestbookEntries
  )
  const [apiError, setApiError] = useState(null)

  const getEntries = () =>
    axios
      .get('/api/guestbook')
      .then((res) =>
        // sort by date descending
        setGuestbookEntries(
          (res.data as GuestbookEntries).sort((a, b) =>
            Date.parse(a.date) === Date.parse(b.date)
              ? -1
              : Date.parse(b.date) - Date.parse(a.date)
          )
        )
      )
      .catch((err) => setApiError(err.response))

  // request guestbook data
  useEffect(() => {
    getEntries()
  }, [])

  return apiError ? (
    <ApiError {...apiError} />
  ) : guestbookEntries ? (
    <div className={styles.guestbookPageContainer}>
      <div className={styles.formContainer}>
        <GuestbookForm
          updateData={() => getEntries().then(() => window.scrollTo(0, 0))}
        />
      </div>
      <div className={styles.listContainer}>
        <GuestbookList data={guestbookEntries} />
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default GuestbookPage
