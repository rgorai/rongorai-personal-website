import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'
import { isValidString } from '../../services/errors'
import styles from '../styles/guestbookForm.module.scss'

type Props = {
  updateData: Function
}

const GuestbookForm = (props: Props) => {
  const [formError, setFormError] = useState('')
  const [name, setName] = useState('')
  const [background, setBackground] = useState('')
  const [message, setMessage] = useState('')
  const [captchaPassed, setCaptchaPassed] = useState(false)
  const recaptchaRef = useRef(null as null | typeof ReCAPTCHA)
  const siteKey =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_CAPTCHA_KEY_PRODUCTION
      : process.env.REACT_APP_CAPTCHA_KEY_DEVELOPMENT

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
      .then((_) => {
        props.updateData()
        setName('')
        setBackground('')
        setMessage('')
        setCaptchaPassed(false)
        recaptchaRef.current?.reset()
      })
      .catch((err) => {
        setFormError('Something went wrong.')
        console.error(err.response)
      })
  }

  return (
    <>
      <h1>Sign my guestbook</h1>
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
          onChange={(e) => setBackground(e.target.value)}
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

        <div className={styles.captchaContainer}>
          <ReCAPTCHA
            sitekey={siteKey}
            onChange={(tok: any) => setCaptchaPassed(tok !== null)}
            ref={recaptchaRef}
          />
          {formError.length > 0 && (
            <div className={styles.formError}>{formError}</div>
          )}
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.formSubmit}
            type="submit"
            form="guestbook-form"
            disabled={!captchaPassed}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default GuestbookForm
