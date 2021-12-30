import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../../Misc/components/Loading'
import ApiError from '../../Misc/components/ApiError'
import GuestbookForm from './GuestbookForm'
import GuestbookList from './GuestbookList'

interface Props {}

const GuestbookPage = (props: Props) => {
  const [apiError, setApiError] = useState(null)
  const [guestbook, setGuestbook] = useState(null)

  // request guestbook data
  useEffect(() => {
    axios
      .get('/api/guestbook')
      .then((res) => setGuestbook(res.data))
      .catch((err) => setApiError(err.response))
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
