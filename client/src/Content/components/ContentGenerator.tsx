import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import DOMPurify from 'dompurify'
import { useLocation } from 'react-router-dom'
import styles from '../styles/appContent.module.scss'
import ErrorBoundary from '../../Misc/components/ErrorBoundary'
import { getMedia, parseId } from '../../services/utils'
import Loading from '../../Misc/components/Loading'
import ApiError from '../../Misc/components/ApiError'
import { useStore } from '../../services/store'
import * as CustomComponents from './customContentComponents'

export type Tag = {
  tag: string
  text: string
  props?: Record<string, any>
}

type Component = {
  component: string
  props: Record<string, any>
}

export type PageData = Array<Tag | Component>

const isTag = (x: any): x is Tag => x.tag !== undefined
const isHeading = (x: any): x is Tag => x.tag === 'h2'
const isComponent = (x: any): x is Component => x.component !== undefined

type Props = {
  src: string
  setHeadingData: Dispatch<SetStateAction<any>>
}

const ContentGenerator = (props: Props) => {
  const { store, setStore } = useStore()
  const pageData = store.pageData[props.src]
  const [apiError, setApiError] = useState<AxiosResponse | null>(null)
  const [numUnloadedMedia, setNumUnloadedMedia] = useState(0)
  const { hash } = useLocation()

  const getComponent = (e: Component) => {
    const Temp = { ...CustomComponents }[e.component] as () => JSX.Element
    return <Temp {...e.props} />
  }

  useEffect(() => {
    setApiError(null)
    setNumUnloadedMedia(0)
    props.setHeadingData([])

    if (!pageData)
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
          const preload = (mediaProps: Record<string, any>) => {
            const { Type, src } = mediaProps
            const media = document.createElement(Type)

            if (Type === 'img') {
              media.onload = () => {
                mediaProps.flex = media.width / media.height
                setNumUnloadedMedia((prev) => prev - 1)
                media.remove()
              }
            } else if (Type === 'video') {
              media.onloadedmetadata = () => {
                mediaProps.flex = media.videoWidth / media.videoHeight
                setNumUnloadedMedia((prev) => prev - 1)
                media.remove()
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
          setStore((prev) => ({
            ...prev,
            pageData: {
              ...prev.pageData,
              [props.src]: data.map((e) =>
                isHeading(e)
                  ? { ...e, props: { ...e.props, id: parseId(e.text) } }
                  : e
              ),
            },
          }))
        })
        .catch((err) => setApiError(err.response))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.src])

  useEffect(() => {
    if (pageData && numUnloadedMedia === 0)
      props.setHeadingData(pageData.filter((e) => isHeading(e)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData, numUnloadedMedia, props.setHeadingData])

  // scroll window to desired vertical position when pageData loads
  useEffect(() => {
    if (pageData && numUnloadedMedia === 0) {
      const marginTopOffset = 75
      if (hash.length > 1)
        window.scrollTo(
          0,
          (document.getElementById(hash.slice(1))?.offsetTop ??
            marginTopOffset) - marginTopOffset
        )
    }
  }, [pageData, numUnloadedMedia, hash])

  return apiError ? (
    <ApiError {...apiError} />
  ) : pageData && numUnloadedMedia === 0 ? (
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
