import { Link, useLocation, useNavigate } from 'react-router-dom'
import cx from 'classnames'
import styles from '../styles/sideNav.module.scss'

type Props = {
  navItems: Array<{ name: string; route: string }>
}

const SideNav = (props: Props) => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className={styles.sideNavContainer}>
      <ul>
        {props.navItems.map((e, i) => (
          <li className={styles.sideNavItem} key={i}>
            <Link
              className={cx(styles.sideNavLink, {
                [styles.activeSideNavLink]: location.pathname.includes(e.route),
              })}
              to={e.route}
              // onClick={() => window.location.reload()}
              state={{ from: e.route }}
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
