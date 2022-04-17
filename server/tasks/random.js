const parseFilename = (...pathItems) =>
  pathItems.map((e) => e.replaceAll(' ', '-').toLowerCase()).join('-')

console.log(parseFilename('THis', 'IS a test', 'ofsorts'))
