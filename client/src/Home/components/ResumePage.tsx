import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { Link } from 'react-router-dom'
import { getFile } from '../../services/utils'
import styles from '../styles/resumePage.module.scss'
import Loading from '../../Misc/components/Loading'

const ResumePage = () => {
  const [numPages, setNumPages] = useState(0)

  useEffect(() => {
    document.title = `Resume | Ron Gorai's Personal Website`
  }, [])

  return (
    <div className={styles.resumeContainer}>
      {numPages === 0 && <Loading />}

      <Link
        className={styles.resumeLink}
        to={getFile('Ron_Gorai_Resume.pdf')}
        target="_blank"
        rel="noreferrer"
        title="Open in browser PDF viewer"
      >
        <Document
          file={getFile('Ron_Gorai_Resume.pdf')}
          onLoadSuccess={({ numPages }: { numPages: number }) =>
            setNumPages(numPages)
          }
          loading={null}
        >
          {Array.from(Array(numPages)).map((_, i) => (
            <React.Fragment key={i}>
              <Page pageNumber={i + 1} key={i} loading={null} />
              {i !== numPages - 1 && <hr />}
            </React.Fragment>
          ))}
        </Document>
      </Link>
    </div>
  )
}

export default ResumePage
