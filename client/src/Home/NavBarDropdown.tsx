import { Link } from 'react-router-dom'
import styles from './navBarDropdown.module.scss'

interface Props {
  origin: string
  menuItems: Array<string>
}

const NavBarDropdown = (props: Props) => {
  return (
    <div className={styles.navDropdownContainer}>
      <ul>
        {props.menuItems.map((e, i) => (
          <li key={i}>
            <Link
              to={`/${props.origin.toLowerCase()}/${e.toLowerCase()}`}
            >
              {e}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NavBarDropdown
