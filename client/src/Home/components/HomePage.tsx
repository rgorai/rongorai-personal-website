import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/homePage.module.scss'
import { getFile } from '../../services/utils'

type Props = {
  startLocation: string
}

const HomePage = (props: Props) => {
  useEffect(() => {
    document.title = `Welcome | Ron Gorai's Personal Website`
  }, [])

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.messageContainer}>
        <div className={styles.title}>Ron Gorai</div>
        <div className={styles.welcome}>Welcome to my website</div>
        <Link className={styles.getStarted} to={props.startLocation}>
          Get started
          <img
            src={`${process.env.PUBLIC_URL}/menu_icons/right-arrow2.png`}
            alt="about this website"
          />
        </Link>
      </div>
      <div className={styles.profileImg}>
        <img
          className={styles.profileImg}
          src={getFile('home/profile-image.jpg')}
          alt="Profile Portrait"
        />
      </div>
    </div>
  )
}

export default HomePage
