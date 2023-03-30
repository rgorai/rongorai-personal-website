import { Link, useLocation } from 'react-router-dom'
import cx from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { Spin as Hamburger } from 'hamburger-react'
import styles from '../styles/navBar.module.scss'
import type { NavInfo } from '../../App'
import Logo from '../../Misc/components/Logo'
import DarkSwitch from './DarkSwitch'

const SUBITEM_HEIGHT = 2.5
const SUBNAV_PADDING_TOP = 0.5
const SUBNAV_PADDING_BOTTOM = 0.5

type BooleanObject = { [key: string]: boolean }

type Props = {
  navItems: Array<NavInfo>
}

const NavBar = (props: Props) => {
  const [displayMobileNav, setDisplayMobileNav] = useState(false)
  const [displaySubMenu, setDisplaySubMenu] = useState({} as BooleanObject)
  const navRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // change page title respective to current location
  useEffect(() => {
    document.title = `${
      props.navItems.find((e) => location.pathname.includes(e.route))?.name ??
      'Error'
    } | Ron Gorai's Personal Website`
  }, [location.pathname, props.navItems])

  // close mobile nav on location change
  useEffect(() => {
    setDisplayMobileNav(false)
  }, [location])

  useEffect(() => {
    // reset submenus
    setDisplaySubMenu(
      props.navItems
        .filter((e) => e.subItems)
        .reduce(
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

    // ensure mobile nav is closed on desktop site
    const handleResize = () => {
      if (window.innerWidth > 900) setDisplayMobileNav(false)
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

        <div className={styles.nightSwitchWrapper}>
          <DarkSwitch />
        </div>

        <div className={styles.mobileNavButtonContainer} ref={buttonRef}>
          <Hamburger
            toggled={displayMobileNav}
            toggle={setDisplayMobileNav}
            color="white"
            size={28}
            distance="lg"
            duration={0.3}
            label="Navigation Menu"
            direction="right"
            rounded
          />
        </div>
      </div>

      {window.innerWidth <= 900 && (
        <>
          <div
            className={cx(styles.mobileNavBackdrop, {
              [styles.showBackdrop]: displayMobileNav,
            })}
          />

          <div
            className={cx(styles.mobileNavContainer, {
              [styles.showMobileContainer]: displayMobileNav,
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
                      <div
                        className={cx(styles.navLink, {
                          [styles.activeNavItem]: location.pathname.includes(
                            e.route
                          ),
                        })}
                        onClick={() =>
                          // open chosen sub menu and close all others
                          setDisplaySubMenu((prev) =>
                            props.navItems
                              .filter((e) => e.subItems)
                              .reduce(
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
                      </div>
                      <ul
                        className={styles.subItemDropdown}
                        style={
                          displaySubMenu[e.name]
                            ? {
                                height: `${
                                  e.subItems.length * SUBITEM_HEIGHT +
                                  SUBNAV_PADDING_TOP +
                                  SUBNAV_PADDING_BOTTOM
                                }em`,
                                paddingTop: `${SUBNAV_PADDING_TOP}em`,
                                paddingBottom: `${SUBNAV_PADDING_BOTTOM}em`,
                              }
                            : {}
                        }
                      >
                        {e.subItems.map((f, j) => (
                          <li style={{ height: `${SUBITEM_HEIGHT}em` }} key={j}>
                            <Link
                              className={cx(
                                styles.navLink,
                                styles.subItemLink,
                                {
                                  [styles.activeSubItem]:
                                    location.pathname.includes(f.route),
                                }
                              )}
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
                      className={cx(styles.navLink, {
                        [styles.activeNavItem]: location.pathname.includes(
                          e.route
                        ),
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
        </>
      )}
    </nav>
  )
}

export default NavBar
