import { getFile, Tag, Component } from '../../../misc/utils.js'

export default [
  Tag('h1', 'Personal Projects'),

  Tag('h2', 'Personal Website'),

  Tag('p', 'small summary about my personal website'),

  Tag('a', 'More about this website', { href: '/about/this-website' }),

  Tag('h2', 'Web Programming Final Project'),

  Tag('p', 'description of my project'),

  Tag('a', 'Project Repository', {
    href: 'https://github.com/rgorai/cs546-final-project',
    target: '_blank',
    rel: 'noreferrer',
  }),
]
