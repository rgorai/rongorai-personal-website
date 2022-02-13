import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../styles/appContent.module.scss'
import ApiError from '../../Misc/components/ApiError'
import Loading from '../../Misc/components/Loading'
import ErrorBoundary from '../../Misc/components/ErrorBoundary'
import * as CustomComponents from './customContentComponents'

type AnyObject = { [key: string]: any }

type Tag = {
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
const isComponent = (x: any): x is Component => x.component !== undefined

type Props = {
  src: string
}

const ContentGenerator = (props: Props) => {
  const [pageData, setPageData] = useState(null as null | PageData)
  const [apiError, setApiError] = useState(null as null | AxiosResponse)

  useEffect(() => {
    axios
      .get(`/api/data/${encodeURIComponent(`${props.src}/data.js`)}`)
      .then((res) => setPageData(res.data))
      .catch((err) => setApiError(err.response))
  }, [props.src])

  useEffect(() => {
    // document.title = `${pageData} | Ron Gorai`
    console.log(pageData)
  }, [pageData])

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
