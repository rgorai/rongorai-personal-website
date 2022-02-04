import { getFile, Tag, Component } from '../../../misc/utils.js'

export default [
  Tag('h1', 'STEM'),

  Tag('h2', 'FTC Robotics'),

  Tag(
    'p',
    `My first large-scale STEM affiliation was when I joined the NanoGurus FTC robotics team (Team #4347) in the summer of 2014. The FIRST Tech Challenge (FTC) organized each year by the non-profit organization, For Inspiration and Recognition of Science and Technology, better known as FIRST. We used Tetrix and Lego NXT parts (as well as some custom parts) for building the robots, and we programmed the controllers using the ROBOTC IDE for C++.`
  ),

  Tag(
    'p',
    `I have been a CAD designer, a robot builder and a programmer on the team. We used a variety of sensors (e.g. ultrasonic, color, IR, light, etc.) to enable the actions of the robot in autonomous mode. The manual mode was controlled by remotes.`
  ),

  Tag(
    'p',
    `We would get into several team-huddles every week to discuss what kind of mechanism to use for each function – e.g. scissor lift, telescopic arm, suction, pneumatic shooter, spring-loaded release, scooper, etc. We used design sketches and decision matrices to determine the best options. Then, we used CAD models to better visualize and to fine-tune the accuracy of our designs. In the building phase, we incorporated prototypes made from paper, plastic and wood into the Tetrix building blocks. Next, we would finally get to building. However, if we needed to build a custom part, we had to do same stated earlier, in addition to completing a cost analysis`
  ),

  Tag(
    'p',
    `One of my proudest personal accomplishments was at the 2015 New Jersey State Qualifier – this was a stage before the regional competition. Here, I participated in an individual PTC Parametrics CAD Design Challenge. This competition tested my ability to design and virtually fabricate an entire robot based on one of three scenarios. A full report on the project can be found below.`
  ),

  Tag('a', 'My PTC Design Challenge Report', {
    href: getFile('hobbies/stem/ftc/ptc-design-challenge.pdf'),
    target: '_blank',
    rel: 'noreferrer',
  }),

  Component('MediaGrid', {
    columns: 2,
    media: [
      {
        Type: 'img',
        src: getFile('hobbies/stem/ftc/ptc-challenge-award.jpg'),
        mediaProps: { alt: 'PTC Challenge Award' },
      },
      {
        Type: 'img',
        src: getFile('hobbies/stem/ftc/ptc-design-award-ceremony.jpg'),
        mediaProps: { alt: 'PTC Design Challenge Award Ceremony' },
      },
    ],
  }),

  Tag(
    'p',
    `Another achievement I attained was organizing an outreach completely by myself. An outreach is an event in which the team holds info-sessions in public venues to discuss the different FIRST programs and the impact of STEM on our society with students and parents. I organized the outreach at the Montville Township Public Library. After putting out an advertisement there, the outreach was attending by around 60 students and parents. In addition to our presentation and the programs, we also had different stations set up for the students, which varied from more specific info-booths to fun games with smaller robots to a demonstration of our team robot on an official Cascade Effect playing field.`
  ),

  Component('MediaGrid', {
    columns: 2,
    media: [
      {
        Type: 'img',
        src: getFile('hobbies/stem/ftc/montville-outreach.jpg'),
        mediaProps: { alt: 'Montville Outreach' },
      },
      {
        Type: 'img',
        src: getFile('hobbies/stem/ftc/game-demonstration.jpg'),
        mediaProps: { alt: 'Game Demonstration' },
      },
    ],
  }),

  Tag('h2', 'EDAM'),

  Tag(
    'p',
    `During my junior year of high school, I was accepted into the Engineering Design and Advanced Manufacturing (EDAM) program at the Morris County School of Technology. In this program, I took various engineering classes at the County College of Morris alongside other juniors from schools across Morris County. In addition to these classes, we were also a part of NASA's High school students United to Create Hardware (HUNCH). We modeled bolts and lug nuts in CAD and then fabricated them using CIMs; these were to made to be used in a locker that NASA sends up to the ISS.`
  ),

  Component('MediaGrid', {
    columns: 2,
    media: [
      {
        Type: 'img',
        src: getFile('hobbies/stem/edam/astronaut-selfie.jpg'),
        mediaProps: { alt: 'Astronaut Selfie' },
      },
      {
        Type: 'img',
        src: getFile('hobbies/stem/edam/hunch-memorabilia.jpg'),
        mediaProps: { alt: 'Hunch Memorabilia' },
      },
    ],
  }),
]
