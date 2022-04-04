import React, { useRef, useState } from 'react'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'
import cx from 'classnames'
import { isValidString } from '../../services/errors'
import styles from '../styles/guestbookForm.module.scss'

type Props = {
  updateData: Function
}

const FORM_CONTENT = [
  {
    label: 'Name',
    placeholder: 'Your name',
    Tag: 'input',
    required: true,
  },
  {
    label: 'Background',
    placeholder: 'A little bit about yourself',
    Tag: 'textarea',
    required: true,
  },
  {
    label: 'Message',
    placeholder: "Anything you'd like to say",
    Tag: 'textarea',
    required: false,
  },
] as Array<{
  label: string
  placeholder: string
  Tag: 'input' | 'textarea'
  required: boolean
}>

const DEFAULT_DATA = FORM_CONTENT.reduce(
  (p, c) => ({ ...p, [c.label]: '' }),
  {}
) as { [key: string]: string }

const DEFAULT_ERROR = FORM_CONTENT.reduce(
  (p, c) => ({ ...p, [c.label]: false }),
  {}
) as { [key: string]: boolean }

const GuestbookForm = (props: Props) => {
  const [formError, setFormError] = useState(DEFAULT_ERROR)
  const [formData, setFormData] = useState(DEFAULT_DATA)
  const [captchaPassed, setCaptchaPassed] = useState(false)
  const recaptchaRef = useRef<typeof ReCAPTCHA>(null)
  const siteKey =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_CAPTCHA_KEY_PRODUCTION
      : process.env.REACT_APP_CAPTCHA_KEY_DEVELOPMENT

  const onSubmit = (e: any) => {
    e.preventDefault()
    setFormError(DEFAULT_ERROR)

    // error check
    try {
      isValidString(
        FORM_CONTENT.reduce(
          (p, c) => ({
            ...p,
            ...(c.required ? { [c.label]: formData[c.label] } : {}),
          }),
          {}
        )
      )
    } catch (e) {
      return setFormError((prev) => ({ ...prev, [String(e)]: true }))
    }

    // post data to server
    axios
      .post('/api/guestbook', {
        name: formData.name.trim(),
        background: formData.background.trim(),
        message: formData.message.trim(),
      })
      .then((_) => {
        props.updateData()
        setFormData(DEFAULT_DATA)
        setCaptchaPassed(false)
        recaptchaRef.current?.reset()
      })
      .catch((err) => {
        console.error(err.response)
      })
  }

  return (
    <form
      id="guestbook-form"
      className={styles.formContainer}
      onSubmit={onSubmit}
    >
      {FORM_CONTENT.map((e, i) => {
        const inputId = `${e.label}-input`
        return (
          <React.Fragment key={i}>
            <label className={styles.formLabel} htmlFor={inputId}>
              {e.label}
              {e.required && <span> *</span>}
            </label>
            <e.Tag
              id={inputId}
              className={cx(styles.formInput, {
                [styles.formError]: formError[e.label],
              })}
              placeholder={e.placeholder}
              name={e.label}
              value={formData[e.label]}
              onChange={(ev) =>
                setFormData((prev) => ({ ...prev, [e.label]: ev.target.value }))
              }
            />
          </React.Fragment>
        )
      })}

      <div className={styles.captchaContainer}>
        <ReCAPTCHA
          sitekey={siteKey}
          onChange={(tok: any) => setCaptchaPassed(tok !== null)}
          ref={recaptchaRef}
        />
      </div>

      <button
        className={styles.formSubmit}
        type="submit"
        form="guestbook-form"
        disabled={!captchaPassed}
      >
        Submit
      </button>
    </form>
  )
}

export default GuestbookForm
