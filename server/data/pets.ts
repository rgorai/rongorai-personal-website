import fs from 'fs'
import path from 'path'
import S3 from 'aws-sdk/clients/s3.js'
import { Tag, Component } from '../misc/utils.js'
import { HtmlTag, ComponentName, MediaType } from '../types/enums.js'
import type { PageData, MediaProps } from '../types/content.js'

const getAge = (birthday: string): string => {
  const diff = String(
    (new Date().getTime() - new Date(birthday).getTime()) /
      (1000 * 3600 * 24 * 365.25)
  )
  return `${diff.slice(0, diff.indexOf('.') + 2)} years`
}

const getMedia = async (name: string): Promise<MediaProps[]> => {
  let files: string[] = []

  if (process.env.NODE_ENV === 'development') {
    files = fs.readdirSync(path.resolve('.local', 's3-bucket', 'pets', name))
  } else {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      signatureVersion: 'v4',
      region: 'us-east-1',
    })
    const result = await s3
      .listObjectsV2({
        Bucket: 'rongorai-personal-website-bucket',
        Prefix: `pets/${name}`,
      })
      .promise()
    files = (result.Contents ?? []).map((e) => {
      const split = (e.Key ?? '').split('/')
      return split[split.length - 1]
    })
  }

  return files
    .sort((a, b) => a.localeCompare(b))
    .map(
      (e, i): MediaProps =>
        e.includes('.mp4')
          ? {
              Type: MediaType.Video,
              src: `/pets/${name}/${e}`,
              mediaProps: { loop: true },
            }
          : {
              Type: MediaType.Img,
              src: `/pets/${name}/${e}`,
              mediaProps: { alt: `${name}-${i}` },
            }
    )
}

const data: PageData = [
  Tag(HtmlTag.H1, 'Pets'),

  Tag(HtmlTag.H2, 'Raja'),
  Component(ComponentName.StatGrid, {
    Gender: 'Female',
    Adopted: 'September 6, 2019',
    Birthday: 'March 30, 2019',
    Age: getAge('03/30/2019 12:00:00'),
    Description: `Raja was our first cat, and my first own pet. She's a sassy girl who loves to run around and play.`,
  }),
  Component(ComponentName.MediaGrid, {
    columns: 4,
    media: await getMedia('raja'),
  }),

  Tag(HtmlTag.H2, 'Lux'),
  Component(ComponentName.StatGrid, {
    Gender: 'Male',
    Adopted: 'February 18, 2022',
    Birthday: 'February 8, 2020',
    Age: getAge('02/08/2020 12:00:00'),
    Description: `Lux was our second cat. He's a shy boy who likes to lay around and sleep all day.`,
  }),
  Component(ComponentName.MediaGrid, {
    columns: 4,
    media: await getMedia('lux'),
  }),
]

export default data
