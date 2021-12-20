import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../misc/Loading'
import ApiError from '../misc/ApiError'
import GuestbookForm from './GuestbookForm'
import GuestbookList from './GuestbookList'

const GuestbookPage = (props) => {
  const [apiError, setApiError] = useState(null)
  const [guestbook, setGuestbook] = useState(null)

  // request guestbook data
  useEffect(() => {
    axios
      .get('/api/guestbook')
      .then((res) => setGuestbook(res.data))
      .catch((err) => setApiError(err.response.data))
  }, [])

  return apiError ? (
    <ApiError {...apiError} />
  ) : guestbook ? (
    <>
      <GuestbookForm />
      <GuestbookList data={guestbook} />
    </>
  ) : (
    <Loading />
  )
}

export default GuestbookPage
