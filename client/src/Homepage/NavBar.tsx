import { Link, useLocation } from 'react-router-dom'
import cx from 'classnames'
import styles from './navbar.module.scss'

const NavBar = () => {
  const location = useLocation()

  const navLinks = [
    { name: 'HOME', link: '/' },
    { name: 'PROJECTS', link: '/projects' },
    // { name: 'PROFESSIONAL', link: '/shows/all' },

    { name: 'HOBBIES', link: '/hobbies' },
    { name: 'ABOUT', link: '/about' },
    // { name: 'MUSIC', link: '/shows/all' },
    // { name: 'BOWLING', link: '/shows/all' },
    // { name: 'STEM', link: '/shows/all' },
    // { name: 'SNOWBOARDING', link: '/shows/all' },
  ]

  return (
    <nav className={styles.navbarContainer}>
      <ul className="flex-horizontal navbar">
        {navLinks.map((e, i) => (
          <li key={i}>
            <Link
              className={cx(styles.navItem, {
                [styles.activeNav]: location.pathname.includes(
                  e.link
                ),
              })}
              to={e.link}
            >
              {e.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
