import cx from 'classnames'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/customContent.module.scss'

type ImageProps = {
  Type: 'img'
  mediaProps: { alt: string }
}

type VideoProps = {
  Type: 'video'
  mediaProps?: {
    autoplay?: boolean
    controls?: boolean
    loop?: boolean
  }
}

type MediaProps = {
  src: string
  className?: string
  caption?: string
  alignLeft?: boolean
  alignRight?: boolean
  reduceWidth?: boolean
} & (ImageProps | VideoProps)

const Media = (props: MediaProps) => {
  // if (Object.keys(props).some((k) => !props[k as keyof MediaProps]))
  //   console.log('error')

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
          onClick={
            props.Type === 'img' ? () => window.open(props.src) : undefined
          }
          {...props.mediaProps}
        />
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
  const gridContainerRef = useRef(null as null | HTMLDivElement)
  const [gridGap, setGridGap] = useState(0)

  // const gridTemplate = `${100/props.columns}% `.repeat(props.columns)
  const gridTemplate = `1fr `.repeat(props.columns)

  useEffect(() => {
    const calculateGridGap = () =>
      ((gridContainerRef.current?.offsetWidth ?? 0) * 2) / props.columns / 25

    setGridGap(calculateGridGap())
    window.addEventListener('resize', () => {
      setGridGap(calculateGridGap())
    })
  }, [props.columns])

  return (
    <div className={styles.mediaGridContainer} ref={gridContainerRef}>
      <figure>
        <div
          className={styles.mediaGridComponents}
          style={{
            gridTemplateColumns: gridTemplate,
            gap: `${gridGap}px`,
          }}
        >
          {props.media.map((e, i) => (
            <Media {...e} key={i} />
          ))}
        </div>

        {props.caption && <figcaption>{props.caption}</figcaption>}
      </figure>
    </div>
  )
}

export { Media, MediaGrid }
