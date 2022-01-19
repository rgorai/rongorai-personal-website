import cx from 'classnames'
import styles from '../styles/media.module.scss'

type MediaProps = {
  src: string
  className?: string
  caption?: string
  alignLeft?: boolean
}

type ImageProps = {
  type: 'img'
  mediaProps: { alt: string }
} & MediaProps

type VideoProps = {
  type: 'video'
  mediaProps?: {
    autoplay?: boolean
    controls?: boolean
    loop?: boolean
  }
} & MediaProps

const Media = (props: ImageProps | VideoProps) => {
  const MediaType = props.type

  return (
    <figure
      className={cx(styles.imageContainer, {
        [styles.alignLeft]: props.alignLeft,
      })}
    >
      <MediaType
        className={
          props.className
            ? cx(...props.className.split(' ').map((e) => styles[e]))
            : ''
        }
        src={props.src}
        {...props.mediaProps}
      />
      {props.caption && <figcaption>{props.caption}</figcaption>}
    </figure>
  )
}

export default Media
