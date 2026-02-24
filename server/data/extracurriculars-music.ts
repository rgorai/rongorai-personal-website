import { Tag, openLinkInNewTab, Component } from '../misc/utils.js'
import { HtmlTag, ComponentName, MediaType } from '../types/enums.js'
import type { PageData } from '../types/content.js'

const data: PageData = [
  Tag(HtmlTag.H1, 'Music'),

  Component(ComponentName.UpdatedOn, { date: 'May 23, 2022' }),

  Tag(
    HtmlTag.P,
    `I first took an interest in music when my dad gave me his iPod with all his old music on it in 2009. The first song I played was The Trooper by Iron Maiden, and I instantly fell in love with the sound. That night, I listened to hundreds of songs by them and bands like Megadeth, AC/DC, and Guns N' Roses. A passion for crazy solos and intricate rhythms instantly grew within me.`
  ),
  Tag(
    HtmlTag.P,
    `Soon after, I started taking guitar lessons at the Music Shop in Boonton, NJ. After just a couple of years, I felt the need for a more enriching experience, so I moved to the School of Rock in Montclair, NJ. Soon, I started gaining the confidence to play on stage and joined their performance program. Every year since then, I have played songs with other student musicians by artists ranging from Jimi Hendrix to Ozzy Osbourne at local venues.`
  ),
  Tag(
    HtmlTag.P,
    `Towards the end of 2015, I joined the SoR Montclair's Houseband, which is equivalent to a "varsity team for music". Compared to the normal performance programs I'd been doing, being a part of Houseband was a completely different experience; it gave me the opportunity to perform at large venues like the Javits Center in NYC for Progressive's International Motorcycle Show.`
  ),
  Tag(
    HtmlTag.P,
    `The highlight of my Houseband career has been performing at Summerfest in Milwaukee, WI. Summerfest a music festival where people from all around the world come to see both distinguished and emerging artists. Over the course of about 11 days, nearly 900,000 people attend each year. Housebands from other Schools of Rock around the world also come to play at this exclusive event. Even though it was overall quite overwhelming, my band and I hit our notes spot-on as we rocked the Harley Davidson Arena with tracks by artists like Soundgarden and Prince, captivating an audience that had really come to watch celebrities like Paul McCartney and Sting.`
  ),
  Tag(
    HtmlTag.P,
    `In May 2018, I found out that I was featured on the cover of the NJ Kids Magazine in promotion of School of Rock, Montclair. This picture was taken at the Harley Davidson Arena at Summerfest.`
  ),
  Tag(HtmlTag.A, 'SoR Montclair Facebook Page', {
    href: 'https://www.facebook.com/pg/SchoolofRockMontclair/photos/?ref=page_internal',
    ...openLinkInNewTab,
  }),

  Tag(HtmlTag.H2, 'Summerfest'),
  Component(ComponentName.MediaGrid, {
    columns: 2,
    caption: `Milwaukee, WI - 2016`,
    media: [
      {
        Type: MediaType.Img,
        caption: 'May 2018 NJ Kids Magazine Cover',
        src: '/extracurriculars/music/summerfest/njkids-cover-feature.jpg',
        mediaProps: { alt: 'May 2018 NJ Kids Magazine Cover' },
      },
      {
        Type: MediaType.Img,
        caption: 'Summerfest 2016 Official Lineup',
        src: '/extracurriculars/music/summerfest/summerfest-2016-lineup.jpg',
        mediaProps: { alt: 'Summerfest 2016 Official Lineup' },
      },
      {
        Type: MediaType.Video,
        src: '/extracurriculars/music/summerfest/summerfest-prince.mp4',
        caption: `A portion of the song "Let's Go Crazy" by Prince`,
        mediaProps: { loop: true },
      },
    ],
  }),

  Tag(HtmlTag.H2, `Progressive International Motorcycle Show`),
  Component(ComponentName.MediaGrid, {
    columns: 3,
    caption: `Javit's Center, Manhattan, NYC - 2016`,
    media: [
      {
        Type: MediaType.Img,
        src: '/extracurriculars/music/javits-center/stage-shot3.jpg',
        mediaProps: { alt: 'Stage Shot 1' },
      },
      {
        Type: MediaType.Img,
        src: '/extracurriculars/music/javits-center/stage-shot2.jpg',
        mediaProps: { alt: 'Stage Shot 2' },
      },
      {
        Type: MediaType.Img,
        src: '/extracurriculars/music/javits-center/stage-shot1.jpg',
        mediaProps: { alt: 'Stage Shot 3' },
      },
    ],
  }),

  Tag(HtmlTag.H2, 'Performances Scrapbook'),
  Component(ComponentName.MediaGrid, {
    columns: 3,
    media: [
      {
        Type: MediaType.Img,
        caption: 'Jimi Hendrix - 2013',
        src: '/extracurriculars/music/scrapbook/hendrix.jpg',
        mediaProps: { alt: 'Jimi Hendrix Scrapbook Page' },
      },
      {
        Type: MediaType.Img,
        caption: 'Sound City - 2014',
        src: '/extracurriculars/music/scrapbook/sound-city.jpg',
        mediaProps: { alt: 'Sound City Scrapbook Page' },
      },
      {
        Type: MediaType.Img,
        caption: 'Sub-Pop - 2014',
        src: '/extracurriculars/music/scrapbook/sub-pop.jpg',
        mediaProps: { alt: 'Sub-Pop Scrapbook Page' },
      },
      {
        Type: MediaType.Img,
        caption: 'Bring Your Own Song - 2015',
        src: '/extracurriculars/music/scrapbook/byos.jpg',
        mediaProps: { alt: 'Bring Your Own Song Scrapbook Page' },
      },
      {
        Type: MediaType.Img,
        caption: 'Soundgarden - 2016',
        src: '/extracurriculars/music/scrapbook/soundgarden.jpg',
        mediaProps: { alt: 'Soundgarden Scrapbook Page' },
      },
      {
        Type: MediaType.Img,
        caption: 'Butch Vig - 2017',
        src: '/extracurriculars/music/scrapbook/butch-vig.jpg',
        mediaProps: { alt: 'Butch Vig Scrapbook Page' },
      },
    ],
  }),
]

export default data
