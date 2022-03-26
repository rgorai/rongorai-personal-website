import fs from 'fs'
import path from 'path'
import { getFile, Tag, Component } from '../../misc/utils.js'

const getAge = (birthday) => {
  const diff = String(
    (new Date() - new Date(birthday)) / (1000 * 3600 * 24 * 365.25)
  )
  return `${diff.slice(0, diff.indexOf('.') + 2)} years`
}

const getMediaNames = (name) =>
  fs.readdirSync(path.resolve('server', 'files', 'pets', name))

export default [
  Tag('h1', 'Pets'),

  Tag('h2', 'Raja'),

  Component('StatGrid', {
    Gender: 'Female',
    Adopted: 'September 6, 2019',
    Birthday: 'March 30, 2019',
    Age: getAge('03/30/2019 12:00:00'),
    Description: `Raja was our first cat, and my first own pet. She's a sassy girl who loves to run around and play.`,
  }),

  Component('MediaGrid', {
    columns: 4,
    media: getMediaNames('raja').map((e, i) =>
      e.includes('.mp4')
        ? {
            Type: 'video',
            src: getFile(`pets/raja/${e}`),
            mediaProps: { controls: true, loop: true },
          }
        : {
            Type: 'img',
            src: getFile(`pets/raja/${e}`),
            mediaProps: { alt: `raja-${i}` },
          }
    ),
  }),

  Tag('h2', 'Lux'),

  Component('StatGrid', {
    Gender: 'Male',
    Adopted: 'February 18, 2022',
    Birthday: 'February 8, 2020',
    Age: getAge('02/08/2020 12:00:00'),
    Description: `Lux was our second cat. He's a shy boy who loves to lay around and sleep all day.`,
  }),

  Component('MediaGrid', {
    columns: 4,
    media: getMediaNames('lux').map((e, i) =>
      e.includes('.mp4')
        ? {
            Type: 'video',
            src: getFile(`pets/lux/${e}`),
            mediaProps: { controls: true, loop: true },
          }
        : {
            Type: 'img',
            src: getFile(`pets/lux/${e}`),
            mediaProps: { alt: `lux-${i}` },
          }
    ),
  }),
]
