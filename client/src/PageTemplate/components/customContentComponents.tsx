import cx from 'classnames'
import { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react'
import styles from '../styles/customComponents.module.scss'

type AnyObject = { [key: string]: any }

type MediaProps = {
  Type: 'img' | 'video'
  src: string
  mediaProps: AnyObject
  caption?: string
  floatLeft?: boolean
  floatRight?: boolean
  reduceWidth?: boolean
}

const Media = (props: MediaProps) => {
  const tagRef = useRef({ offsetWidth: 0, offsetHeight: 0 } as
    | HTMLImageElement
    | HTMLVideoElement)
  const [flex, setFlex] = useState(1)

  const onLoad = () => {
    setFlex(tagRef.current.offsetWidth / tagRef.current.offsetHeight)
  }

  return (
    <div
      className={cx(styles.mediaContainer, {
        [styles.reduceWidth]: props.reduceWidth,
      })}
      style={{ flex }}
    >
      <figure
        className={cx({
          [styles.floatLeft]: props.floatLeft,
          [styles.floatRight]: props.floatRight,
        })}
      >
        {props.Type === 'img' && (
          <img
            className={styles.zoomIn}
            src={props.src}
            ref={tagRef as MutableRefObject<HTMLImageElement>}
            onLoad={onLoad}
            onClick={() => window.open(props.src)}
            alt={props.mediaProps.alt}
            {...props.mediaProps}
          />
        )}

        {props.Type === 'video' && (
          <video
            src={props.src}
            ref={tagRef as MutableRefObject<HTMLVideoElement>}
            onLoadedMetadata={onLoad}
            {...props.mediaProps}
          />
        )}
        {props.caption && <figcaption>{props.caption}</figcaption>}
      </figure>
    </div>
  )
}

type MediaGridProps = {
  columns: number
  media: Array<MediaProps>
  caption?: string
}

const MediaGrid = (props: MediaGridProps) => {
  const gridContainerRef = useRef({} as HTMLDivElement)
  const [gridGap, setGridGap] = useState(0)

  useEffect(() => {
    const containerWidth = gridContainerRef.current.offsetWidth
    const calculateGridGap = () => (containerWidth * 2) / props.columns / 25

    const handleResize = () => {
      setGridGap(calculateGridGap())
    }

    setGridGap(calculateGridGap())

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [props.columns, props.media])

  return (
    <div className={styles.mediaGridContainer} ref={gridContainerRef}>
      <figure>
        <div
          className={styles.mediaGridComponents}
          style={{ gap: `${gridGap}px` }}
        >
          {/* thought this in-place function invocation was a
              fun way to split props.media into rows on render */}
          {(() => {
            const rows = [] as Array<ReactNode>
            for (let i = 0; i < props.media.length / props.columns; i++) {
              const firstIdx = i * props.columns
              const currRow = props.media.slice(
                firstIdx,
                firstIdx + props.columns
              )
              rows.push(
                <div
                  className={styles.mediaGridRow}
                  style={{ gap: `${gridGap}px` }}
                  key={i}
                >
                  {currRow.map((e, j) => (
                    <Media {...e} key={`${i}${j}`} />
                  ))}
                </div>
              )
            }
            return rows
          })()}
        </div>

        {props.caption && (
          <figcaption className={styles.gridCaption}>
            {props.caption}
          </figcaption>
        )}
      </figure>
    </div>
  )
}

export { Media, MediaGrid }
