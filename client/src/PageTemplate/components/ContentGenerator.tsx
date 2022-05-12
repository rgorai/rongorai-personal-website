import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import DOMPurify from 'dompurify'
import styles from '../styles/appContent.module.scss'
import ErrorBoundary from '../../Misc/components/ErrorBoundary'
import { getMedia, parseId } from '../../services/utils'
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

const ContentGenerator = (props: Props) => {
  const [pageData, setPageData] = useState([] as PageData)
  const [apiError, setApiError] = useState({} as AxiosResponse)
  const [numUnloadedMedia, setNumUnloadedMedia] = useState(0)

  const getComponent = (e: Component) => {
    const Temp = { ...CustomComponents }[e.component] as Function
    return <Temp {...e.props} />
  }

  useEffect(() => {
    setPageData([])
    setApiError({} as AxiosResponse)
    setNumUnloadedMedia(0)
    props.setHeadingData([])

    axios
      .get(`/api/data/${encodeURIComponent(`${props.src}`)}`)
      .then(({ data }: { data: PageData }) => {
        // calculate total number of media
        setNumUnloadedMedia(
          data.reduce(
            (p, c) =>
              p +
              (isComponent(c) &&
                (c.component === 'Media'
                  ? 1
                  : c.component === 'MediaGrid'
                  ? c.props.media.length
                  : 0)),
            0
          )
        )

        // pre-load all media
        const preload = (mediaProps: AnyObject) => {
          let { Type, src } = mediaProps
          const media = document.createElement(Type)

          if (Type === 'img') {
            media.onload = () => {
              mediaProps.flex = media.width / media.height
              setNumUnloadedMedia((prev) => prev - 1)
            }
          } else if (Type === 'video') {
            media.onloadedmetadata = () => {
              mediaProps.flex = media.videoWidth / media.videoHeight
              setNumUnloadedMedia((prev) => prev - 1)
            }
          }
          media.onerror = () => {
            media.src = getMedia('/not-found-image.webp', true)
          }

          // trigger browser download
          media.src = getMedia(src, Type === 'img')
        }
        for (const e of data) {
          if (isComponent(e)) {
            if (e.component === 'Media') preload(e.props)
            else if (e.component === 'MediaGrid')
              for (const f of e.props.media) preload(f)
          }
        }

        // apply page data, giving all headings a generated id
        setPageData(
          data.map((e) =>
            isHeading(e)
              ? { ...e, props: { ...e.props, id: parseId(e.text) } }
              : e
          )
        )
      })
      .catch((err) => setApiError(err.response))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.src])

  useEffect(() => {
    if (pageData.length > 0 && numUnloadedMedia === 0)
      props.setHeadingData(pageData.filter((e) => isHeading(e)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData, numUnloadedMedia, props.setHeadingData])

  // scroll window to desired vertical position when pageData loads
  useEffect(() => {
    if (pageData.length > 0) {
      const offsetMarginTop = 75
      window.scrollTo(
        0,
        window.location.hash.length > 0
          ? (document.getElementById(window.location.hash.slice(1))
              ?.offsetTop ?? offsetMarginTop) - offsetMarginTop
          : 0
      )
    }
  }, [pageData])

  return Object.keys(apiError).length ? (
    <ApiError {...apiError} />
  ) : pageData.length > 0 && numUnloadedMedia === 0 ? (
    <ErrorBoundary message="Content page error">
      <article className={styles.contentContainer}>
        {pageData.map((e, i) => (
          <React.Fragment key={i}>
            {isTag(e) &&
              React.createElement(e.tag, {
                ...e.props,
                dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(e.text) },
              })}
            {isComponent(e) && getComponent(e)}
          </React.Fragment>
        ))}
      </article>
    </ErrorBoundary>
  ) : (
    <Loading />
  )
}

export default ContentGenerator
