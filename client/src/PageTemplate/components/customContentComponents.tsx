import cx from 'classnames'
import { MutableRefObject, ReactNode, useRef, useState } from 'react'
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
  const [flex, setFlex] = useState(1)
  const mediaRef = useRef({ offsetWidth: 0, offsetHeight: 0 })

  const onLoad = () => {
    setFlex(mediaRef.current.offsetWidth / mediaRef.current.offsetHeight)
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
            ref={mediaRef as MutableRefObject<HTMLImageElement>}
            onLoad={onLoad}
            onClick={() => window.open(props.src)}
            alt={props.mediaProps.alt}
            {...props.mediaProps}
          />
        )}

        {props.Type === 'video' && (
          <video
            src={props.src}
            ref={mediaRef as MutableRefObject<HTMLVideoElement>}
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
  const gridGap = `calc(100vw / ${props.columns} / 20)`

  return (
    <div className={styles.mediaGridContainer}>
      <figure>
        <div className={styles.mediaGridComponents} style={{ gap: gridGap }}>
          {/* thought this in-place function declaration/invocation was
              a fun way to easily split props.media into rows on render */}
          {(() => {
            const rows = []
            for (let i = 0; i < props.media.length / props.columns; i++) {
              const firstIdx = i * props.columns
              const currRow = props.media.slice(
                firstIdx,
                firstIdx + props.columns
              )
              rows.push(
                <div
                  className={styles.mediaGridRow}
                  style={{ gap: gridGap }}
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

const StatGrid = (props: AnyObject) => (
  <div className={styles.statGridContainer}>
    {Object.keys(props).map((e, i) => (
      <div className={styles.statContainer} key={i}>
        <div className={styles.label}>{e}:</div>
        <div className={styles.stat}>{props[e]}</div>
      </div>
    ))}
  </div>
)

export { Media, MediaGrid, StatGrid }
