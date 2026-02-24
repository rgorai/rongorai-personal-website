import { Tag, openLinkInNewTab, Component } from '../misc/utils.js'
import { HtmlTag, ComponentName, MediaType } from '../types/enums.js'
import type { PageData } from '../types/content.js'

const data: PageData = [
  Tag(HtmlTag.H1, 'Snowboarding'),

  Component(ComponentName.UpdatedOn, { date: 'May 12, 2022' }),

  Tag(
    HtmlTag.P,
    `I began snowboarding at the age of 10. My dad had started skiing the previous season and once he was more comfortable the following year, he wanted me to join him on the slopes. But, I didn't want to ski - I wanted to snowboard; I simply felt that it was more exciting.`
  ),
  Tag(
    HtmlTag.P,
    `Since that year, I have been to numerous mountains in the Eastern US, from Mountain Creek in New Jersey to Jay Peak in Vermont.`
  ),
  Tag(
    HtmlTag.P,
    `In the Spring 2022 semester, I competed in the USCSA as a part of the Ski and Snowboard Team at Stevens.`
  ),
  Tag(HtmlTag.A, 'Stevens Ski and Snowboard Team Homepage', {
    href: 'https://stevensrec.com/sports/skisboard',
    ...openLinkInNewTab,
  }),

  Tag(HtmlTag.H2, 'Jay Peak'),
  Component(ComponentName.MediaGrid, {
    columns: 2,
    caption: 'My friend Danny and I crushing the glades',
    media: [
      {
        Type: MediaType.Img,
        src: '/extracurriculars/snowboarding/jay-peak/danny-glading.jpg',
        mediaProps: { alt: 'Danny glading' },
      },
      {
        Type: MediaType.Video,
        src: '/extracurriculars/snowboarding/jay-peak/jay-peak-glading.mp4',
        mediaProps: { loop: true },
      },
    ],
  }),

  Tag(HtmlTag.H2, 'Camelback'),
  Component(ComponentName.MediaGrid, {
    columns: 2,
    caption: 'Sending some jumps and simple tricks',
    media: [
      {
        Type: MediaType.Video,
        src: '/extracurriculars/snowboarding/camelback/smooth-jump.mp4',
        mediaProps: { loop: true },
      },
      {
        Type: MediaType.Video,
        src: '/extracurriculars/snowboarding/camelback/toe-grab.mp4',
        mediaProps: { loop: true },
      },
      {
        Type: MediaType.Img,
        src: '/extracurriculars/snowboarding/camelback/heel-grab.jpg',
        mediaProps: { alt: 'Heel Grab' },
      },
    ],
  }),

  Tag(HtmlTag.H2, 'Killington'),
  Component(ComponentName.MediaGrid, {
    columns: 2,
    media: [
      {
        Type: MediaType.Img,
        src: '/extracurriculars/snowboarding/killington/mountain-shot4.jpg',
        mediaProps: { alt: 'Killington Shot 4' },
      },
      {
        Type: MediaType.Img,
        src: '/extracurriculars/snowboarding/killington/mountain-shot2.jpg',
        mediaProps: { alt: 'Killington Shot 2' },
      },
      {
        Type: MediaType.Img,
        src: '/extracurriculars/snowboarding/killington/mountain-shot1.jpg',
        mediaProps: { alt: 'Killington Shot 1' },
      },
      {
        Type: MediaType.Img,
        src: '/extracurriculars/snowboarding/killington/mountain-shot3.jpg',
        mediaProps: { alt: 'Killington Shot 3' },
      },
    ],
  }),
]

export default data
