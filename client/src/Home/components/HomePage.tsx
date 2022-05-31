import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/homePage.module.scss'
import { getMedia } from '../../services/utils'

const PROFILE_IMG = '/home/profile-image.jpg'

const START_LINKS = [
  { label: 'About', link: '/about' },
  { label: 'Projects', link: '/projects' },
  { label: 'Resume', link: '/resume' },
]

const HomePage = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = `Welcome | Ron Gorai's Personal Website`
    const profileImg = document.createElement('img')
    profileImg.onload = () => setLoading(false)
    profileImg.src = getMedia(PROFILE_IMG, true)
  }, [])

  return (
    <div className={styles.homePageContainer}>
      {!loading && (
        <>
          <div className={styles.messageContainer}>
            <div className={styles.title}>Ron Gorai</div>
            <div className={styles.welcome}>Welcome to my website</div>
            <div className={styles.startLinksContainer}>
              {START_LINKS.map((e, i) => (
                <Link className={styles.startLink} to={e.link} key={i}>
                  {e.label}
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.profileImg}>
            <picture>
              <source srcSet={getMedia(PROFILE_IMG, true)} type="image/webp" />
              <img
                className={styles.profileImg}
                src={getMedia(PROFILE_IMG)}
                alt="Profile Portrait"
              />
            </picture>
          </div>
        </>
      )}
    </div>
  )
}

export default HomePage
