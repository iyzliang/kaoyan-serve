const dayjs = require('dayjs')
const os = require('os')

const getServerTime = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

const resolveSuccessData = (res, dataInfo = {}, dataMsg = 'ok') => {
  res.status(200).send({
    code: 200,
    message: dataMsg,
    serverTime: getServerTime(),
    data: dataInfo
  })
}

const resolveErrorData = (res, dataMsg = 'error', dataCode = 400) => {
  res.status(dataCode).send({
    code: dataCode,
    message: dataMsg,
    serverTime: getServerTime(),
    data: {}
  })
}

const getIPAddress = () => {
  const interfaces = os.networkInterfaces()
  for (const devName in interfaces) {
    const iface = interfaces[devName]
    for (let index = 0; index < iface.length; index++) {
      const alias = iface[index]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

module.exports = {
  getServerTime,
  resolveSuccessData,
  resolveErrorData,
  getIPAddress
}