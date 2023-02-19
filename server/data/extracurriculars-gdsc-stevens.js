import { Tag, openLinkInNewTab, Component } from '../misc/utils.js'

export default [
  Tag('h1', 'GDSC Stevens'),

  Component('UpdatedOn', { date: 'February 18, 2023' }),

  Tag(
    'p',
    `During the summer of 2022, I had the honor of being selected by Google as the Google Developer Student Clubs Lead for the Stevens Institute of Technology chapter. As a GDSC Lead, I and a self-appointed team of core members host a variety of events to help members of our club learn Google technologies, compete in various competitions, and just hang out.`
  ),
  Tag('a', `Official chapter homepage`, {
    href: 'https://gdsc.community.dev/stevens-institute-of-technology/',
    ...openLinkInNewTab,
  }),
  Component('MediaGrid', {
    columns: 2,
    media: [
      {
        Type: 'img',
        src: '/extracurriculars/gdsc/main/logo.png',
        mediaProps: { alt: 'GDSC Stevens logo' },
      },
      {
        Type: 'img',
        src: '/extracurriculars/gdsc/main/banner.png',
        mediaProps: { alt: 'GDSC Stevens banner' },
      },
    ],
  }),

  Tag('h2', `Info Session + Firebase for Web Workshop`, {
    style: { marginTop: '3em' },
  }),
  Tag(
    'p',
    `For our first event of the school year, we held an info session to share with students what our club is all about. After that, I conducted a codelab where we created a simple chat application using Firebase Authentication, Hosting, Cloud Storage, Cloud Messaging, and Firestore.`
  ),
  Component('MediaGrid', {
    columns: 2,
    caption: 'December 2, 2022',
    media: [
      {
        Type: 'img',
        src: '/extracurriculars/gdsc/info-session/poster.png',
        mediaProps: { alt: 'Info Session Poster' },
      },
      {
        Type: 'img',
        src: '/extracurriculars/gdsc/info-session/presenting-codelab.jpg',
        mediaProps: { alt: 'Me conducting the codelab' },
      },
      {
        Type: 'img',
        src: '/extracurriculars/gdsc/info-session/audience.jpg',
        mediaProps: { alt: 'Our audience' },
      },
    ],
  }),

  Tag('h2', `Solution Challenge Info Session + Flutter Workshop`),
  Tag(
    'p',
    `For this event, we introduced Google's Solution Challenge, an annual competition for GDSC members across the globe to design a special application for a cash prize, to the members of our chapter. The prompt for 2023 is a continuation of 2022's, which is to build a solution that solves one or more of the United Nations' 17 Sustainable Development Goals on any scale. To more effectively communicate what Solution Challenge is all about, I invited North America GDSC Program Manager Daniel Fiorillo to join us and speak about it with our members. `
  ),
  Tag(
    'p',
    `After a fantastic and informative session with Danny, I conducted our second codelab of the year, which was building an adaptive application with Flutter. I chose this workshop specifically because I wanted to give our members a good potential base for their Solution Challenge application; Flutter is a framework that allows developers to create applications suited for any platform or operating system, which I thought would pair perfectly with the reach that a Solution Challenge project aims to achieve.`
  ),
  Component('MediaGrid', {
    columns: 2,
    caption: 'February 1, 2023',
    media: [
      {
        Type: 'img',
        src: '/extracurriculars/gdsc/solution-challenge/poster.png',
        mediaProps: { alt: 'Solution challenge event poster' },
      },
      {
        Type: 'img',
        src: '/extracurriculars/gdsc/solution-challenge/group-picture.jpeg',
        mediaProps: { alt: 'A group photo' },
      },
    ],
  }),

  Tag('h2', `Stevens CS Carnivale`),
  Tag(
    'p',
    `The Stevens Computer Science Carnivale was a first-of-a-kind open house event at our school where groups ranging from student organizations to research labs came together to share what the CS Department has to offer at Stevens. It was a cool experience with free food, giveaways, and even a scavenger hunt. In order to help GDSC gain more publicity at Stevens, I partnered with Domains for Devs, a Google program that helps developers publicize their work with deals on Google Domains. Students who came to our booth and performed well on our Google trivia quiz won a free domain name for a year! I felt that this would help our members create a more special Solution Challenge application, or even just help refine their coding skills by allowing them to host their own project.`
  ),
  Tag('a', `Domains for Devs homepage`, {
    href: 'https://get.dev/domainsfordevs/',
    ...openLinkInNewTab,
  }),
  Component('MediaGrid', {
    columns: 2,
    caption: 'February 15, 2023',
    media: [
      {
        Type: 'img',
        src: '/extracurriculars/gdsc/cs-carnivale/poster.jpeg',
        mediaProps: { alt: '' },
        adjustWidth: 60,
      },
    ],
  }),

  Tag('h2', `Keras Workshop Series`),
  Tag(
    'p',
    `Our latest event, a 2-part series, is being hosted in collaboration with the Hoboken chapter of Google Developer Groups. Hosting workshops for both sessions, Google ML Engineer Shilpa Kancharla will be speaking about KerasNLP and KerasCV, which are natural language processing and computer vision APIs developed by Google.`
  ),
  Tag('a', `GDG Hoboken homepage`, {
    href: 'https://gdg.community.dev/gdg-hoboken/',
    ...openLinkInNewTab,
  }),
  Component('MediaGrid', {
    columns: 2,
    caption: 'February 16, 2023',
    media: [
      {
        Type: 'img',
        src: '/extracurriculars/gdsc/keras/nlp-poster.jpeg',
        mediaProps: { alt: 'NLP Workshop audience' },
      },
      {
        Type: 'img',
        src: '/extracurriculars/gdsc/keras/nlp-audience.jpeg',
        mediaProps: { alt: 'NLP Workshop audience' },
      },
    ],
  }),
]
