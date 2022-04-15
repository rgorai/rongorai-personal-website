import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import DOMPurify from 'dompurify'
import styles from '../styles/appContent.module.scss'
import ErrorBoundary from '../../Misc/components/ErrorBoundary'
import { parseId } from '../../services/utils'
import Loading from '../../Misc/components/Loading'
import ApiError from '../../Misc/components/ApiError'
import * as CustomComponents from './customContentComponents'

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
  setHeadingData: Function
}

const getComponent = (e: Component) => {
  const Temp = { ...CustomComponents }[e.component] as Function
  return <Temp {...e.props} />
}

const ContentGenerator = (props: Props) => {
  const [pageData, setPageData] = useState([] as PageData)
  const [apiError, setApiError] = useState({} as AxiosResponse)

  useEffect(() => {
    setApiError({} as AxiosResponse)
    axios
      .get(`/api/data/${encodeURIComponent(`${props.src.slice(1)}/data.js`)}`)
      .then((res) => {
        setPageData(
          // give all headings a generated id
          (res.data as PageData).map((e) =>
            isHeading(e)
              ? { ...e, props: { ...e.props, id: parseId(e.text) } }
              : e
          )
        )
        window.scrollTo(0, 0)
      })
      .catch((err) => setApiError(err.response))
  }, [props.src])

  useEffect(() => {
    props.setHeadingData(pageData.filter((e) => isHeading(e)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData, props.setHeadingData])

  return Object.keys(apiError).length ? (
    <ApiError {...apiError} />
  ) : pageData.length > 0 ? (
    <ErrorBoundary message="Content page error">
      <article className={styles.contentContainer}>
        {pageData.map((e, i) => (
          <React.Fragment key={i}>
            {(isTag(e) &&
              React.createElement(e.tag, {
                ...e.props,
                dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(e.text) },
              })) ||
              (isComponent(e) && getComponent(e))}
          </React.Fragment>
        ))}
      </article>
    </ErrorBoundary>
  ) : (
    <Loading />
  )
}

export default ContentGenerator
