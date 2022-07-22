import { ChildProcess } from 'node:child_process'
import { get } from 'node:http'
import { createWriteStream } from 'node:fs'

import { Transform, Writable } from 'node:stream'

const url = "http://localhost:3000"

const getHttpStream = () => new Promise(resolve => get(url, response => resolve(response)))

const stream = await getHttpStream()

stream
  .pipe(
    Transform({
      objectMode: true,
      transform(chunk, end, cb) {
        const item = JSON.parse(chunk)
        // console.log('chunk', JSON.parse(chunk))
        const myNumber = /\d+/.exec(item.name)[0]
        const isEven = myNumber % 2 === 0

        item.name = item.name.concat(isEven ? ' is even' : ' is odd')

        cb(null, JSON.stringify(item))
      }
    })
  )
  .filter(chunk => chunk.includes('even'))
  .map(chunk => chunk.toUpperCase() + '\n')
  .pipe(
    createWriteStream('response.log', { flags: 'a' })
  )
  // .pipe(
  //   Writable({
  //     objectMode: true,
  //     write(chunk, enc, cb) {
  //       console.log('chunk', chunk);
  //       return cb();
  //     }
  //   })
  // )
  // .pipe(process.stdout)