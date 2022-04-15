import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
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

      <Document
        file={getFile('Ron_Gorai_Resume.pdf')}
        onLoadSuccess={({ numPages }: { numPages: number }) =>
          setNumPages(numPages)
        }
        loading={null}
      >
        {Array.from(Array(numPages)).map((_, i) => (
          <React.Fragment key={i}>
            <Page pageNumber={i + 1} key={i} />
            {i !== numPages - 1 && <hr />}
          </React.Fragment>
        ))}
      </Document>

      {numPages > 0 && (
        <button
          className={styles.openInBrowser}
          onClick={() => {
            window.open(getFile('Ron_Gorai_Resume.pdf'), '_blank')
          }}
          title="Open in browser PDF viewer"
        >
          <img
            src={`${process.env.PUBLIC_URL}/menu_icons/new-tab-icon.png`}
            alt="Open in browser PDF viewer"
          />
        </button>
      )}
    </div>
  )
}

export default ResumePage
