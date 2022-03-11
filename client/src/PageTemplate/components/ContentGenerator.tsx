import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../styles/appContent.module.scss'
import ApiError from '../../Misc/components/ApiError'
import Loading from '../../Misc/components/Loading'
import ErrorBoundary from '../../Misc/components/ErrorBoundary'
import { parseId } from '../../services/utils'
import * as CustomComponents from './customContentComponents'
import TableOfContents from './TableOfContents'

// import ScrollToTop from './ScrollToTop'

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
  data: PageData
}

const getComponent = (e: Component) => {
  const Temp = { ...CustomComponents }[e.component] as Function
  return <Temp {...e.props} />
}

const ContentGenerator = (props: Props) => {
  const [pageData, setPageData] = useState([] as PageData)

  // give all headings a generated id
  useEffect(() => {
    // console.log('test', typeof props.data)
    setPageData(
      props.data.map((e) =>
        isHeading(e) ? { ...e, props: { ...e.props, id: parseId(e.text) } } : e
      )
    )
  }, [props.data])

  return (
    <ErrorBoundary message="invalid json format">
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          {pageData.map((e, i) => (
            <React.Fragment key={i}>
              {(isTag(e) && React.createElement(e.tag, e.props, e.text)) ||
                (isComponent(e) && getComponent(e))}
            </React.Fragment>
          ))}
        </div>
        <TableOfContents
          data={pageData.filter((e) => isHeading(e)) as Array<Tag>}
        />
      </div>
    </ErrorBoundary>
  )
}

export default ContentGenerator
