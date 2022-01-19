import styles from '../../styles/appContent.module.scss'
import { getFile } from '../../../services/utils'
import Media from '../../../Misc/components/Media'

const Personal = () => (
  <div className={styles.contentContainer}>
    <h1>Personal Projects</h1>

    <h2 id="personal-website">Personal Website</h2>

    <p>small summary about my personal website</p>

    <a href="/about/this-website">More about this website</a>

    <h2 id="web-prog-final">Web Programming Final Project</h2>

    <p>description of my project</p>

    <a
      href="https://github.com/rgorai/cs546-final-project"
      target="_blank"
      rel="noreferrer"
    >
      Project repository
    </a>
  </div>
)

export default Personal
