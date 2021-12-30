interface Props {
  data: Array<{ [key: string]: string }>
}

const GuestbookList = (props: Props) => {
  return (
    <div className="guestbook-list-container">
      {props.data.length === 0 ? (
        <div>There's nothing here yet</div>
      ) : (
        props.data.map((e, i) => (
          <div key={i}>
            <div>{e.name}</div>
            <div>{e.description}</div>
            <div>{e.message}</div>
          </div>
        ))
      )}
    </div>
  )
}

export default GuestbookList
