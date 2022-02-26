import { Link, useLocation } from 'react-router-dom'
import cx from 'classnames'
import { useEffect } from 'react'
import { getFile } from '../../services/utils'
import styles from '../styles/navBar.module.scss'

type Props = {
  navItems: Array<{ name: string; route: string }>
}

const NavBar = (props: Props) => {
  const location = useLocation()

  useEffect(() => {
    document.title = `${
      props.navItems.find((e) => location.pathname.includes(e.route))?.name
    } | Ron Gorai's Personal Website`
  }, [location.pathname, props.navItems])

  return (
    <nav>
      <div className={styles.navbarContainer}>
        <Link className={cx(styles.logo, styles.navItem)} to="/">
          <img
            alt="Logo"
            className={styles.logoImg}
            src={getFile('home/logo.svg')}
          />
          <span>Ron Gorai</span>
        </Link>
        <ul>
          {props.navItems.map((e, i) => (
            <li key={i}>
              <Link
                className={cx(styles.navLink, styles.navItem, {
                  [styles.activeNav]: location.pathname.includes(e.route),
                })}
                to={e.route}
              >
                {e.name.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
