import { Tag, openLinkInNewTab, Component } from '../misc/utils.js'

export default [
  Tag('h1', 'About This Website'),

  Tag('h2', 'Summary'),
  Tag(
    'p',
    `The purpose of this website is to share my hobby and work experiences and practice my skills as a professional software developer. I created this website from nothing but an empty folder and the knowledge I've gained from my classes and co-ops. It is a web application built on the MERN (MongoDB, Express, React, Node) Stack, utilizing modern programming languages like TypeScript and Sass.`
  ),
  Tag(
    'p',
    `Read below for a deeper dive on how I built the website. Please feel free to take a look through the repository and let me know what you think of my code, and perhaps even leave me an endorsement on LinkedIn if you think it's done well!`
  ),
  Tag('a', 'Personal Website Repository', {
    href: 'https://github.com/rgorai/rongorai-personal-website',
    ...openLinkInNewTab,
  }),

  Tag('h2', 'Description'),
  Tag(
    'p',
    `Since its inception, my personal website has been built with the WordPress website builder. However, after taking Web Programming in Fall 2021 and acing the final project, I was inspired to rebuild my personal website from the ground up in the same fashion. I decided this for 2 reasons: 1) to test the valuable skills I learned from my classes and co-ops; 2) to build my website exactly to my taste.`
  ),
  Tag('a', 'More on my Web Programming Final', {
    href: '/projects/personal#web-programming-final-project',
  }),
  Tag(
    'p',
    `After learning how to make a relatively basic full-stack app with React, Express, and MongoDB on my Web Programming final project, the first thing I had to learn was how to deploy a web application. I wanted to figure this out before beginning work on my new website to ensure it was possible for me to do, both cost-wise and skill-wise. I found that Heroku was the community go-to for easily hosting a web application on the internet. Thankfully, they have a free tier that I'm currently using, making the domain name the only real monetary cost of my whole website. Once Heroku was set up, I just had to set up a DNS for my domain name and after a test depolyment of a sample react app, I was ready to start developing my website.`
  ),
  Tag(
    'p',
    `Creating the project was quite straight-forward; it was simply running create-react-app with a TypeScript template. From here, it was just deciding how I wanted the website to be built and what features I wanted. When designing the code structure of the application, I tried my best to keep it up to par with industry standards by both writing it in an efficient manner, and keeping teamwork in mind. Some examples of how I decided to do this are employing a modular coding strategy (i.e. using typed objects to store data that's then used to generate different aspects/components of the app) and commenting parts of my code. <b>These actions keep the code easy to follow and understand, and therefore easy to develop for in the future - things that I feel are often lacking / underappreciated / overlooked upon in the software industry today.</b>`
  ),
  Tag(
    'p',
    `In addition to acting as my own project manager, I also learned a handful of smaller skills such as:`
  ),
  Component('BulletedList', {
    items: [
      'Amazon S3, CloudFront, and Route 53 to store and serve static assets',
      'CloudFlare SSL certification with custom domain names',
      'TypeScript type guards and nullish operators',
      'React error boundaries with class components',
      'Google ReCAPTCHA API',
      'DOM Purify package',
      'CSS keyframes',
    ],
  }),
  Tag(
    'p',
    `During the development process of version 1.0 of my website, I thought of some features that would be nice to have, but would require too much extra development time. So, I decided to hold them off for a subsequent version, for which details can be found below.`
  ),

  Tag('h2', 'Release Notes'),

  Tag('h3', '2.0 (Upcoming)'),
  Component('BulletedList', {
    items: [
      'Redux to better manage app data loading / storage',
      'Pagination for guestbook list',
      'Dark / light mode switch',
      'Running MovieHub project one a site route',
      'Admin portal with JWT security to update website data from the website itself',
      'INSERT IMRPOVEMENTS',
    ],
  }),

  Tag('h3', '1.0'),
  Component('BulletedList', {
    items: [
      'Full mobile site for smaller devices',
      'Automatically generated table of contents for content pages',
      'Auto-self-aligning media grid components',
      'Top and footer app navigation',
      'Side navigation for desired content pages',
    ],
  }),
]
