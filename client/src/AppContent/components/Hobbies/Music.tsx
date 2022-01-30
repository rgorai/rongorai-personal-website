import axios, { Axios, AxiosResponse } from 'axios'
import React, { ReactElement, useEffect, useState } from 'react'
import styles from '../../styles/appContent.module.scss'
import { getFile } from '../../../services/utils'

import { Media, MediaGrid } from '../contentComponents'

const testprops = {
  Type: 'img',
  caption: 'May 2018 NJ Kids Magazine Cover',
  src: getFile('hobbies/music/summerfest/njkids-cover-feature.jpg'),
  mediaProps: { alt: 'May 2018 NJ Kids Magazine Cover' },
  alignLeft: true,
}

const components = { Media, MediaGrid } as { [key: string]: Function }

// console.log('testelement', testElement)

type Tag = {
  tag: string
  text: string
  props: { [key: string]: string }
} & HTMLElement

type Component = {
  component: string
  props: { [key: string]: string }
}

type PageData = Array<Tag | Component>

const isTag = (e: any): e is Tag => e.tag
const isComponent = (e: any): e is Component => e.component

const Music = () => {
  const [pageData, setPageData] = useState(null as null | PageData)
  const [apiError, setApiError] = useState(null as null | AxiosResponse)

  useEffect(() => {
    axios
      .get(`/api/data/${encodeURIComponent('hobbies/music/data.js')}`)
      .then((res) => setPageData(res.data))
      .catch((err) => setApiError(err.response.data))
  }, [])

  useEffect(() => {
    console.log(pageData)
  }, [pageData])

  const getComponent = (e: Component) => {
    const Temp = components[e.component]
    return <Temp {...e.props} />
  }

  return apiError ? (
    <div>{`${apiError.status} ${apiError.statusText}`}</div>
  ) : pageData ? (
    <div className={styles.contentContainer}>
      {pageData.map((e, i) => (
        <React.Fragment key={i}>
          {(isTag(e) && React.createElement(e.tag, e.props, e.text)) ||
            (isComponent(e) && getComponent(e))}
        </React.Fragment>
      ))}
    </div>
  ) : (
    <div>Loading</div>
  )
}

export default Music

// <h1>Music</h1>

// <p>
//   I first took an interest in music when my dad gave me his iPod with all
//   his old music on it. It was 2009. The first song I played was The
//   Trooper by Iron Maiden, and I instantly fell in love with the sound.
//   That night, I listened to hundreds of songs by them and other bands like
//   Megadeth, AC/DC and Guns N’ Roses. A passion for crazy solos and
//   intricate rhythms instantly grew within me.
// </p>

// <p>
//   I started taking guitar lessons at the Music Shop in Boonton, NJ. After
//   just a couple of years, I felt the need for learning more, so I moved to
//   the School of Rock in Montclair, NJ. Soon, I started gaining the
//   confidence to play on stage and I joined their performance program.
//   Every year since then, I have played songs with other student musicians
//   by artists ranging from Jimi Hendrix to Ozzy Osbourne at local venues.
// </p>

// <p>
//   Towards the end of 2015, I joined the SoR Montclair’s Houseband, which
//   is equivalent to a “varsity team for music.” Being a part of the
//   House-band was a completely different experience. It gave me the
//   opportunity to perform at large venues like the Javits Center in NYC for
//   Progressive’s International Motorcycle Show.
// </p>

// <p>
//   The highlight, of course, has been performing at the Summerfest in
//   Milwaukee, a music festival in which people from all around the world
//   come to see celebrity artists as well as emerging artists. Over the
//   course of about 11 days, nearly 900,000 people attend each year. Other
//   Schools of Rock from around the world also come to play at this
//   exclusive event.. Even though it was quite overwhelming, I hit the D’s
//   and the C-minor’s spot-on as we rocked the Harley Davidson Arena with
//   tracks by artists ranging from Soundgarden to Prince, captivating an
//   audience that had really come to watch celebrities like Paul McCartney
//   and Sting.
// </p>

// <p>
//   In May 2018, I was featured on the cover of the NJ Kids Magazine in
//   promotion of School of Rock, Montclair. This picture was taken at the
//   Harley Davidson Arena at Summerfest.
// </p>

// <a
//   href="https://www.facebook.com/pg/SchoolofRockMontclair/photos/?ref=page_internal"
//   rel="noreferrer"
//   target="_blank"
// >
//   SoR Montclair Facebook Page
// </a>

// <h2>Summerfest</h2>

// <MediaGrid
//   columns={2}
//   media={[
//     {
//       Type: 'img',
//       caption: 'May 2018 NJ Kids Magazine Cover',
//       src: getFile('hobbies/music/summerfest/njkids-cover-feature.jpg'),
//       mediaProps: { alt: 'May 2018 NJ Kids Magazine Cover' },
//     },
//     {
//       Type: 'img',
//       caption: 'Summerfest 2016 Lineup',
//       src: getFile('hobbies/music/summerfest/summerfest-2016-lineup.jpg'),
//       mediaProps: { alt: 'Summerfest 2016 Lineup' },
//     },
//   ]}
// />

// <Media
//   Type="video"
//   src={getFile('hobbies/music/summerfest/summerfest-prince.mp4')}
//   caption="A portion of the song “Let’s Go Crazy” by Prince"
//   mediaProps={{ controls: true, loop: true }}
// />

// <h2>Performances Scrapbook</h2>

// <MediaGrid
//   columns={3}
//   media={[
//     {
//       Type: 'img',
//       // caption: 'Jimi Hendrix - 2013',
//       src: getFile('hobbies/music/scrapbook/hendrix.jpg'),
//       mediaProps: { alt: 'Jimi Hendrix Scrapbook Page' },
//     },
//     {
//       Type: 'img',
//       // caption: 'Sound City - 2014',
//       src: getFile('hobbies/music/scrapbook/sound-city.jpg'),
//       mediaProps: { alt: 'Sound City Scrapbook Page' },
//     },
//     {
//       Type: 'img',
//       // caption: 'Sub-Pop - 2014',
//       src: getFile('hobbies/music/scrapbook/sub-pop.jpg'),
//       mediaProps: { alt: 'Sub-Pop Scrapbook Page' },
//     },
//     {
//       Type: 'img',
//       // caption: 'Bring Your Own Song - 2015',
//       src: getFile('hobbies/music/scrapbook/byos.jpg'),
//       mediaProps: { alt: 'Bring Your Own Song Scrapbook Page' },
//     },
//     {
//       Type: 'img',
//       // caption: 'Soundgarden - 2016',
//       src: getFile('hobbies/music/scrapbook/soundgarden.jpg'),
//       mediaProps: { alt: 'Soundgarden Scrapbook Page' },
//     },
//     {
//       Type: 'img',
//       // caption: 'Butch Vig - 2017',
//       src: getFile('hobbies/music/scrapbook/butch-vig.jpg'),
//       mediaProps: { alt: 'Butch Vig Scrapbook Page' },
//     }
//   ]}
// />
