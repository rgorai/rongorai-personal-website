import { getFile, Tag, Component } from '../../../misc/utils.js'

export default [
  Tag('h1', 'Bowling'),

  Tag(
    'p',
    `I started competitive bowling at the age of 15 and made it to the Montville varsity team that winter. I was blessed to be on a team of really competitive bowlers with a team captain, who was one of the top 5 varsity bowlers in the state of NJ.`
  ),

  Tag(
    'p',
    `Our team did really well in the 2016 and 2017 seasons with a 98-0 undefeated streak in our conference. We won the Morris County Tournament in those years, as well as the sectionals in 2017. Additionally, in 2017, our superlative performance was rewarded by a special recognition from the Montville Board of Education.`
  ),

  Tag(
    'p',
    `In fall 2019, I joined the Stevens Bowling team. However, the team's activities halted for the season in spring 2020 due to the COVID pandemic.`
  ),

  Tag('a', 'Montville Bowling Twitter Page', {
    href: 'https://twitter.com/stangsbowling?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
    target: '_blank',
    rel: 'noreferrer',
  }),

  Component('MediaGrid', {
    columns: 2,
    media: [
      {
        Type: 'img',
        src: getFile('hobbies/bowling/team-picture.jpg'),
        mediaProps: { alt: 'Team Picture' },
      },
      {
        Type: 'img',
        src: getFile('hobbies/bowling/sectional-championship-team.jpg'),
        mediaProps: { alt: 'Sectional Championship' },
      },
      {
        Type: 'img',
        src: getFile('hobbies/bowling/sectional-championship-cert.jpg'),
        mediaProps: { alt: 'Sectional Championship Certificate' },
      },
      {
        Type: 'img',
        src: getFile('hobbies/bowling/varsity-plaque.jpg'),
        mediaProps: { alt: 'Varsity Plaque' },
      },
      {
        Type: 'img',
        src: getFile('hobbies/bowling/township-proclamation.jpg'),
        mediaProps: { alt: 'Montville TOwnship Proclamation' },
      },
      {
        Type: 'video',
        src: getFile('hobbies/bowling/a-strike.mp4'),
        mediaProps: { controls: true, loop: true },
      },
    ],
  }),
]
