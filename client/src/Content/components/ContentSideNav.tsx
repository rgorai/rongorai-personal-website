import { Link, useLocation } from 'react-router-dom'
import cx from 'classnames'
import styles from '../styles/contentSideNav.module.scss'

interface Props {
  contentTitle: string
  navItems: Array<string>
}

const ContentSideNav = (props: Props) => {
  const location = useLocation()

  return (
    <nav className={styles.sideNavContainer}>
      <ul>
        {props.navItems.map((e, i) => (
          <li className={styles.sideNavItem} key={i}>
            <Link
              className={cx(styles.sideNavLink, {
                [styles.activeSideNavLink]:
                  location.pathname.includes(
                    e.replace(' ', '').toLowerCase()
                  ),
              })}
              to={`/${props.contentTitle.toLowerCase()}/${e
                .replace(' ', '')
                .toLowerCase()}`}
            >
              {e}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default ContentSideNav
