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
              {i > 0 && <hr />}

              <div className={styles.nameContainer}>
                <div className={styles.name}>{e.name}</div>
                <div className={styles.date}>{e.date}</div>
              </div>

              <div className={styles.infoWrapper}>
                <div className={styles.infoContainer}>
                  <div className={styles.label}>Background</div>
                  <div className={styles.background}>{e.background}</div>
                </div>

                {e.message && (
                  <div className={styles.infoContainer}>
                    <div className={styles.label}>Message</div>
                    <div className={styles.message}>{e.message}</div>
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
