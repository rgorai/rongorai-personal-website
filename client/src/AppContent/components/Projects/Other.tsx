import styles from '../../styles/appContent.module.scss'
import { getFile } from '../../../services/utils'
import Media from '../../../Misc/components/Media'

const Other = () => (
  <div className={styles.contentContainer}>
    <h1>Other Work Experience</h1>

    <h2 id="stevens">Stevens Institute of Technology</h2>

    <h3>Fall 2021</h3>
    <p>
      During this semester, I worked as a Course Assistant for the
      Introduction to Computer Science class at Stevens. I tutored
      students in course topics such as recursion, memoization, and
      dynamic programming. Additionally, I conducted labs to train
      students on topics covered in lecture with Python.
    </p>
    <a
      href="https://web.stevens.edu/academic_files/courses/syllabus/CS115syl.pdf"
      rel="noreferrer"
      target="_blank"
    >
      CS 115 Course Syllabus
    </a>

    <h3>Spring 2021</h3>
    <p>
      During this semester, I worked as a Course Assistant for the
      Systems Programming class at Stevens. I tutored students in
      course topics such as system calls, concurrent programming, and
      sockets, while also helping them in understanding Bash and C.
      Additionally, I assessed students with exams written by the
      professor and self-designed lab assignments.
    </p>
    <a
      href="https://web.stevens.edu/academic_files/courses/syllabus/CS392syl.pdf"
      rel="noreferrer"
      target="_blank"
    >
      CS 392 Course Syllabus
    </a>

    <Media
      type="img"
      src={getFile('projects/other/stevens-logo.png')}
      mediaProps={{ alt: 'Stevens Logo' }}
    />

    <h2 id="intl-ivy">International Ivy</h2>

    <p>
      Following my high school graduation, I worked as an instructor
      at International Ivy’s educational summer camp. There, I taught
      a basic cryptography course to elementary and middle school
      students. The course, taught using Python, introduced students
      to fundamental ciphers such as the Caesar, Affine, and Vigenère
      Ciphers. I further contributed by customizing lesson plans to
      help students learn more effectively.
    </p>

    <a
      href="http://www.iisummer.com/"
      rel="noreferrer"
      target="_blank"
    >
      International Ivy’s Website
    </a>

    <Media
      type="img"
      src={getFile('projects/other/international-ivy-logo.jpg')}
      mediaProps={{ alt: 'International Ivy Logo' }}
    />

    <h2 id="mathnasium">Mathnasium</h2>

    <p>
      During my senior year of high school, I worked at my local
      Mathnasium franchise, a company that helps students in grades
      K-12 understand and learn math. I teach everything from basic
      arithmetic to introductory calculus.
    </p>

    <a
      href="https://www.mathnasium.com/neparsippany"
      rel="noreferrer"
      target="_blank"
    >
      Mathnasium of Northeast Parsippany’s Website
    </a>

    <Media
      type="img"
      src={getFile('projects/other/mathnasium-indoor.jpg')}
      mediaProps={{ alt: 'Mathnasium Parsippany Interior' }}
    />

    <h2 id="bsa">Boy Scouts of America</h2>

    <p>
      My first job, at the age of 14, was a volunteer camp counselor
      for the Boy Scouts’ Summer STEM Institute (SSI). The following
      year, I worked for SSI as a paid counselor. My role was to help
      boys and girls in grades 1 through 6 learn about the different
      aspects of the STEM subjects.
    </p>

    <a
      href="https://www.facebook.com/SummerSTEMInstitute/"
      rel="noreferrer"
      target="_blank"
    >
      SSI Facebook Page
    </a>

    <Media
      type="img"
      caption="Helping students build a kit kart"
      src={getFile('projects/other/bsa-kart-activity.jpg')}
      mediaProps={{ alt: 'BSA Kart Activity' }}
    />
  </div>
)

export default Other
