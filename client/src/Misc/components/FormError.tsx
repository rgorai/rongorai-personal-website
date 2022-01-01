import styles from '../styles/formError.module.scss'

interface Props {
  message: String
}

const FormError = (props: Props) => {
  return <div className={styles.formError}>{props.message}</div>
}

export default FormError
