import { useState } from 'react'
import axios from 'axios'
import { isValidString } from '../../services/errors'
import FormError from '../../Misc/components/FormError'
import styles from '../styles/guestbookForm.module.scss'

type Props = {}

const GuestbookForm = (props: Props) => {
  const [formError, setFormError] = useState('')
  const [name, setName] = useState('')
  const [background, setDescription] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e: any) => {
    e.preventDefault()
    setFormError('')

    // error check
    try {
      isValidString({ name, background })
    } catch (e) {
      return setFormError(String(e))
    }

    // post data to server
    axios
      .post('/api/guestbook', {
        name: name.trim(),
        background: background.trim(),
        message: message.trim(),
      })
      .then((_) => window.location.reload())
      .catch((err) => {
        setFormError('Something went wrong.')
        console.error(err.response)
      })
  }

  return (
    <>
      <h2>Sign my guestbook</h2>
      <form
        id="guestbook-form"
        className={styles.formContainer}
        onSubmit={onSubmit}
      >
        <label className={styles.formLabel} htmlFor="name-input">
          Name *
        </label>
        <input
          id="name-input"
          className={styles.formInput}
          placeholder="Your name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className={styles.formLabel} htmlFor="background-input">
          Background *
        </label>
        <textarea
          id="background-input"
          className={styles.formInput}
          placeholder="A little bit about yourself"
          name="background"
          value={background}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className={styles.formLabel} htmlFor="message-input">
          Message
        </label>
        <textarea
          id="message-input"
          className={styles.formInput}
          placeholder="Anything you'd like to say"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className={styles.buttonContainer}>
          <button
            className={styles.formSubmit}
            type="submit"
            form="guestbook-form"
          >
            Submit
          </button>
          {formError.length > 0 && <FormError message={formError} />}
        </div>
      </form>
    </>
  )
}

export default GuestbookForm
