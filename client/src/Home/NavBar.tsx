import { Link, useLocation } from 'react-router-dom'
import cx from 'classnames'
import { useEffect, useState } from 'react'
import styles from './navBar.module.scss'
import NavBarDropdown from './NavBarDropdown'

const navLinks = [
  { name: 'ABOUT', link: '/about' },
  {
    name: 'PROJECTS',
    link: '/projects',
    submenu: ['PROFESSIONAL', 'PERSONAL'],
  },
  {
    name: 'HOBBIES',
    link: '/hobbies',
    submenu: ['MUSIC', 'STEM', 'BOWLING', 'SNOWBOARDING'],
  },
  { name: 'GUESTBOOK', link: '/guestbook' },
]

const NavBar = () => {
  const location = useLocation()
  const [navDropdowns, setNavDropdowns] = useState(
    navLinks
      .filter((e) => e.submenu)
      .reduce((p, c) => ({ ...p, [c.name]: false }), {}) as {
      [key: string]: boolean
    }
  )

  useEffect(() => {
    console.log(navDropdowns)
  }, [navDropdowns])

  const showDropdown = (name: string) => {
    const temp = { ...navDropdowns }
    Object.keys(temp).forEach((k) => {
      temp[k] = k === name ? true : false
    })
    setNavDropdowns(temp)
  }
  const hideDropdown = (name: string) => {
    const temp = { ...navDropdowns }
    Object.keys(temp).forEach((k) => {
      temp[k] = false
    })
    setNavDropdowns(temp)
  }

  return (
    <nav className={styles.navbar}>
      <Link className={cx(styles.logo, styles.navItem)} to="/">
        <img
          className={styles.logoImg}
          src={process.env.PUBLIC_URL + 'logo.svg'}
          alt="Logo"
        />
        <span>Ron Gorai</span>
      </Link>
      <ul>
        {navLinks.map((e, i) => (
          <li
            key={i}
            onMouseEnter={() => showDropdown(e.name)}
            onMouseLeave={() => hideDropdown(e.name)}
          >
            <Link
              className={cx(styles.navLink, styles.navItem)}
              to={e.link}
            >
              <span
                className={cx({
                  [styles.activeNav]:
                    location.pathname.split('/')[1] ===
                    e.link.split('/')[1],
                })}
              >
                {e.name}
              </span>
              {e.submenu && (
                <span className={styles.navArrow}>
                  {String.fromCharCode(9662)}
                </span>
              )}
            </Link>
            {e.submenu && navDropdowns[e.name] && (
              <NavBarDropdown origin={e.name} menuItems={e.submenu} />
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
