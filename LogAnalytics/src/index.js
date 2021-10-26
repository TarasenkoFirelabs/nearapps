const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('API call is received.\n')
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})


//
// const http = require('http')
// const fs = require('fs');
//
// const hostname = '127.0.0.1'
// const port = 9002
//
//
// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//
//
//
//
//   app.get('/', function (req, res) {
//     // const html = fs.readFileSync(path.resolve(__dirname, "index.html"));
//     // res.end(html);
//
//     res.end( process.cwd())
//
//
//   });
// })
//
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })
