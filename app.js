require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const { getServerTime, resolveErrorData, getIPAddress } = require('./utils')
const { student } = require('./routers/index')
const app = express()
morgan.token('localDate',function getDate(req) {
  return getServerTime()
})
morgan.format('blogLog', ':remote-addr - :remote-user [:localDate]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"')

app.use(cors())
app.use(morgan('blogLog', {stream: fs.createWriteStream(path.join(__dirname, `../log/${process.env.logName}`), {flags: 'a'})}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use('/v1', student)
app.use((req, res, next) => {
  resolveErrorData(res, '请求资源不存在', 404)
})
app.use((error, req, res, next) => {
  if (error.name === 'KYAppError') {
    resolveErrorData(res, error.message, error.status || 400)
  } else {
    console.log(error)
    resolveErrorData(res, '服务器内部错误', 500)
  }
})

app.listen(process.env.serverPort, () => {
  console.log(`--> ${getServerTime()} http://${getIPAddress()}:${process.env.serverPort}`)
})
