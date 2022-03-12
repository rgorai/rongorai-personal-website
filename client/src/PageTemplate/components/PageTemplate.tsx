import { ReactNode, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { parseRoute } from '../../services/utils'
import styles from '../styles/pageTemplate.module.scss'
import { parseId } from '../../services/utils'
import Loading from '../../Misc/components/Loading'
import ApiError from '../../Misc/components/ApiError'
import ContentGenerator from './ContentGenerator'
import SideNav from './SideNav'

type AnyObject = { [key: string]: any }

type AppContent = {
  contentTitle: string
  src: string
  contentSubtitle?: string
  navItems?: Array<string>
}

type Other = {
  contentTitle: string
  element: ReactNode
}

export type Tag = {
  tag: string
  text: string
  props?: AnyObject
}

type Component = {
  component: string
  props: AnyObject
}

type PageData = Array<Tag | Component>

const isAppContent = (x: any): x is AppContent => x.src !== undefined

const PageTemplate = (props: AppContent | Other) => {
  const [pageData, setPageData] = useState(null as null | PageData)
  const [apiError, setApiError] = useState(null as null | AxiosResponse)

  useEffect(() => {
    // console.log('refetched')
    if (isAppContent(props))
      axios
        .get(`/api/data/${encodeURIComponent(`${props.src.slice(1)}/data.js`)}`)
        .then((res) => setPageData(res.data))
        .catch((err) => setApiError(err.response))
  }, [props])

  return (
    <div className={styles.contentPageWrapper}>
      {isAppContent(props) ? (
        <>
          {props.navItems && (
            <SideNav
              navItems={props.navItems.map((e) => ({
                name: e,
                route: parseRoute(props.contentTitle, e),
              }))}
            />
          )}

          {apiError ? (
            <ApiError {...apiError} />
          ) : pageData ? (
            <ContentGenerator data={pageData} />
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <div className={styles.contentWrapper}>{props.element}</div>
      )}
    </div>
  )
}

export default PageTemplate
