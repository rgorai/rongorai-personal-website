import styles from '../styles/tableOfContents.module.scss'
import type { Tag } from './ContentGenerator'

type Props = {
  data: Array<Tag>
}

const TableOfContents = (props: Props) => {
  return props.data.length > 0 ? (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        {props.data.map((e, i) => (
          <a href={`#${e.props?.id}`} key={i}>
            {e.text}
          </a>
        ))}
      </div>
    </div>
  ) : (
    <></>
  )
}

export default TableOfContents
