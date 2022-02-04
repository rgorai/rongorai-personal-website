import { ReactElement } from 'react'
import styles from '../styles/pageTemplate.module.scss'
import { parseRoute } from '../../services/utils'
import SideNav from './SideNav'
import ContentGenerator from './ContentGenerator'

type AppContent = {
  contentTitle: string
  contentSubtitle: string
  navItems: Array<string>
  src: string
}

type Other = {
  contentTitle: string
  element: ReactElement
}

const isAppContent = (x: any): x is AppContent => x.src

const PageTemplate = (props: AppContent | Other) => {
  return (
    <div className={styles.contentPageWrapper}>
      {isAppContent(props) ? (
        <>
          <SideNav
            navItems={props.navItems.map((e) => ({
              name: e,
              route: parseRoute(props.contentTitle, e),
            }))}
          />

          <div className={styles.contentWrapper}>
            <ContentGenerator src={props.src.slice(1)} />
          </div>
        </>
      ) : (
        <div className={styles.contentWrapper}>{props.element}</div>
      )}
    </div>
  )
}

export default PageTemplate
