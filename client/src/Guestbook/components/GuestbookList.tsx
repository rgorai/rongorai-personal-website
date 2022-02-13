import styles from '../styles/guestbookList.module.scss'

type Props = {
  data: Array<{ [key: string]: string }>
}

const GuestbookList = (props: Props) => {
  return (
    <div className={styles.guestbookListWrapper}>
      <div className={styles.guestbookListContainer}>
        {props.data.length === 0 ? (
          <div>There&apos;s nothing here yet</div>
        ) : (
          props.data.map((e, i) => (
            <div key={i}>
              <div>{e.name}</div>
              <div>{e.description}</div>
              <div>{e.message}</div>
              <div>{e.date}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default GuestbookList
