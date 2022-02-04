import { getFile, Tag, Component } from '../../../misc/utils.js'

export default [
  Tag('h1', 'Snowboarding'),

  Tag(
    'p',
    `I began snowboarding at the age of 10. My dad started skiing the previous season and once he was more comfortable the following year, he invited me to join him on the slopes. But, I didn't want to ski – I wanted to snowboard; I felt that it was simply more exciting and challenging.`
  ),

  Tag(
    'p',
    `Since that year, I have been to numerous mountains in the Eastern US, from Mountain Creek in New Jersey to Killington in Vermont.`
  ),

  Tag(
    'p',
    `Currently, in the spring 2022 semester, I am completing in the USCSA as a part of the Ski and Snowboard Team at Stevens.`
  ),

  Tag('a', 'Stevens Ski and Snowboard Team Homepage', {
    href: 'https://stevensrec.com/sports/skisboard',
    target: '_blank',
    rel: 'noreferrer',
  }),

  Component('Media', {
    Type: 'video',
    caption: 'A Twilight Run at Mountain Creek, NJ ~ 2017',
    src: getFile('hobbies/snowboarding/mountain-creek-run.mp4'),
    mediaProps: {
      controls: true,
      loop: true,
    },
  }),

  Component('MediaGrid', {
    columns: 2,
    caption: 'Shots from Killington, VT',
    media: [
      {
        Type: 'img',
        src: getFile('hobbies/snowboarding/killington/mountain-shot4.jpg'),
        mediaProps: { alt: 'Mountain Shot 4' },
      },
      {
        Type: 'img',
        src: getFile('hobbies/snowboarding/killington/mountain-shot2.jpg'),
        mediaProps: { alt: 'Mountain Shot 2' },
      },
      {
        Type: 'img',
        src: getFile('hobbies/snowboarding/killington/mountain-shot1.jpg'),
        mediaProps: { alt: 'Mountain Shot 1' },
      },
      {
        Type: 'img',
        src: getFile('hobbies/snowboarding/killington/mountain-shot3.jpg'),
        mediaProps: { alt: 'Mountain Shot 3' },
      },
    ],
  }),
]
