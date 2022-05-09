import { ReactNode, useState } from 'react'
import { parseRoute } from '../../services/utils'
import styles from '../styles/pageTemplate.module.scss'
import TableOfContents from '../../PageTemplate/components/TableOfContents'
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
  const [headingData, setHeadingData] = useState([])

  return (
    <div className={styles.contentPageWrapper}>
      {isAppContent(props) ? (
        <>
          <div className={styles.sideNavWrapper}>
            <SideNav
              navItems={
                props.subItems?.map((e) => ({
                  name: e,
                  route: parseRoute(props.contentTitle, e),
                })) ?? []
              }
            />
          </div>

          <div className={styles.contentGeneratorWrapper}>
            <ContentGenerator src={props.src} setHeadingData={setHeadingData} />
            {/* <Routes></Routes> */}
          </div>

          <div className={styles.tocWrapper}>
            <TableOfContents data={headingData} />
          </div>
        </>
      ) : (
        props.element
      )}
    </div>
  )
}

export default PageTemplate
