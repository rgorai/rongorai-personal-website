import { Tag, openLinkInNewTab, Component, getDocument } from '../misc/utils.js'

export default [
  Tag('h1', 'STEM'),

  Component('UpdatedOn', { date: 'December 11, 2023' }),

  Tag('h2', 'EDAM'),
  Tag(
    'p',
    `During my junior year of high school, I was accepted into the Engineering Design and Advanced Manufacturing (EDAM) program at the Morris County School of Technology. In this program, I took various engineering classes at the County College of Morris everyday alongside juniors from other schools across the county.`
  ),
  Tag(
    'p',
    `In addition to attending these classes, I also participated in NASA's High school students UNited to Create Hardware (HUNCH). During this program, I helped model bolts and lug nuts in CAD software, then fabricate them using computer-integrated manufacturing machines. These parts were used in a stowage locker which was actually sent up to the ISS by SpaceX on their CRS-10 mission aboard the Dragon C112 spacecraft.`
  ),
  Tag('p', `At the end of the program, `),
  Tag('a', 'OSHE Article on the HUNCH Program', {
    href: 'https://njsecretaryhighereducation.com/2017/04/20/apr2017-ccm/',
    ...openLinkInNewTab,
  }),
  Tag('a', 'More about SpaceX CRS-10', {
    href: 'https://en.wikipedia.org/wiki/SpaceX_CRS-10',
    ...openLinkInNewTab,
  }),
  Component('MediaGrid', {
    columns: 2,
    media: [
      {
        Type: 'img',
        src: '/extracurriculars/stem/edam/astronaut-selfie.jpg',
        mediaProps: { alt: 'Astronaut Selfie' },
      },
      {
        Type: 'video',
        src: '/extracurriculars/stem/edam/ccm-hunch-ceremony.mp4',
        mediaProps: {
          alt: 'Locker Signing Ceremony',
          poster:
            'https://static.rongorai.com/_compressed/extracurriculars/stem/edam/group-image.webp',
        },
      },
      {
        Type: 'img',
        src: '/extracurriculars/stem/edam/locker-small-group.jpg',
        mediaProps: { alt: 'Speaking with a NASA Representative' },
      },
      {
        Type: 'img',
        src: '/extracurriculars/stem/edam/hunch-memorabilia.jpg',
        mediaProps: { alt: 'HUNCH Memorabilia' },
      },
    ],
  }),

  Tag('h2', 'FTC Robotics'),
  Tag(
    'p',
    `My first major STEM affiliation was when I joined the NanoGurus FTC robotics team (Team #4347) in the summer of 2014. The FIRST Tech Challenge (FTC) is organized each year by the non-profit organization FIRST (For Inspiration and Recognition of Science and Technology). We used Tetrix, Lego NXT, and custom-built parts) to build robots and C++ in the ROBOTC IDE to program them. Our robots utilized multiple modes of control, using a variety of sensors like ultrasonic, color, IR, light, and more for autonomous motion and a simple game-like controller for manual motion. During my time on the team, I experienced CAD designing, building, and programming.`
  ),
  Tag(
    'p',
    `Every week, we would have meetings to discuss what kind of mechanism to use for each function of of the robot. For example, when planning the ball-transfer mechanism, some ideas were: scissor lift, telescopic arm, suction, pneumatic shooter, spring-loaded release, etc. We used design sketches and decision matrices to determine the best options. Then, we used CAD models to better visualize and to fine-tune the accuracy of our designs. In the building phase, we incorporated prototypes made from paper, plastic, and wood into the Tetrix build.`
  ),

  Tag('h3', 'PTC Design Challenge'),
  Tag(
    'p',
    `One of my proudest accomplishments as a part of FTC was at the 2015 New Jersey State Qualifier (just a stage before the regional competition). Here, I participated in an individual PTC Parametrics CAD Design Challenge. This competition tested my ability to design and virtually fabricate an entire robot based on one of three scenarios.`
  ),
  Tag('a', 'My PTC Design Challenge Report', {
    href: getDocument('/extracurriculars/stem/ftc/ptc-design-challenge.pdf'),
    ...openLinkInNewTab,
  }),
  Component('MediaGrid', {
    columns: 2,
    media: [
      {
        Type: 'img',
        src: '/extracurriculars/stem/ftc/ptc-challenge-award.jpg',
        mediaProps: { alt: 'PTC Challenge Award' },
      },
      {
        Type: 'img',
        src: '/extracurriculars/stem/ftc/ptc-design-award-ceremony.jpg',
        mediaProps: { alt: 'PTC Design Challenge Award Ceremony' },
      },
    ],
  }),

  Tag('h3', 'Montville FIRST Outreach'),
  Tag(
    'p',
    `Another achievement I earned was organizing a FIRST outreach for our team by myself. An outreach is an public event in which the team discusses the different FIRST programs and the impact STEM has on our society. I organized the outreach at the Montville Township Public Library, and after I submitted an advertisement for our outreach, it was attended by around 60 students and parents. In addition to our presentation and other programs, we also had different stations set up for the students to interact with. These stations included more specific info-booths, fun games with smaller robots we created, and a demonstration of our team robot on an official playing field.`
  ),
  Component('MediaGrid', {
    columns: 2,
    media: [
      {
        Type: 'img',
        src: '/extracurriculars/stem/ftc/montville-outreach.jpg',
        mediaProps: { alt: 'Montville Outreach' },
      },
      {
        Type: 'img',
        src: '/extracurriculars/stem/ftc/game-demonstration.jpg',
        mediaProps: { alt: 'Game Demonstration' },
      },
    ],
  }),
]
