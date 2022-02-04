// import './apiError.css'

import { useEffect } from 'react'

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
    <div className="api-error-container">
      <div className="api-error-status">{status}</div>
      <div className="api-error-text">{statusText}</div>
    </div>
  )
}

export default ApiError
