import { ReactNode } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import styles from '../styles/footer.module.scss'
import type { NavInfo } from '../../App'
import Logo from './Logo'

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/ron-gorai-51b401142/',
  },
  {
    name: 'GitHub',
    link: 'https://github.com/rgorai',
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/ron_gorai/',
  },
  {
    name: 'Facebook',
    link: 'https://www.facebook.com/people/Ron-Gorai/100010029007923/',
  },
]

type Props = {
  navItems: Array<NavInfo>
}

const Footer = (props: Props) => {
  const footerContent = [
    {
      heading: 'INFO',
      items: [
        <p className={styles.message}>
          I am currently a senior at the Stevens Institute of Technology in
          Hoboken, NJ pursuing a BS in Computer Science with a strong passion
          for web development.
        </p>,
        <p className={styles.message}>
          Learn about my professional experience and hobbies on my website
          created from scratch. Be sure to sign my guestbook before you go!
        </p>,
      ],
    },
    {
      heading: 'MENU',
      items: props.navItems.map((e, i) => (
        <p key={i}>
          <Link className={styles.footerLink} to={e.route}>
            {e.name}
          </Link>
        </p>
      )),
    },
    {
      heading: 'SOCIAL LINKS',
      items: SOCIAL_LINKS.map((e, i) => (
        <a
          className={styles.socialIconLink}
          href={e.link}
          target="_blank"
          rel="noreferrer"
          key={i}
        >
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/social_icons/${e.name}.svg`}
            title={e.name}
            alt={e.name}
          />
        </a>
      )),
      horizontal: true,
    },
    {
      heading: 'BUILT BY',
      items: [<Logo />],
    },
  ] as Array<{
    heading: string
    items: Array<ReactNode>
    horizontal?: boolean
  }>

  return (
    <footer className={styles.footerContainer}>
      {footerContent.map((e, i) => (
        <div className={styles.contentContainer} key={i}>
          <h3>{e.heading}</h3>
          <ul>
            {e.items.map((f, j) => (
              <li className={cx({ [styles.horizontal]: e.horizontal })} key={j}>
                {f}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </footer>
  )
}

export default Footer
