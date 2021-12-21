// import './formError.css'

interface Props {
  message: String
}

const FormError = (props: Props) => {
  const { message } = props
  return <div className="form-error">{message}</div>
}

export default FormError
