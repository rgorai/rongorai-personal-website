import { useEffect } from 'react'
import styles from '../styles/darkSwitch.module.scss'
import { useStore } from '../../services/store'

const DarkSwitch = () => {
  const { store, setStore } = useStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', store.theme)
    localStorage.setItem('theme', store.theme)
  }, [store])

  return (
    <label
      className={styles.track}
      title={`Turn ${store.theme === 'light' ? 'on' : 'off'} dark mode`}
    >
      <input
        type="checkbox"
        checked={store.theme === 'dark'}
        onChange={(ev) =>
          setStore((prev: typeof store) => ({
            ...prev,
            theme: ev.target.checked ? 'dark' : 'light',
          }))
        }
      />
      <span className={styles.slider} />
    </label>
  )
}

export default DarkSwitch
