import { Link, useLocation } from 'react-router-dom'
import cx from 'classnames'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { getFile } from '../../services/utils'
import styles from '../styles/navBar.module.scss'
import Logo from './Logo'

type BooleanObject = { [key: string]: boolean }

type NavInfo = {
  name: string
  route: string
}

type Props = {
  navItems: Array<NavInfo & { subItems: undefined | Array<NavInfo> }>
}

const NavBar = (props: Props) => {
  const location = useLocation()
  const [displayMobileNav, setDisplayMobileNav] = useState(true)
  const [displaySubMenu, setDisplaySubMenu] = useState({} as BooleanObject)
  const navRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // change page title respective to current location
  useEffect(() => {
    document.title = `${
      props.navItems.find((e) => location.pathname.includes(e.route))?.name
    } | Ron Gorai's Personal Website`
  }, [location.pathname, props.navItems])

  // reset mobile nav on route change
  useEffect(() => {
    // if (!(location.state && !(location.state as { subMenuPress: boolean }).subMenuPress))
    //   setDisplayMobileNav(false)
  }, [location])

  useEffect(() => {
    // hide submenus
    setDisplaySubMenu(
      props.navItems.reduce(
        (p, c) => ({ ...p, [c.name]: location.pathname.includes(c.route) }),
        {}
      )
    )

    // hide site overflow when mobile nav is open
    document.getElementsByTagName('body')[0].style.overflow = displayMobileNav
      ? 'hidden'
      : 'visible'

    // close mobile nav on click outside
    const handleClickOnOutside = (ev: { target: any }) => {
      if (
        displayMobileNav &&
        !navRef.current?.contains(ev.target) &&
        !buttonRef.current?.contains(ev.target)
      )
        setDisplayMobileNav(false)
    }
    document.addEventListener('mousedown', handleClickOnOutside)

    // close mobile nav on desktop site
    const handleResize = () => {
      if (window.innerWidth > 1000) setDisplayMobileNav(false)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('mousedown', handleClickOnOutside)
      window.removeEventListener('resize', handleResize)
    }
  }, [displayMobileNav, location.pathname, props.navItems])

  return (
    <nav>
      <div className={styles.desktopNavContainer}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <ul className={styles.desktopNav}>
          {props.navItems.map((e, i) => (
            <li key={i}>
              <Link
                className={cx(styles.navLink, styles.desktopNavItem, {
                  [styles.activeNavItem]: location.pathname.includes(e.route),
                })}
                to={e.route}
              >
                {e.name.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className={styles.mobileNavMenuButton}
          onClick={() => setDisplayMobileNav(!displayMobileNav)}
          ref={buttonRef}
        >
          <img
            className={styles.menuIcon}
            src={`${process.env.PUBLIC_URL}/menu_icons/menu-icon.svg`}
            alt="Menu Icon"
          />
        </button>
      </div>

      <div
        className={cx(styles.mobileNavBackdrop, {
          [styles.hideBackdrop]: !displayMobileNav,
        })}
      />

      <div
        className={cx(styles.mobileNavContainer, {
          [styles.hideContainer]: !displayMobileNav,
        })}
        ref={navRef}
      >
        <ul className={styles.mobileNav}>
          {props.navItems.map((e, i) => (
            <li
              className={cx(styles.mobileNavItem, {
                [styles.subMenuOpen]: displaySubMenu[e.name],
              })}
              key={i}
            >
              {e.subItems ? (
                <>
                  <Link
                    className={cx(styles.navLink, styles.navLink_subMenu, {
                      [styles.activeNavItem]: location.pathname.includes(
                        e.route
                      ),
                    })}
                    to={{}}
                    state={{ subMenuPress: true }}
                    onClick={() =>
                      // open chosen sub menu and close all others
                      setDisplaySubMenu((prev) =>
                        props.navItems.reduce(
                          (p, c) =>
                            e.name === c.name
                              ? { ...p, [c.name]: !prev[c.name] }
                              : { ...p, [c.name]: false },
                          {}
                        )
                      )
                    }
                  >
                    <span className={styles.navLinkTextContainer}>
                      <span>{e.name.toUpperCase()}</span>
                      <div className={styles.iconSpacer} />
                      <img
                        className={cx(styles.expandIcon, {
                          [styles.closeIcon]: displaySubMenu[e.name],
                        })}
                        src={`${process.env.PUBLIC_URL}/menu_icons/expand-icon.png`}
                        alt="Expand Menu"
                      />
                    </span>
                  </Link>
                  <ul
                    className={cx(styles.subItemDropdown, {
                      [styles.showSubDropdown]: displaySubMenu[e.name],
                    })}
                    style={
                      displaySubMenu[e.name]
                        ? { height: `${e.subItems.length * 2.25}em` }
                        : {}
                    }
                  >
                    {e.subItems.map((f, j) => (
                      <li key={j}>
                        <Link
                          className={cx(styles.navLink, styles.subItemLink, {
                            [styles.activeSubItem]: location.pathname.includes(
                              f.route
                            ),
                          })}
                          to={f.route}
                        >
                          {f.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  className={cx(styles.navLink, styles.navLink_noSubMenu, {
                    [styles.activeNavItem]: location.pathname.includes(e.route),
                  })}
                  to={e.route}
                >
                  {e.name.toUpperCase()}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
