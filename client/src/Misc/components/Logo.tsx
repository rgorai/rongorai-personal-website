import { Link } from 'react-router-dom'
import styles from '../styles/logo.module.scss'

const Logo = () => (
  <div className={styles.logoContainer}>
    <a href="/">
      <span className={styles.firstName}>
        Ron<span className={styles.lastName}>Gorai</span>
      </span>
    </a>
  </div>
)

export default Logo
