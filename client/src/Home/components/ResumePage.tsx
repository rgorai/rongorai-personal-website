import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import styles from '../styles/resumePage.module.scss'
import Loading from '../../Misc/components/Loading'
import ApiError from '../../Misc/components/ApiError'

const OPEN_IN_BROWSER_MESSAGE = 'Open in browser PDF viewer'

const ResumePage = () => {
  const [numPages, setNumPages] = useState(0)
  const [documentError, setDocumentError] = useState(null as any)

  useEffect(() => {
    document.title = `Resume | Ron Gorai's Personal Website`
  }, [])

  return (
    <div className={styles.resumeContainer}>
      {numPages === 0 && !documentError && <Loading />}
      {documentError && <ApiError {...documentError} />}

      <a
        className={styles.resumeLink}
        href={`${process.env.PUBLIC_URL}/Ron_Gorai_Resume.pdf`}
        target="_blank"
        rel="noreferrer"
        title={OPEN_IN_BROWSER_MESSAGE}
      >
        <Document
          scale={2}
          file={`${process.env.PUBLIC_URL}/Ron_Gorai_Resume.pdf`}
          onLoadSuccess={({ numPages }: { numPages: number }) =>
            setNumPages(numPages)
          }
          onLoadError={() =>
            setDocumentError({
              status: 500,
              statusText: 'Internal Server Error',
            })
          }
          loading={null}
          error={null}
          renderMode="svg"
        >
          {Array.from(Array(numPages)).map((_, i) => (
            <React.Fragment key={i}>
              <Page pageNumber={i + 1} key={i} loading={null} />
              {i !== numPages - 1 && <hr />}
            </React.Fragment>
          ))}
        </Document>
        {numPages !== 0 && (
          <div className={styles.clickNotice}>{OPEN_IN_BROWSER_MESSAGE}</div>
        )}{' '}
      </a>
    </div>
  )
}

export default ResumePage
