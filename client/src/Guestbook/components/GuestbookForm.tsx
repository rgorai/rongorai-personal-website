import React, { useRef, useState } from 'react'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'
import cx from 'classnames'
import styles from '../styles/guestbookForm.module.scss'

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

const reduceFormContent = (mutation: (c: any) => [string, any] | undefined) =>
  FORM_CONTENT.reduce((p, c) => {
    const mutVal = mutation(c)
    return {
      ...p,
      ...(mutVal ? { [mutVal[0]]: mutVal[1] } : {}),
    }
  }, {}) as { [key: string]: any }

const DEFAULT_DATA = reduceFormContent((c) => [c.label, ''])

const DEFAULT_ERROR = reduceFormContent((c) => [c.label, false])

type Props = {
  updateData: Function
}

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
      const requiredItems = reduceFormContent((c) =>
        c.required ? [c.label, formData[c.label]] : undefined
      )
      const errorItems = []
      for (const k in requiredItems)
        if (requiredItems[k].trim().length === 0) errorItems.push(k)
      if (errorItems.length > 0) throw { formError: errorItems }
    } catch (e: any) {
      if (e.formError)
        (e.formError as []).map((e) =>
          setFormError((prev) => ({ ...prev, [e]: true }))
        )
      else console.error(e)
      return
    }

    // post data to server
    axios
      .post(
        '/api/guestbook',
        reduceFormContent((c) => [c.label.toLowerCase(), formData[c.label]])
      )
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
