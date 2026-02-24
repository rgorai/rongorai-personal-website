import React, { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import styles from '../styles/resumePage.module.scss'
import Loading from '../../Misc/components/Loading'
import ApiError from '../../Misc/components/ApiError'
import { UpdatedOn } from '../../Content/components/customContentComponents'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

const ResumePage = ({ test }: { test?: true }) => {
  const [numPages, setNumPages] = useState(0)
  const [documentError, setDocumentError] = useState(null as any)
  const [pageWidth, setPageWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const FILE_SRC = `/Ron_Gorai_Resume${test ? '_TEST' : ''}.pdf`

  useEffect(() => {
    document.title = `Resume | Ron Gorai's Personal Website`
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver(([entry]) =>
      setPageWidth(Math.min(entry.contentRect.width, 880))
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.resumeContainer} ref={containerRef}>
      {numPages === 0 && !documentError && <Loading />}
      {documentError && <ApiError {...documentError} />}

      <Document
        file={FILE_SRC}
        onLoadSuccess={({ numPages }: { numPages: number }) =>
          setNumPages(numPages)
        }
        onLoadError={(err: any) =>
          setDocumentError({
            status: 500,
            statusText: 'Internal Server Error',
            data: err,
          })
        }
        loading={null}
        error={null}
      >
        {Array.from(Array(numPages)).map((_, i) => (
          <React.Fragment key={i}>
            <Page
              pageNumber={i + 1}
              key={i}
              loading={null}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={pageWidth || undefined}
            />
            {i !== numPages - 1 && <hr />}
          </React.Fragment>
        ))}
      </Document>

      {numPages !== 0 && (
        <>
          <button
            className={styles.resumeLink}
            onClick={() => window.open(FILE_SRC)}
          >
            Download
          </button>

          <UpdatedOn date="February 15, 2026" />
        </>
      )}
    </div>
  )
}

export default ResumePage
