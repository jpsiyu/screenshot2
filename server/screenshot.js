const phantom = require('phantom')
const path = require('path')

class Screenshot {
  constructor() {
    this.viewport = { width: 1200, height: 600 }
    this.init()
  }

  async init() {
    this.instance = await phantom.create()
  }
  async shot(url, fileName, data) {
    const page = await this.instance.createPage()
    await page.property('viewportSize', { width: 1200, height: 600 })
    await page.on('onConsoleMessage', function (msg) {
      console.log(msg)
    })
    const status = await page.open(url)
    if (status == 'fail')
      return { status }
    if (data) {
      await page.evaluate(function (data) {
        window.dataInit(data)
      }, data)
    }
    const filePath = path.resolve(__dirname, `files/${fileName}`)
    await page.render(filePath)
    return { status, filePath }
  }
}

module.exports = Screenshot