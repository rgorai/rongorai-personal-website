import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useLocation } from 'react-router-dom'
import styles from '../styles/appContent.module.scss'
import ErrorBoundary from '../../Misc/components/ErrorBoundary'
import { parseId } from '../../services/utils'
import Loading from '../../Misc/components/Loading'
import ApiError from '../../Misc/components/ApiError'
import * as CustomComponents from './customContentComponents'
import TableOfContents from './TableOfContents'

type AnyObject = { [key: string]: any }

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

const isTag = (x: any): x is Tag => x.tag !== undefined
const isHeading = (x: any): x is Tag => x.tag === 'h2'
const isComponent = (x: any): x is Component => x.component !== undefined

type Props = {
  src: string
}

const getComponent = (e: Component) => {
  const Temp = { ...CustomComponents }[e.component] as Function
  return <Temp {...e.props} />
}

const ContentGenerator = (props: Props) => {
  const [pageData, setPageData] = useState(null as null | PageData)
  const [apiError, setApiError] = useState(null as null | AxiosResponse)

  useEffect(() => {
    setApiError(null)
    axios
      .get(`/api/data/${encodeURIComponent(`${props.src.slice(1)}/data.js`)}`)
      .then((res) =>
        setPageData(
          // give all headings a generated id
          (res.data as PageData).map((e) =>
            isHeading(e)
              ? { ...e, props: { ...e.props, id: parseId(e.text) } }
              : e
          )
        )
      )
      .catch((err) => setApiError(err.response))
  }, [props])

  return apiError ? (
    <ApiError {...apiError} />
  ) : pageData ? (
    <ErrorBoundary message="invalid json format">
      <div className={styles.contentWrapper}>
        <article className={styles.contentContainer}>
          {pageData.map((e, i) => (
            <React.Fragment key={i}>
              {(isTag(e) && React.createElement(e.tag, e.props, e.text)) ||
                (isComponent(e) && getComponent(e))}
            </React.Fragment>
          ))}
        </article>
        <TableOfContents
          data={pageData.filter((e) => isHeading(e)) as Array<Tag>}
        />
      </div>
    </ErrorBoundary>
  ) : (
    <Loading />
  )
}

export default ContentGenerator
