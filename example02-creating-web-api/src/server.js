import http from 'node:http'
import { Readable } from 'node:stream'

function handler(request, response) {
  const readableStream = Readable({
    read() {
      this.push('hello')
      this.push('world')
      this.push(null)
    }
  })

  readableStream
  .pipe(response)
}

http.createServer(handler)
  .listen(3000)
  .on('listening', () => console.log('server is running at 3000'))