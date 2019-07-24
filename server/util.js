const serverData = function (status, url, message) {
  return { status, url, message }
}

const checkFormat = function (data) {
  if (!data.template) {
    return new Error('Field template is required')
  } else if (!data.objectName) {
    return new Error('Field objectName is required')
  }
  return null
}

const isUrl = function (str) {
  return str.startsWith('http')
}

module.exports = { serverData, checkFormat, isUrl }
