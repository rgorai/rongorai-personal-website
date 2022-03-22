import styles from '../styles/guestbookList.module.scss'

type Props = {
  data: Array<{ [key: string]: string }>
}

const GuestbookList = (props: Props) => {
  return (
    <div className={styles.guestbookListContainer}>
      <h1>Entries</h1>
      {props.data.length === 0 ? (
        <div className={styles.emptyMessage}>{`There's nothing here yet.`}</div>
      ) : (
        <div className={styles.entryListContainer}>
          {props.data.map((e, i) => (
            <div className={styles.entryContainer} key={i}>
              <div className={styles.name}>{e.name}</div>
              <div className={styles.date}>{e.date}</div>

              <div className={styles.background}>{e.background}</div>
              {e.message && <div className={styles.message}>{e.message}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GuestbookList
