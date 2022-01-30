import cx from 'classnames'
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
    <div className={cx({ [styles.reduceWidth]: props.reduceWidth })}>
      <figure
        className={cx(styles.mediaContainer, {
          [styles.alignLeft]: props.alignLeft,
          [styles.alignRight]: props.alignRight,
        })}
      >
        <props.Type
          className={
            // props.className
            //   ? cx(...props.className.split(' ').map((e) => styles[e]))
            //   : '',
            cx({ [styles.zoomIn]: props.Type === 'img' })
          }
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

export default Media
