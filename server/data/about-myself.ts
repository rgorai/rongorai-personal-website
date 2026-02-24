import { Tag, Component } from '../misc/utils.js'
import { HtmlTag, ComponentName, MediaType } from '../types/enums.js'
import type { PageData } from '../types/content.js'

const data: PageData = [
  Tag(HtmlTag.H1, 'About Myself'),

  Component(ComponentName.UpdatedOn, { date: 'February 15, 2026' }),

  Component(ComponentName.Media, {
    Type: MediaType.Img,
    src: '/about/myself/profile-image.jpg',
    mediaProps: { alt: 'Profile Image' },
    floatLeft: true,
  }),

  Tag(
    HtmlTag.P,
    `Hello! My name is Ron Gorai. I'm a graduate from Stevens Institute of Technology with a BS in Computer Science and Minor in Cybersecurity. My professional interests lie in software development, with a focus on web programming.`
  ),

  Tag(
    HtmlTag.P,
    `I have been interested in STEM throughout my life, ever since my grandfather showed me around the engineering labs at the world famous Indian Institute of Technology (IIT) in Kharagpur during my early childhood. For years after that, I had been participating in numerous STEM-related programs like engineering summer camps and robotics teams.`
  ),

  Tag(
    HtmlTag.P,
    `Once I started high school, I got my first real taste of programming doing robotics for an FTC robotics team. I was really intrigued by the way software worked and how many different things can be done with it. So, I signed up for every programming class my school offered, from web development to AP Computer Science.`
  ),

  Tag(
    HtmlTag.P,
    `By the time I was ready to apply for college, I had planned to go into an engineering field due to my early interest in machines and science. However, I realized the power of software and the crucial role it holds in modern society, so I decided to pursue a software-related field. Over the years, I founded and refined a handful of new skills with my co-ops and personal projects.`
  ),

  Tag(
    HtmlTag.P,
    `Today, I am a full stack product engineer in the NYC area who thrives in fast-paced startup environments. I'm at my best when I have true ownership of the product — working across the entire stack from frontend to backend and infrastructure, while staying closely connected to the people who use what I build. There's nothing more rewarding to me than shipping features end-to-end and seeing their direct impact on users.`
  ),

  Component(ComponentName.Media, {
    Type: MediaType.Img,
    src: '/about/myself/stevens-aerial.jpg',
    mediaProps: { alt: 'Stevens Aerial Shot' },
  }),
]

export default data
