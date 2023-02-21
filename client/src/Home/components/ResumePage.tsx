import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import styles from '../styles/resumePage.module.scss'
import Loading from '../../Misc/components/Loading'
import ApiError from '../../Misc/components/ApiError'
import { UpdatedOn } from '../../Content/components/customContentComponents'

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

      <Document
        // scale={3}
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
        <>
          <button
            className={styles.resumeLink}
            onClick={() =>
              window.open(`${process.env.PUBLIC_URL}/Ron_Gorai_Resume.pdf`)
            }
          >
            Download
          </button>

          <UpdatedOn date="February 19, 2023" />
        </>
      )}
    </div>
  )
}

export default ResumePage
