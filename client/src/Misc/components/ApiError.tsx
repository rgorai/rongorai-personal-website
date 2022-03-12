import { useEffect } from 'react'
import styles from '../styles/apiError.module.scss'

type Props = {
  status: number
  statusText: String
  data: any
}

const ApiError = (props: Props) => {
  const { status, statusText, data } = props

  useEffect(() => {
    console.error('API Error:', data)
  }, [data])

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorStatus}>{status}</div>
      <div className={styles.errorText}>{statusText}</div>
    </div>
  )
}

export default ApiError
