// import './formError.css'

const FormError = (props) => {
  const { message } = props
  return <div className="form-error">{message}</div>
}

export default FormError
