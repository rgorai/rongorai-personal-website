import cx from 'classnames'
import { MutableRefObject, useRef, useState } from 'react'
import { useEffect, useCallback } from 'react'
import styles from '../styles/customComponents.module.scss'

type AnyObject = { [key: string]: any }

type MediaProps = {
  Type: 'img' | 'video'
  src: string
  mediaProps: AnyObject
  caption?: string
  floatLeft?: boolean
  floatRight?: boolean
  adjustWidth?: number
}

const Media = (props: MediaProps) => {
  const [flex, setFlex] = useState(1)
  const mediaRef = useRef({ offsetWidth: 0, offsetHeight: 0 })
  const mediaTitle = ((split) => split[split.length - 1])(props.src.split('/'))

  const onLoad = () => {
    setFlex(mediaRef.current.offsetWidth / mediaRef.current.offsetHeight)
  }

  return (
    <div
      className={cx(styles.mediaContainer, {
        [styles.floatLeft]: props.floatLeft,
        [styles.floatRight]: props.floatRight,
      })}
      style={{ flex }}
    >
      <figure style={{ width: `${props.adjustWidth}%` ?? '' }}>
        {props.Type === 'img' && (
          <img
            className={styles.zoomIn}
            src={props.src}
            title={mediaTitle}
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
            title={mediaTitle}
            ref={mediaRef as MutableRefObject<HTMLVideoElement>}
            onLoadedMetadata={onLoad}
            controls
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
  const calcColumns = useCallback(
    () =>
      props.columns -
      (window.innerWidth <= 400 && props.columns > 3
        ? 2
        : window.innerWidth <= 1100 && props.columns > 2
        ? 1
        : 0),
    [props.columns]
  )

  const [columns, setColumns] = useState(calcColumns())

  // decrease column size when window width does
  useEffect(() => {
    const handleResize = () => setColumns(calcColumns())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [calcColumns])

  const gridGap = `calc(100vw / ${columns} / ${
    window.innerWidth > 900 ? 25 : 15
  })`

  return (
    <div className={styles.mediaGridContainer}>
      <figure>
        <div className={styles.mediaGridComponents} style={{ gap: gridGap }}>
          {/* thought this in-place function declaration/invocation was
              a fun way to easily split props.media into rows on render */}
          {(() => {
            const rows = []
            for (let i = 0; i < props.media.length / columns; i++) {
              const firstIdx = i * columns
              const currRow = props.media.slice(firstIdx, firstIdx + columns)
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

type List = Array<string>

type BulletedListProps = {
  items: Array<string | List>
}

// recursion, yay!
const BulletedList = (props: BulletedListProps) => (
  <div className={styles.bulletedListContainer}>
    <ul>
      {props.items.map((e, i) =>
        typeof e === 'string' ? (
          <li key={i}>{e}</li>
        ) : (
          BulletedList({ items: e })
        )
      )}
    </ul>
  </div>
)

export { Media, MediaGrid, StatGrid, BulletedList }
