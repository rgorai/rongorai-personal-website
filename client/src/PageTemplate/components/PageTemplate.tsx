import { ReactNode, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { parseFilename, parseRoute } from '../../services/utils'
import styles from '../styles/pageTemplate.module.scss'
import TableOfContents from '../../PageTemplate/components/TableOfContents'
import ContentGenerator from './ContentGenerator'
import SideNav from './SideNav'

type AppContent = {
  contentTitle: string
  src: string
  subItems: Array<string> | undefined
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
            {props.subItems ? (
              <Routes>
                {props.subItems.map((e, i) => (
                  <Route
                    path={parseRoute(e)}
                    element={
                      <ContentGenerator
                        src={parseFilename(props.contentTitle, e)}
                        setHeadingData={setHeadingData}
                      />
                    }
                    key={i}
                  />
                ))}
              </Routes>
            ) : (
              <ContentGenerator
                src={props.src}
                setHeadingData={setHeadingData}
              />
            )}
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
