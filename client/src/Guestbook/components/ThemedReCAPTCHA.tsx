import { MutableRefObject, useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useStore } from '../../services/store'

type Props = {
  onChange: Function
  recaptchaRef: MutableRefObject<any>
}

const ThemedReCAPTCHA = (props: Props) => {
  const { store } = useStore()
  const ReCAPTCHAProps = {
    sitekey:
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_CAPTCHA_KEY_PRODUCTION
        : process.env.REACT_APP_CAPTCHA_KEY_DEVELOPMENT,
    onChange: props.onChange,
    ref: props.recaptchaRef,
    theme: store.theme,
  }
  const [Comp, setComp] = useState(<ReCAPTCHA {...ReCAPTCHAProps} />)

  /*
   * for some reason the react-google-recaptcha component
   * doesn't want to update it's theme dynamically even with
   * hooks or state, so I devised this rather hacky solution
   * to reload the ReCAPTCHA component individually from the
   * rest of the page on theme change.
   */
  useEffect(() => {
    setTimeout(() => {
      setComp(<></>)
    }, 0)
    setTimeout(() => {
      setComp(<ReCAPTCHA {...ReCAPTCHAProps} />)
    }, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.theme])

  return Comp
}

export default ThemedReCAPTCHA
