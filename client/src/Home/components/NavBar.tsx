import { Link, useLocation } from 'react-router-dom'
import cx from 'classnames'
import { getFile } from '../../services/utils'
import styles from '../styles/navBar.module.scss'

interface Props {
  navItems: Array<{ name: string; route: string }>
}

const NavBar = (props: Props) => {
  const location = useLocation()

  return (
    <nav className={styles.navbar}>
      <Link className={cx(styles.logo, styles.navItem)} to="/">
        {/* <img
          alt="Logo"
          className={styles.logoImg}
          src={getFile('home/logo.svg')}
        /> */}
        <span>Ron Gorai</span>
      </Link>
      <ul>
        {props.navItems.map((e, i) => (
          <li key={i}>
            <Link
              className={cx(styles.navLink, styles.navItem, {
                [styles.activeNav]: location.pathname.includes(
                  e.route
                ),
              })}
              to={e.route}
            >
              {e.name.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
