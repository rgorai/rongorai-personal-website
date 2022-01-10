import styles from '../../styles/appContent.module.scss'
import { getFile } from '../../../services/utils'

const ThisWebsite = () => (
  <div className={styles.contentContainer}>
    <h1>About This Website</h1>

    <h2>Description</h2>
    <p>This will be a description of this website</p>

    <h2>Release Notes</h2>
    <h3>1.0</h3>
    <p>N/A</p>
  </div>
)

export default ThisWebsite
