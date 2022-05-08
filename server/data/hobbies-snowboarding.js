import { getFile, Tag, openLinkInNewTab, Component } from '../misc/utils.js'

export default [
  Tag('h1', 'Snowboarding'),

  Tag(
    'p',
    `I began snowboarding at the age of 10. My dad had started skiing the previous season and once he was more comfortable the following year, he wanted me to join him on the slopes. But, I didn't want to ski - I wanted to snowboard; I simply felt that it was more exciting.`
  ),
  Tag(
    'p',
    `Since that year, I have been to numerous mountains in the Eastern US, from Mountain Creek in New Jersey to Jay Peak in Vermont.`
  ),
  Tag(
    'p',
    `In the Spring 2022 semester, I competed in the USCSA as a part of the Ski and Snowboard Team at Stevens.`
  ),
  Tag('a', 'Stevens Ski and Snowboard Team Homepage', {
    href: 'https://stevensrec.com/sports/skisboard',
    ...openLinkInNewTab,
  }),

  Tag('h2', 'Jay Peak'),
  Component('MediaGrid', {
    columns: 2,
    caption: 'My friend Danny and I crushing the glades',
    media: [
      {
        Type: 'img',
        src: getFile('hobbies/snowboarding/jay-peak/danny-glading.jpg'),
        mediaProps: { alt: 'Danny glading' },
      },
      {
        Type: 'video',
        src: getFile('hobbies/snowboarding/jay-peak/jay-peak-glading.mp4'),
        mediaProps: { loop: true },
      },
    ],
  }),

  Tag('h2', 'Camelback'),
  Component('MediaGrid', {
    columns: 2,
    caption: 'Sending some jumps and simple tricks',
    media: [
      {
        Type: 'video',
        src: getFile('hobbies/snowboarding/camelback/smooth-jump.mp4'),
        mediaProps: { loop: true },
      },
      {
        Type: 'video',
        src: getFile('hobbies/snowboarding/camelback/toe-grab.mp4'),
        mediaProps: { loop: true },
      },
      {
        Type: 'img',
        src: getFile('hobbies/snowboarding/camelback/heel-grab.jpg'),
        mediaProps: { alt: 'Heel Grab' },
      },
    ],
  }),

  Tag('h2', 'Killington'),
  Component('MediaGrid', {
    columns: 2,
    media: [
      {
        Type: 'img',
        src: getFile('hobbies/snowboarding/killington/mountain-shot4.jpg'),
        mediaProps: { alt: 'Killington Shot 4' },
      },
      {
        Type: 'img',
        src: getFile('hobbies/snowboarding/killington/mountain-shot2.jpg'),
        mediaProps: { alt: 'Killington Shot 2' },
      },
      {
        Type: 'img',
        src: getFile('hobbies/snowboarding/killington/mountain-shot1.jpg'),
        mediaProps: { alt: 'Killington Shot 1' },
      },
      {
        Type: 'img',
        src: getFile('hobbies/snowboarding/killington/mountain-shot3.jpg'),
        mediaProps: { alt: 'Killington Shot 3' },
      },
    ],
  }),
]
