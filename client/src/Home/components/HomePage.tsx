import { useEffect } from 'react'
import styles from '../styles/homePage.module.scss'
import { getFile } from '../../services/utils'

const HomePage = () => {
  useEffect(() => {
    document.title = `Welcome | Ron Gorai's Personal Website`
  }, [])

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.messageContainer}>
        <div className={styles.title}>Ron Gorai</div>
        <div className={styles.welcome}>Welcome to my website</div>
      </div>
      <img
        className={styles.profileImg}
        src={getFile('home/profile-image.jpg')}
        alt="Profile Portrait"
      />
    </div>
  )
}

export default HomePage
