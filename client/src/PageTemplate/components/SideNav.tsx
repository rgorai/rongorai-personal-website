import { Link, useLocation } from 'react-router-dom'
import cx from 'classnames'
import styles from '../styles/sideNav.module.scss'

type Props = {
  navItems: Array<{ name: string; route: string }>
}

const SideNav = (props: Props) => {
  const location = useLocation()

  return (
    <nav
      className={cx(styles.sideNavContainer, {
        [styles.hideSideNav]: props.navItems.length === 0,
      })}
    >
      <ul>
        {props.navItems.map((e, i) => (
          <li className={styles.sideNavItem} key={i}>
            <Link
              className={cx(styles.sideNavLink, {
                [styles.activeSideNavLink]: location.pathname.includes(e.route),
              })}
              to={e.route}
            >
              {e.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SideNav
