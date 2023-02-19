import { Tag, openLinkInNewTab, Component } from '../misc/utils.js'

export default [
  Tag('h1', 'Bowling'),

  Component('UpdatedOn', { date: 'May 12, 2022' }),

  Tag(
    'p',
    `I started bowling competitively at the age of 15 and made it to the Montville varsity team that winter. I felt honored and excited to be on a team of very talented bowlers, including our captain Erik Kattermann who was a top 5 varsity bowler in the state.`
  ),
  Tag(
    'p',
    `Our team did really well in the 2016 and 2017 seasons. We won the Morris County Tournament, the New Jersey 1B Sectional Championships, and achieved a perfect 98-0 undefeated streak in one season during that time. Additionally, in 2017, our superlative performance was rewarded by a special recognition from the Montville Board of Education.`
  ),
  Tag('a', 'Montville Bowling Twitter Page', {
    href: 'https://twitter.com/stangsbowling?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
    ...openLinkInNewTab,
  }),

  Component('MediaGrid', {
    columns: 3,
    media: [
      {
        Type: 'img',
        src: '/extracurriculars/bowling/team-picture.jpg',
        mediaProps: { alt: 'Team Picture' },
      },
      {
        Type: 'img',
        src: '/extracurriculars/bowling/sectional-championship-cert.jpg',
        mediaProps: { alt: 'Sectional Championship Certificate' },
      },
      {
        Type: 'img',
        src: '/extracurriculars/bowling/township-proclamation.jpg',
        mediaProps: { alt: 'Montville Township Proclamation' },
      },
      {
        Type: 'img',
        src: '/extracurriculars/bowling/varsity-plaque.jpg',
        mediaProps: { alt: 'Varsity Plaque' },
      },
      {
        Type: 'img',
        src: '/extracurriculars/bowling/sectional-championship-team.jpg',
        mediaProps: { alt: 'Sectional Championship' },
      },
      {
        Type: 'video',
        src: '/extracurriculars/bowling/a-strike.mp4',
        mediaProps: { loop: true },
      },
    ],
  }),
]
