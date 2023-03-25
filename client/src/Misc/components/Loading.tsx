import styles from '../styles/loading.module.scss'

type Props = {
  size?: number
  color?: string
}

const Loading = ({ size, color }: Props) => {
  return (
    <div className={styles.loadContainer}>
      <span
        style={{
          ...(size
            ? {
                width: `${size / 2}rem`,
                height: `${size / 2}rem`,
                borderWidth: `${size}px`,
              }
            : {}),
          ...(color ? { borderColor: color } : {}),
        }}
      />
    </div>
  )
}

export default Loading
