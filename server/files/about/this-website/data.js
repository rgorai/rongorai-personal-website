import { getFile, Tag, Component } from '../../../misc/utils.js'

export default [
  Tag('h1', 'About This Website'),

  Tag('h2', 'Summary'),

  Tag(
    'p',
    `The purpose of this website is to share my hobby and work experiences, as well as showcase my professional skills as a software developer. I created this website from nothing but an empty folder and the knowledge I've gained from my classes and co-ops. It is a web application built on the MERN (MongoDB, Express, React, Node) Stack, utilizing modern programming technologies like TypeScript and Sass. Read below for a deeper dive on how I built the website. Please feel free to take a look through the repository and let me know what you think of my code, and even leave me an endorsement on LinkedIn if you think it's done well!`
  ),

  Tag('a', 'Project Repository', {
    href: 'https://github.com/rgorai/rongorai-personal-website',
    target: '_blank',
    rel: 'noreferrer',
  }),

  Tag('h2', 'Description'),

  Tag(
    'p',
    `Since it's inception, my personal website has been built with the WordPress website builder. However, after taking Web Programming in Fall 2021 and acing the final project, I was inspired to rebuild my personal website from the ground up in the same fashion. I decided this for 2 reasons: 1) to test the valuable skills I learned from my classes and co-ops; 2) to build my website exactly to my taste.`
  ),

  Tag('a', 'More on my Web Programming Final', {
    href: '/projects/personal#web-programming-final-project',
  }),

  Tag(
    'p',
    `After learning how to make a relatively basic full-stack app with React, Express, and MongoDB on my Web Programming final project, the first thing I had to learn was how to deploy a web application. I wanted to figure this out before beginning work on my new website to ensure it was possible for me to do, both cost-wise and skill-wise. I found that Heroku was the community go-to cloud service to easily host a web application on the internet. Thankfully, they have a free tier which I am currently using, making the domain name the only monetary cost of my whole website. Once Heroku was set up, I just had to set up a DNS for my domain name and after a test depolyment of a sample react app, I was ready to start developing my website.`
  ),

  Tag(
    'p',
    `Creating the project was quite straight-forward; it was simply running create-react-app with a TypeScript template. From here, it was just deciding how I wanted the website to be built and what features I wanted. When designing the code structure of the application, I tried my best to keep it up to par with industry standards by both writing it in an efficient manner, and keeping teamwork in mind. Some examples of how I decided to do this are employing a modular coding strategy (i.e. using objects to store data that is then used to generate different aspects/components of the app) and commenting parts of my code. <b>These actions keep the code easy to follow and understand, and therefore easy to develop for in the future - things that I feel are often lacking / underappreciated / overlooked upon in the software industry today.</b>`
  ),

  Tag(
    'p',
    `In addition to acting as my own project manager, I also learned a handful of smaller skills such as:`
  ),

  Component('BulletedList', {
    items: [
      'TypeScript type guards',
      'React error boundaries with class components',
      'Google ReCAPTCHA API',
      'DOM Purify',
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
      'Redux to manage app data loading / storage',
      'Dark mode switch',
      'Pagination for guestbook list',
      'Running Web Programming final project on a route',
      'Admin portal with JWT security to update website data from the website itself',
    ],
  }),

  Tag('h3', '1.0'),

  Component('BulletedList', {
    items: [
      'Full mobile site for smaller devices',
      'Side navigation for desired content pages',
      'Automatically generated table of contents for content pages',
      'Auto-self-aligning media grid components',
      'Top and footer app navigation',
    ],
  }),
]
