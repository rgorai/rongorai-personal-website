import fs from 'fs'
import path from 'path'
import S3 from 'aws-sdk/clients/s3.js'
import { Tag, Component } from '../misc/utils.js'

const getAge = (birthday) => {
  const diff = String(
    (new Date() - new Date(birthday)) / (1000 * 3600 * 24 * 365.25)
  )
  return `${diff.slice(0, diff.indexOf('.') + 2)} years`
}

const getMedia = async (name) => {
  let files = []

  if (process.env.NODE_ENV === 'development') {
    files = fs.readdirSync(path.resolve('.local', 's3-bucket', 'pets', name))
  } else {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      signatureVersion: 'v4',
      region: 'us-east-1',
    })
    files = (
      await s3
        .listObjectsV2({
          Bucket: 'rongorai-personal-website-bucket',
          Prefix: `pets/${name}`,
        })
        .promise()
    ).Contents.map((e) =>
      ((split) => split[split.length - 1])(e.Key.split('/'))
    )
  }

  return files
    .sort((a, b) => a.localeCompare(b))
    .map((e, i) =>
      e.includes('.mp4')
        ? {
            Type: 'video',
            src: `/pets/${name}/${e}`,
            mediaProps: { loop: true },
          }
        : {
            Type: 'img',
            src: `/pets/${name}/${e}`,
            mediaProps: { alt: `${name}-${i}` },
          }
    )
}

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
    media: await getMedia('raja'),
  }),

  Tag('h2', 'Lux'),
  Component('StatGrid', {
    Gender: 'Male',
    Adopted: 'February 18, 2022',
    Birthday: 'February 8, 2020',
    Age: getAge('02/08/2020 12:00:00'),
    Description: `Lux was our second cat. He's a shy boy who likes to lay around and sleep all day.`,
  }),
  Component('MediaGrid', {
    columns: 4,
    media: await getMedia('lux'),
  }),
]
