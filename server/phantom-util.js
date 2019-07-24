const phantom = require('phantom')
const path = require('path')

const shot = async function () {
  const instance = await phantom.create()
  const page = await instance.createPage()

  /**
   * 输入所有的请求
   */
  /*
  await page.on('onResourceRequested', function (requestData) {
    console.info('Requesting', requestData)
  })
  */

  /**
   * 设置viewport的大小
   */
  await page.property('viewportSize', { width: 1200, height: 600 })

  /**
   * status 操作状态 : success | fail
   */
  const status = await page.open('https://www.baidu.com/s?wd=love')
  //const status = await page.open('https://bbb.com')
  console.log('Page opened with status', status)

  /**
   * 渲染的HTML
   */
  /*
  const content = await page.property('content')
  console.log('content', content)
  */

  /**
   * 渲染到图片,pdf
   */
  if (status == 'success') {
    const imgPath = path.resolve(__dirname, 'files/test.png')
    console.info('Render to image', imgPath)
    await page.render(imgPath)
  }

  /**
   * 退出
   */
  await instance.exit()
}



module.exports = { shot }