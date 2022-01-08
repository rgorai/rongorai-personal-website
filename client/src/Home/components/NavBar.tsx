import { Link, useLocation } from 'react-router-dom'
import cx from 'classnames'
import styles from '../styles/navBar.module.scss'

interface Props {
  navItems: Array<string>
}

const NavBar = (props: Props) => {
  const location = useLocation()

  return (
    <nav className={styles.navbar}>
      <Link className={cx(styles.logo, styles.navItem)} to="/">
        {/* <img
          className={styles.logoImg}
          src={`/api/files/${encodeURIComponent('home/logo.svg')}`}
          alt="Logo"
        /> */}
        <span>Ron Gorai</span>
      </Link>
      <ul>
        {props.navItems.map((e, i) => (
          <li key={i}>
            <Link
              className={cx(styles.navLink, styles.navItem, {
                [styles.activeNav]: location.pathname.includes(
                  e.toLowerCase()
                ),
              })}
              to={e.toLowerCase()}
            >
              {e.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
