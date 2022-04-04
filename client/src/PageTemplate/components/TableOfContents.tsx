import cx from 'classnames'
import styles from '../styles/tableOfContents.module.scss'
import type { Tag } from './ContentGenerator'

type Props = {
  data: Array<Tag>
}

const TableOfContents = (props: Props) => {
  return (
    <div
      className={cx(styles.tableWrapper, {
        [styles.hidden]: props.data.length === 0,
      })}
    >
      <div className={styles.tableContainer}>
        <ul>
          {props.data.map((e, i) => (
            <li key={i}>
              <a className={styles.TOCLink} href={`#${e.props?.id}`}>
                {e.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TableOfContents
