import { Link } from 'react-router-dom'
import styles from '../styles/contentPage.module.scss'

interface Props {
  title: string
  subtitle?: string
  navItems?: Array<string>
}

const ContentPage = (props: Props) => {
  return (
    <div className={styles.contentWrapper}>
      {props.navItems && (
        <div className={styles.sideNavContainer}>
          <ul>
            {props.navItems.map((e, i) => (
              <li key={i}>
                <Link
                  to={`/${props.title.toLowerCase()}/${e
                    .replace(' ', '')
                    .toLowerCase()}`}
                >
                  {e}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.contentContainer}>
        <div>{`${props.title} container`}</div>
        {props.subtitle && (
          <div>{`${props.subtitle} specifically`}</div>
        )}
      </div>
    </div>
  )
}

export default ContentPage
