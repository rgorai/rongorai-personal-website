import { getFile, Tag, Component } from '../../../misc/utils.js'

export default [
  Tag('h1', 'About This Website'),

  Tag('h2', 'Summary'),
  Tag('p', 'This will be a summary of this website'),
  Tag('a', 'Project Repository', {
    href: 'https://github.com/rgorai/rongorai-personal-website',
    target: '_blank',
    rel: 'noreferrer',
  }),

  Tag('h2', 'Description'),
  Tag('p', 'This will be a description of this website'),

  Tag('h2', 'Release Notes'),
  Tag('h3', '1.0'),
  Tag('p', 'N/A'),

  // Component('Media', {
  //   none: null
  // })
]
