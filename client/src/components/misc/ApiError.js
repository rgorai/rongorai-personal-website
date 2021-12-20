// import './apiError.css'

const ApiError = (props) => {
  const { status, statusText, data } = props
  return (
    <div className="api-error-container">
      <div className="api-error-status">{status}</div>
      <div className="api-error-text">{statusText}</div>

      {process.env.NODE_ENV === 'development' && <div>{data}</div>}
    </div>
  )
}

export default ApiError
