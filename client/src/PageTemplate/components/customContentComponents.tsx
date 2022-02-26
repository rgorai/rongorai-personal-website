import cx from 'classnames'
import { useEffect, useRef, useState } from 'react'
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
  return (
    <div
      className={cx(styles.mediaContainer, {
        [styles.reduceWidth]: props.reduceWidth,
      })}
    >
      <figure
        className={cx({
          [styles.floatLeft]: props.floatLeft,
          [styles.floatRight]: props.floatRight,
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

  for (let i = 0; i < props.media.length / props.columns; i++) {
    const firstIdx = i * props.columns
    // for (let j = firstIdx; j < firstIdx + props.columns; j++) {
    //   continue
    // }
    const row = props.media.slice(firstIdx, firstIdx + props.columns)

    // console.log('row', i, row)
  }

  // props.media[3].mediaProps.style = {width: '400px'}

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
