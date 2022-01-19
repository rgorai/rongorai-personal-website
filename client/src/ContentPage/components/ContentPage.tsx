import { ReactElement } from 'react'
import cx from 'classnames'
import styles from '../styles/contentPage.module.scss'
import { parseRoute } from '../../services/utils'
import ContentSideNav from './ContentSideNav'

type Props = {
  contentTitle: string
  contentSubtitle?: string
  navItems?: Array<{ name: string; element: ReactElement }>
  element: ReactElement
}

const ContentPage = (props: Props) => {
  return (
    <div className={styles.contentPageWrapper}>
      {props.navItems && (
        <ContentSideNav
          navItems={props.navItems.map((e) => ({
            name: e.name,
            route: parseRoute([props.contentTitle, e.name]),
          }))}
        />
      )}

      <div className={cx(styles.contentWrapper, 'content-container')}>
        {props.element}
      </div>
    </div>
  )
}

export default ContentPage
