import { useEffect } from 'react'
import styles from '../styles/homePage.module.scss'

const HomePage = () => {
  useEffect(() => {
    document.title = 'Home | Ron Gorai'
  }, [])

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.messageContainer}>
        <div className={styles.title}>Ron Gorai</div>
        <div className={styles.welcome}>Welcome to my website</div>
      </div>
      <img
        className={styles.profileImg}
        src={`/api/files/${encodeURIComponent(
          'home/profile-image.jpg'
        )}`}
        alt="Profile"
      />
    </div>
  )
}

export default HomePage
