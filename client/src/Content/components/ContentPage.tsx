import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from '../styles/contentPage.module.scss'
import { getRoute } from '../../services/utils'
import Loading from '../../Misc/components/Loading'
import ContentSideNav from './ContentSideNav'

interface Props {
  contentTitle: string
  contentSubtitle?: string
  navItems?: Array<string>
}

const ContentPage = (props: Props) => {
  const [pageData, setPageData] = useState(null)

  useEffect(() => {
    axios
      .get(
        `/api/files/${encodeURIComponent(
          getRoute([props.contentTitle, props.contentSubtitle]).slice(
            1
          ) + '/data.json'
        )}`
      )
      .then((res) => setPageData(res.data))
      .catch((err) =>
        console.error('fetch file error', err.response.data)
      )
  }, [props.contentSubtitle, props.contentTitle])

  useEffect(() => {
    console.log('page-data', pageData)
  }, [pageData])

  return (
    <div className={styles.contentWrapper}>
      {props.navItems && (
        <ContentSideNav
          navItems={props.navItems.map((e) => ({
            name: e,
            route: getRoute([props.contentTitle, e]),
          }))}
        />
      )}

      <div className={styles.contentContainer}>
        {pageData ? (
          <>
            <div>{`${props.contentTitle} container`}</div>
            {props.contentSubtitle && (
              <div>{`${props.contentSubtitle} specifically`}</div>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}

export default ContentPage
