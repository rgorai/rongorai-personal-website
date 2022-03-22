import { useEffect, ReactNode } from 'react'
import cx from 'classnames'
import styles from '../styles/footer.module.scss'
import { getFile } from '../../services/utils'
import Logo from './Logo'

const EMAIL = 'ron.gorai2020@gmail.com'
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

const FooterLink = (
  text: string,
  link: string,
  newTab: boolean,
  key: number
) => (
  <p key={key}>
    <a
      className={styles.footerLink}
      href={link}
      {...(newTab ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {text}
    </a>
  </p>
)

type Props = {
  navItems: Array<{ name: string; route: string }>
}

const Footer = (props: Props) => {
  const footerContent = [
    {
      heading: 'INFO',
      items: [
        <p className={styles.message} key={0}>
          Learn about my professional experience and hobbies on my website
          created from scratch. Be sure to sign the guestbook before you go!
        </p>,
        FooterLink(EMAIL, `mailto:${EMAIL}`, true, 1),
        FooterLink('My Resume', getFile('Ron_Gorai_Resume.pdf'), true, 2),
      ],
    },
    {
      heading: 'MENU',
      items: props.navItems.map((e, i) =>
        FooterLink(e.name, e.route, false, i)
      ),
    },
    {
      heading: 'SOCIAL LINKS',
      items: SOCIAL_LINKS.map((e, i) => (
        <a href={e.link} target="_blank" rel="noreferrer">
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/social_icons/${e.name}.svg`}
            title={e.name}
            alt={e.name}
            key={i}
          />
        </a>
      )),
      horizontal: true,
    },
    {
      heading: 'CREATED BY',
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
