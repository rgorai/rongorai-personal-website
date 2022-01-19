import styles from '../styles/formError.module.scss'

type Props = {
  message: String
}

const FormError = (props: Props) => {
  return <div className={styles.formError}>{props.message}</div>
}

export default FormError
