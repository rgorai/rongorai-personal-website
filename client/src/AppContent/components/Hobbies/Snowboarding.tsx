import styles from '../../styles/appContent.module.scss'
import { getFile } from '../../../services/utils'
import Media from '../../../Misc/components/Media'

const Snowboarding = () => (
  <div className={styles.contentContainer}>
    <h1>Other Work Experience</h1>

    <h2></h2>

    <a
      href="https://www.facebook.com/SummerSTEMInstitute/"
      rel="noreferrer"
      target="_blank"
    >
      SSI Facebook Page
    </a>

    {/* <Media type="img"
      alt="BSA Kart Activity"
      caption="Helping students build a kit kart"
      src={getFile('projects/other/bsa-kart-activity.jpg')}
    /> */}
  </div>
)

export default Snowboarding
