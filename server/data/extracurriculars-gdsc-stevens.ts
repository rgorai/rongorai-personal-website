import { Tag, openLinkInNewTab, Component } from '../misc/utils.js'
import { HtmlTag, ComponentName, MediaType } from '../types/enums.js'
import type { PageData } from '../types/content.js'

const data: PageData = [
  Tag(HtmlTag.H1, 'GDSC Stevens'),

  Component(ComponentName.UpdatedOn, { date: 'May 3, 2023' }),

  Tag(
    HtmlTag.P,
    `During the summer of 2022, I had the honor of being selected by Google as the Google Developer Student Clubs Lead for the Stevens Institute of Technology chapter. As a GDSC Lead, I and a self-appointed team of core members host a variety of events to help members of our club learn Google technologies, compete in various competitions, and just hang out.`
  ),
  Tag(HtmlTag.A, `Official chapter homepage`, {
    href: 'https://gdsc.community.dev/stevens-institute-of-technology/',
    ...openLinkInNewTab,
  }),
  Component(ComponentName.MediaGrid, {
    columns: 2,
    media: [
      {
        Type: MediaType.Img,
        src: '/extracurriculars/gdsc/main/logo.png',
        mediaProps: { alt: 'GDSC Stevens logo' },
      },
      {
        Type: MediaType.Img,
        src: '/extracurriculars/gdsc/main/banner.png',
        mediaProps: { alt: 'GDSC Stevens banner' },
      },
    ],
  }),
  Tag(HtmlTag.Div, null, {
    style: { marginBottom: '4em' },
  }),

  Tag(HtmlTag.H2, 'LeetCode Contest'),
  Tag(
    HtmlTag.P,
    `Our final event of the '22-'23 school year was a LeetCode contest with cash prizes! Our members competed individually as participants of LeetCode's Biweekly Contest (103), with top 3 winners determined amongst the scope of our club. Congratulations to our winners Atharva Kulkarni, Mahesh Dhondge, and Vivek Sharma Ponnekanti!`
  ),
  Component(ComponentName.Media, {
    Type: MediaType.Img,
    src: '/extracurriculars/gdsc/leetcode-contest.jpeg',
    mediaProps: { alt: 'LeetCode Contest' },
  }),

  Tag(HtmlTag.H2, `Keras Workshop Series`),
  Tag(
    HtmlTag.P,
    `This event was a 2-part series, was hosted in collaboration with the Hoboken chapter of Google Developer Groups. For both sessions, Google ML Engineer Shilpa Kancharla spoke about KerasNLP and KerasCV, which are natural language processing and computer vision APIs developed by Google.`
  ),
  Tag(HtmlTag.A, `GDG Hoboken homepage`, {
    href: 'https://gdg.community.dev/gdg-hoboken/',
    ...openLinkInNewTab,
  }),
  Component(ComponentName.MediaGrid, {
    columns: 2,
    caption: 'February 16, 2023',
    media: [
      {
        Type: MediaType.Img,
        src: '/extracurriculars/gdsc/keras/nlp-poster.png',
        mediaProps: { alt: 'NLP Workshop audience' },
      },
      {
        Type: MediaType.Img,
        src: '/extracurriculars/gdsc/keras/nlp-audience.jpeg',
        mediaProps: { alt: 'NLP Workshop audience' },
      },
    ],
  }),

  Tag(HtmlTag.H2, `Stevens CS Carnivale`),
  Tag(
    HtmlTag.P,
    `The Stevens Computer Science Carnivale was a first-of-a-kind open house event at our school where groups ranging from student organizations to research labs came together to share what the CS Department has to offer at Stevens. It was a cool experience with free food, giveaways, and even a scavenger hunt. In order to help GDSC gain more publicity at Stevens, I partnered with Domains for Devs, a Google program that helps developers publicize their work with deals on Google Domains. Students who came to our booth and performed well on our Google trivia quiz won a free domain name for a year! I felt that this would help our members create a more special Solution Challenge application, or even just help refine their coding skills by allowing them to host their own project.`
  ),
  Tag(HtmlTag.A, `Domains for Devs homepage`, {
    href: 'https://get.dev/domainsfordevs/',
    ...openLinkInNewTab,
  }),
  Component(ComponentName.MediaGrid, {
    columns: 2,
    caption: 'February 15, 2023',
    media: [
      {
        Type: MediaType.Img,
        src: '/extracurriculars/gdsc/cs-carnivale/poster.jpeg',
        mediaProps: { alt: '' },
        adjustWidth: 60,
      },
    ],
  }),

  Tag(HtmlTag.H2, `Solution Challenge Info Session + Flutter Workshop`),
  Tag(
    HtmlTag.P,
    `For this event, we introduced Google's Solution Challenge, an annual competition for GDSC members across the globe to design a special application for a cash prize, to the members of our chapter. The prompt for 2023 is a continuation of 2022's, which is to build a solution that solves one or more of the United Nations' 17 Sustainable Development Goals on any scale. To more effectively communicate what Solution Challenge is all about, I invited North America GDSC Program Manager Daniel Fiorillo to join us and speak about it with our members. `
  ),
  Tag(
    HtmlTag.P,
    `After a fantastic and informative session with Danny, I conducted our second codelab of the year, which was building an adaptive application with Flutter. I chose this workshop specifically because I wanted to give our members a good potential base for their Solution Challenge application; Flutter is a framework that allows developers to create applications suited for any platform or operating system, which I thought would pair perfectly with the reach that a Solution Challenge project aims to achieve.`
  ),
  Component(ComponentName.MediaGrid, {
    columns: 2,
    caption: 'February 1, 2023',
    media: [
      {
        Type: MediaType.Img,
        src: '/extracurriculars/gdsc/solution-challenge/poster.png',
        mediaProps: { alt: 'Solution challenge event poster' },
      },
      {
        Type: MediaType.Img,
        src: '/extracurriculars/gdsc/solution-challenge/group-picture.jpeg',
        mediaProps: { alt: 'A group photo' },
      },
    ],
  }),

  Tag(HtmlTag.H2, `Info Session + Firebase for Web Workshop`),
  Tag(
    HtmlTag.P,
    `For our first event of the school year, we held an info session to share with students what our club is all about. After that, I conducted a codelab where we created a simple chat application using Firebase Authentication, Hosting, Cloud Storage, Cloud Messaging, and Firestore.`
  ),
  Component(ComponentName.MediaGrid, {
    columns: 2,
    caption: 'December 2, 2022',
    media: [
      {
        Type: MediaType.Img,
        src: '/extracurriculars/gdsc/info-session/poster.png',
        mediaProps: { alt: 'Info Session Poster' },
      },
      {
        Type: MediaType.Img,
        src: '/extracurriculars/gdsc/info-session/presenting-codelab.jpg',
        mediaProps: { alt: 'Me conducting the codelab' },
      },
      {
        Type: MediaType.Img,
        src: '/extracurriculars/gdsc/info-session/audience.jpg',
        mediaProps: { alt: 'Our audience' },
      },
    ],
  }),
]

export default data
