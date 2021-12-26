import { useEffect } from 'react'
import styles from './maintenanceNotice.module.scss'

const MaintenanceNotice = () => {
  useEffect(() => {
    document.title = 'Under Maintenance!'
  }, [])

  return (
    <div className={styles.maintNoticeContainer}>
      <h1>Ron Gorai's Website</h1>
      <div className={styles.maintNotice}>
        <h2>Under Maintenance!</h2>
        <h3>What's in store:</h3>
        <p>
          I am rebuilding my website from the ground up on the MERN
          full-stack, utilizing modern technologies like TypeScript
          and Sass. Users will be able to view and read about
          different aspects of my life and sign/view a guestbook for
          my site.
        </p>
      </div>
    </div>
  )
}

export default MaintenanceNotice
