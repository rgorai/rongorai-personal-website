import path from 'path'
import { Link, useLocation } from 'react-router-dom'
import cx from 'classnames'
import styles from './navbar.module.scss'

const NavBar = () => {
  const location = useLocation()

  const navLinks = [
    // { name: 'HOME', link: '/home' },
    { name: 'ABOUT', link: '/about' },
    { name: 'PROJECTS', link: '/projects' },
    // { name: 'PROFESSIONAL', link: '/shows/all' },

    { name: 'HOBBIES', link: '/hobbies' },
    // { name: 'MUSIC', link: '/shows/all' },
    // { name: 'BOWLING', link: '/shows/all' },
    // { name: 'STEM', link: '/shows/all' },
    // { name: 'SNOWBOARDING', link: '/shows/all' },

    { name: 'GUESTBOOK', link: '/guestbook' },
  ]

  return (
    <nav className={styles.navbar}>
      <Link className={cx(styles.logo, styles.noDec)} to="/">
        <img
          className={styles.logoImg}
          src={process.env.PUBLIC_URL + 'logo.svg'}
          alt="Logo"
        />
        <span>Ron Gorai</span>
      </Link>
      <ul>
        {navLinks.map((e, i) => (
          <li key={i}>
            <Link
              className={cx(styles.navItem, styles.noDec, {
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
