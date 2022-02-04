import { getFile, Tag, Component } from '../../../misc/utils.js'

export default [
  Tag('h1', 'About Myself'),

  Component('Media', {
    Type: 'img',
    src: getFile('about/myself/profile-image.jpg'),
    mediaProps: { alt: 'Profile Image' },
    alignLeft: true,
  }),

  Tag(
    'p',
    `My name is Rajarshi, but I go by Ron. I have been interested in STEM throughout my life, ever since my grandfather showed me around the engineering labs at the world famous Indian Institute of Technology (IIT) in Kharagpur during my early childhood. For years after that, I had been participating in numerous STEM-related programs like engineering summer camps and robotics teams.`
  ),

  Tag(
    'p',
    `Once I started high school, I got my first real taste of programming doing robotics for an FTC robotics team. I was really intrigued by the way software worked and how many different things can be done with it. So, I signed up for every programming class my school offered, from web development to AP computer Science.`
  ),

  Tag(
    'p',
    `Until this point, I had always planned to go into an engineering field due to my early interest in machines and science. However, I quickly realized the power of software and the crucial role it holds in modern society. Since I had already had years of education and an internship project in computer science, I decided to pursue a software-related program in college.`
  ),

  Tag(
    'p',
    `While looking through college programs, I was fascinated to find that a couple of the schools I was applying had a new, specialized degree: cybersecurity. Even though I had not had any real experience with software security, I felt that it would best to pursue this field because of the ever-growing need for security professionals in today's software-driven world.`
  ),

  Tag(
    'p',
    `I am currently a 4/5 at the Stevens Institute of Technology in Hoboken, NJ pursuing a BS in Cybersecurity.`
  ),

  Component('Media', {
    Type: 'img',
    src: getFile('about/myself/stevens-aerial.jpg'),
    mediaProps: { alt: 'Stevens Aerial Shot' },
  }),
]
