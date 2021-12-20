import { useState } from 'react'
import { isValidString } from '../../services/errors'
import FormError from '../misc/FormError'
import axios from 'axios'

const GuestbookForm = (props) => {
  const [formError, setFormError] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    setFormError(null)

    // error check
    try {
      isValidString({ name })
    } catch (e) {
      return setFormError(String(e))
    }

    // post data to server
    axios
      .post('/api/guestbook', {
        name: name.trim(),
        description: description.trim(),
        message: message.trim(),
      })
      .then((_) => window.location.reload())
      .catch((err) => console.error(err.response.data))
  }

  return (
    <form id="guestbook-form" onSubmit={onSubmit}>
      <label className="form-label" htmlFor="name-input">
        Name
      </label>
      <input
        id="name-input"
        className="form-input"
        placeholder="Your name"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="form-label" htmlFor="name-input">
        Description
      </label>
      <input
        id="description-input"
        className="form-input"
        placeholder="A little bit about yourself"
        type="text"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label className="form-label" htmlFor="name-input">
        Message
      </label>
      <input
        id="message-input"
        className="form-input"
        placeholder="Anything you'd like to say"
        type="text"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="form-submit"
        type="submit"
        form="guestbook-form"
      >
        Submit
      </button>

      {formError && <FormError message={formError} />}
    </form>
  )
}

export default GuestbookForm
