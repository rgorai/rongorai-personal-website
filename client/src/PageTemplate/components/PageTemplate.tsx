import { ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { parseRoute } from '../../services/utils'
import styles from '../styles/pageTemplate.module.scss'
import ContentGenerator from './ContentGenerator'
import SideNav from './SideNav'

type AppContent = {
  contentTitle: string
  src: string
  contentSubtitle?: string
  subItems?: Array<string>
}

type Other = {
  contentTitle: string
  element: ReactNode
}

const isAppContent = (x: any): x is AppContent => x.src !== undefined

const PageTemplate = (props: AppContent | Other) => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash.length === 0) window.scrollTo(0, 0)
  }, [location])

  return (
    <div className={styles.contentPageWrapper}>
      {isAppContent(props) ? (
        <>
          {props.subItems && (
            <SideNav
              navItems={props.subItems.map((e) => ({
                name: e,
                route: parseRoute(props.contentTitle, e),
              }))}
            />
          )}

          <ContentGenerator src={props.src} />
        </>
      ) : (
        props.element
      )}
    </div>
  )
}

export default PageTemplate
