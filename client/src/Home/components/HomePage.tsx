import { useEffect } from 'react'
import styles from '../styles/homePage.module.scss'
import homeImage from '../media/profile-image-white.jpg'

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
        alt="Profile"
        className={styles.profileImg}
        src={homeImage}
      />
    </div>
  )
}

export default HomePage
