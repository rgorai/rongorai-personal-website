import { useEffect } from 'react'
import styles from '../styles/footer.module.scss'
import { getFile } from '../../services/utils'

const HomePage = () => {
  return (
    <footer className={styles.footerContainer}>
      <h2>Info</h2>
      <p>
        {'Email: '}
        <a href="mailto:ron.gorai2020@gmail.com">ron.gorai2020@gmail.com</a>
      </p>
    </footer>
  )
}

export default HomePage
