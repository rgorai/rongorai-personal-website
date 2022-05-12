import { Tag, Component } from '../misc/utils.js'

export default [
  Tag('h1', 'About Myself'),

  Component('Media', {
    Type: 'img',
    src: '/about/myself/profile-image.jpg',
    mediaProps: { alt: 'Profile Image' },
    floatLeft: true,
  }),

  Tag(
    'p',
    `Hello, my name is Ron Gorai. I'm currently a 4/5 undergraduate pursuing a BS in Computer Science from Stevens Institute of Technology. My professional interests lie in software development, with a focus on web programming.`
  ),

  Tag(
    'p',
    `I have been interested in STEM throughout my life, ever since my grandfather showed me around the engineering labs at the world famous Indian Institute of Technology (IIT) in Kharagpur during my early childhood. For years after that, I had been participating in numerous STEM-related programs like engineering summer camps and robotics teams.`
  ),

  Tag(
    'p',
    `Once I started high school, I got my first real taste of programming doing robotics for an FTC robotics team. I was really intrigued by the way software worked and how many different things can be done with it. So, I signed up for every programming class my school offered, from web development to AP Computer Science.`
  ),

  Tag(
    'p',
    `By the time it was time to apply for college, I had planned to go into an engineering field due to my early interest in machines and science. However, I realized the power of software and the crucial role it holds in modern society, so I decided to pursue a software-related field. After I graduate from Stevens, my goal is to join Google or one of the other MAANG companies to help develop code for their applications and services.`
  ),

  Component('Media', {
    Type: 'img',
    src: '/about/myself/stevens-aerial.jpg',
    mediaProps: { alt: 'Stevens Aerial Shot' },
  }),
]
