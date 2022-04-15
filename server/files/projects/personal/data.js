import { getFile, Tag, Component } from '../../../misc/utils.js'

export default [
  Tag('h1', 'Personal Projects'),

  Tag('h2', 'Personal Website'),

  Tag(
    'p',
    `The purpose of this website is to share my hobby and work experiences, as well as showcase my professional skills as a software developer. I created this website from nothing but an empty folder and the knowledge I've gained from my classes and co-ops. It is a web application built on the MERN (MongoDB, Express, React, Node) Stack, utilizing modern programming technologies like TypeScript and Sass.`
  ),

  Tag('a', 'More about this website', { href: '/about/this-website' }),

  Tag('h2', 'Web Programming Final Project'),

  Tag('p', 'description of my project'),

  Tag('a', 'Project Repository', {
    href: 'https://github.com/rgorai/cs546-final-project',
    target: '_blank',
    rel: 'noreferrer',
  }),
]
