import cx from 'classnames'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/media.module.scss'

type MediaProps = {
  src: string
  className?: string
  caption?: string
  alignLeft?: boolean
  alignRight?: boolean
  reduceWidth?: boolean
}

type ImageProps = {
  Type: 'img'
  mediaProps: { alt: string }
} & MediaProps

type VideoProps = {
  Type: 'video'
  mediaProps?: {
    autoplay?: boolean
    controls?: boolean
    loop?: boolean
  }
} & MediaProps

const Media = (props: ImageProps | VideoProps) => {
  return (
    <div
      className={cx(styles.mediaContainer, {
        [styles.reduceWidth]: props.reduceWidth,
      })}
    >
      <figure
        className={cx({
          [styles.alignLeft]: props.alignLeft,
          [styles.alignRight]: props.alignRight,
        })}
      >
        <props.Type
          className={cx({ [styles.zoomIn]: props.Type === 'img' })}
          src={props.src}
          {...props.mediaProps}
          onClick={
            props.Type === 'img'
              ? () => window.open(props.src)
              : undefined
          }
        />
        {props.caption && <figcaption>{props.caption}</figcaption>}
      </figure>
    </div>
  )
}

type MediaGridProps = {
  columns: number
  media: Array<ImageProps | VideoProps>
}

const MediaGrid = (props: MediaGridProps) => {
  const gridContainerRef = useRef(null as null | HTMLDivElement)
  const [gridGap, setGridGap] = useState(0)

  // const gridTemplate = `${100/props.columns}% `.repeat(props.columns)
  const gridTemplate = `1fr `.repeat(props.columns)

  const calculateGridGap = () => {
    return (
      ((gridContainerRef.current?.offsetWidth ?? 0) * 2) /
      props.columns /
      15
    )
  }

  useEffect(() => {
    setGridGap(calculateGridGap())
    window.addEventListener('resize', () => {
      setGridGap(calculateGridGap())
    })
  }, [])

  return (
    <div
      className={styles.mediaGridContainer}
      ref={gridContainerRef}
      style={{
        gridTemplateColumns: gridTemplate,
        gap: `${gridGap}px`,
      }}
    >
      {props.media.map((e, i) => (
        <Media {...e} key={i} />
      ))}
    </div>
  )
}

export { Media, MediaGrid }
