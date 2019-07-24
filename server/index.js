const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const path = require('path')
const Screenshot = require('./screenshot')
const bodyParser = require('body-parser')
const util = require('./util')

const app = express()

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/template", express.static(path.resolve(__dirname, '../template')))

app.post('/api/test/screenshot', async function (req, res) {
  const postData = req.body
  const template = req.body.template || 'template/test.html'
  const shotRes = await screenshot.shot(template, postData.objectName)
  res.send(JSON.stringify(shotRes))
})

let screenshot = new Screenshot()

async function start() {
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  await screenshot.init()

  app.use(nuxt.render)
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
