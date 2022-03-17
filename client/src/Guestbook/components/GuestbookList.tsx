import styles from '../styles/guestbookList.module.scss'

type Props = {
  data: Array<{ [key: string]: string }>
}

const GuestbookList = (props: Props) => {
  return (
    <div className={styles.guestbookListContainer}>
      <h2>Entries</h2>
      {props.data.length === 0 ? (
        <div>{`There's nothing here yet.`}</div>
      ) : (
        props.data.map((e, i) => (
          <div key={i}>
            <div>{e.name}</div>
            <div>{e.background}</div>
            <div>{e.message}</div>
            <div>{e.date}</div>
          </div>
        ))
      )}
    </div>
  )
}

export default GuestbookList
