import styles from '../styles/guestbookList.module.scss'

type Props = {
  data: Array<{ [key: string]: string }>
}

const GuestbookList = (props: Props) => {
  return (
    <div className={styles.guestbookListContainer}>
      {props.data.length === 0 ? (
        <div>{`There's nothing here yet.`}</div>
      ) : (
        <div className={styles.entryListContainer}>
          {props.data.map((e, i) => (
            <div className={styles.entryContainer} key={i}>
              <div className={styles.nameContainer}>
                <p className={styles.name}>{e.name}</p>
                <p className={styles.date}>
                  {((date: Date): string =>
                    `${
                      date.getMonth() + 1
                    }/${date.getDate()}/${date.getFullYear()}`)(
                    new Date(e.date)
                  )}
                </p>
              </div>

              <div className={styles.infoWrapper}>
                <div className={styles.infoContainer}>
                  <p className={styles.label}>Background</p>
                  <p className={styles.background}>{e.background}</p>
                </div>

                {e.message && (
                  <div className={styles.infoContainer}>
                    <p className={styles.label}>Message</p>
                    <p className={styles.message}>{e.message}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GuestbookList
