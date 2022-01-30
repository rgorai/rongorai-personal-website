import { getFile } from '../../../utils.js'

export default [
  {
    tag: 'h1',
    text: 'Music',
  },
  {
    tag: 'p',
    text: `I first took an interest in music when my dad gave me his iPod with all his old music on it. It was 2009. The first song I played was The Trooper by Iron Maiden, and I instantly fell in love with the sound. That night, I listened to hundreds of songs by them and other bands like Megadeth, AC/DC and Guns N' Roses. A passion for crazy solos and intricate rhythms instantly grew within me.`,
  },
  {
    tag: 'p',
    text: `I started taking guitar lessons at the Music Shop in Boonton, NJ. After just a couple of years, I felt the need for learning more, so I moved to the School of Rock in Montclair, NJ. Soon, I started gaining the confidence to play on stage and I joined their performance program. Every year since then, I have played songs with other student musicians by artists ranging from Jimi Hendrix to Ozzy Osbourne at local venues.`,
  },
  {
    tag: 'p',
    text: `Towards the end of 2015, I joined the SoR Montclair’s Houseband, which is equivalent to a “varsity team for music.” Being a part of the House-band was a completely different experience. It gave me the opportunity to perform at large venues like the Javits Center in NYC for Progressive’s International Motorcycle Show.`,
  },
  {
    tag: 'p',
    text: `The highlight, of course, has been performing at the Summerfest in Milwaukee, a music festival in which people from all around the world come to see celebrity artists as well as emerging artists. Over the course of about 11 days, nearly 900,000 people attend each year. Other Schools of Rock from around the world also come to play at this exclusive event.. Even though it was quite overwhelming, I hit the D’s and the C-minor’s spot-on as we rocked the Harley Davidson Arena with tracks by artists ranging from Soundgarden to Prince, captivating an audience that had really come to watch celebrities like Paul McCartney and Sting.`,
  },
  {
    tag: 'p',
    text: `In May 2018, I was featured on the cover of the NJ Kids Magazine in promotion of School of Rock, Montclair. This picture was taken at the Harley Davidson Arena at Summerfest.`,
  },
  {
    tag: 'a',
    text: 'SoR Montclair Facebook Page',
    props: {
      href: 'https://www.facebook.com/pg/SchoolofRockMontclair/photos/?ref=page_internal',
      rel: 'noreferrer',
      target: '_blank',
    },
  },
  {
    tag: 'h2',
    text: 'SoR Montclair Facebook Page',
  },
  {
    component: 'MediaGrid',
    props: {
      columns: 2,
      media: [
        {
          Type: 'img',
          caption: 'May 2018 NJ Kids Magazine Cover',
          src: getFile('hobbies/music/summerfest/njkids-cover-feature.jpg'),
          mediaProps: { alt: 'May 2018 NJ Kids Magazine Cover' },
        },
        {
          Type: 'img',
          caption: 'Summerfest 2016 Lineup',
          src: getFile('hobbies/music/summerfest/summerfest-2016-lineup.jpg'),
          mediaProps: { alt: 'Summerfest 2016 Lineup' },
        },
      ],
    },
  },
  {
    component: 'Media',
    props: {
      Type: 'video',
      src: getFile('hobbies/music/summerfest/summerfest-prince.mp4'),
      caption: 'A portion of the song “Let’s Go Crazy” by Prince',
      mediaProps: { controls: true, loop: true },
    },
  },
  {
    tag: 'h2',
    text: 'Performances Scrapbook',
  },
  {
    component: 'MediaGrid',
    props: {
      columns: 3,
      media: [
        {
          Type: 'img',
          caption: 'Jimi Hendrix - 2013',
          src: getFile('hobbies/music/scrapbook/hendrix.jpg'),
          mediaProps: { alt: 'Jimi Hendrix Scrapbook Page' },
        },
        {
          Type: 'img',
          caption: 'Sound City - 2014',
          src: getFile('hobbies/music/scrapbook/sound-city.jpg'),
          mediaProps: { alt: 'Sound City Scrapbook Page' },
        },
        {
          Type: 'img',
          caption: 'Sub-Pop - 2014',
          src: getFile('hobbies/music/scrapbook/sub-pop.jpg'),
          mediaProps: { alt: 'Sub-Pop Scrapbook Page' },
        },
        {
          Type: 'img',
          caption: 'Bring Your Own Song - 2015',
          src: getFile('hobbies/music/scrapbook/byos.jpg'),
          mediaProps: { alt: 'Bring Your Own Song Scrapbook Page' },
        },
        {
          Type: 'img',
          caption: 'Soundgarden - 2016',
          src: getFile('hobbies/music/scrapbook/soundgarden.jpg'),
          mediaProps: { alt: 'Soundgarden Scrapbook Page' },
        },
        {
          Type: 'img',
          caption: 'Butch Vig - 2017',
          src: getFile('hobbies/music/scrapbook/butch-vig.jpg'),
          mediaProps: { alt: 'Butch Vig Scrapbook Page' },
        },
      ],
    },
  },
]
