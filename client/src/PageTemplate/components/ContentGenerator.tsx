import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../styles/appContent.module.scss'
import ApiError from '../../Misc/components/ApiError'
import Loading from '../../Misc/components/Loading'
import ErrorBoundary from '../../Misc/components/ErrorBoundary'
import * as CustomComponents from './customContentComponents'

type Props = {
  src: string
}

type Tag = {
  tag: string
  text: string
  props?: { [key: string]: string }
}

type Component = {
  component: string
  props: { [key: string]: any }
}

type PageData = Array<Tag | Component>

const isTag = (x: any): x is Tag => x.tag !== undefined
const isComponent = (x: any): x is Component => x.component !== undefined
const isPageData = (x: any): x is PageData =>
  Array.isArray(x) && x.every((e) => isTag(e) || isComponent(e))

const ContentGenerator = (props: Props) => {
  const [pageData, setPageData] = useState(null as null | PageData)
  const [apiError, setApiError] = useState(null as null | AxiosResponse)

  // console.log('data', ErrorBoundary)

  useEffect(() => {
    axios
      .get(`/api/data/${encodeURIComponent(`${props.src}/data.js`)}`)
      .then((res) => setPageData(res.data))
      .catch((err) => setApiError(err.response))
  }, [props.src])

  const getComponent = (e: Component) => {
    const Temp = { ...CustomComponents }[e.component] as Function
    return <Temp {...e.props} />
  }

  return apiError ? (
    <ApiError {...apiError} />
  ) : pageData ? (
    <ErrorBoundary message="invalid json format">
      <div className={styles.contentContainer}>
        {pageData.map((e, i) => (
          <React.Fragment key={i}>
            {(isTag(e) && React.createElement(e.tag, e.props, e.text)) ||
              (isComponent(e) && getComponent(e))}
          </React.Fragment>
        ))}
      </div>
    </ErrorBoundary>
  ) : (
    <Loading />
  )
}

export default ContentGenerator
