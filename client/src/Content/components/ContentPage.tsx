import styles from '../styles/contentPage.module.scss'
import ContentSideNav from './ContentSideNav'

interface Props {
  contentTitle: string
  contentSubtitle?: string
  navItems?: Array<string>
}

const ContentPage = (props: Props) => {
  return (
    <div className={styles.contentWrapper}>
      {props.navItems && (
        <ContentSideNav
          contentTitle={props.contentTitle}
          navItems={props.navItems}
        />
      )}

      <div className={styles.contentContainer}>
        <div>{`${props.contentTitle} container`}</div>
        {props.contentSubtitle && (
          <div>{`${props.contentSubtitle} specifically`}</div>
        )}
      </div>
    </div>
  )
}

export default ContentPage
