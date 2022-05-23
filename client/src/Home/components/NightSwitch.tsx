import { useEffect, useState } from 'react'
import styles from '../styles/nightSwitch.module.scss'

const NightSwitch = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <label
      className={styles.track}
      title={`Turn ${theme === 'night' ? 'on' : 'off'} night mode`}
    >
      <input
        type="checkbox"
        checked={theme === 'night'}
        onChange={(ev) => setTheme(ev.target.checked ? 'night' : 'light')}
      />
      <span className={styles.slider} />
    </label>
  )
}

export default NightSwitch
