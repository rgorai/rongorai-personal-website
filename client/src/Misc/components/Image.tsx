import cx from 'classnames'
import styles from '../styles/image.module.scss'

interface Props {
  src: string
  alt: string
  caption?: string
  className?: string
}

const Image = (props: Props) => {
  return (
    <figure className={styles.imageContainer}>
      <img
        alt={props.alt}
        className={
          props.className
            ? cx(...props.className.split(' ').map((e) => styles[e]))
            : ''
        }
        src={props.src}
      />
      {props.caption && <figcaption>{props.caption}</figcaption>}
    </figure>
  )
}

export default Image
