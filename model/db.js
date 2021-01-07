const { DBUser, DBPWD, host, port, DBName } = require('../config/index')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const db = mongoose.createConnection(`mongodb://${DBUser}:${DBPWD}@${host}:${port}/${DBName}`, { 'authSource': 'admin', 'useUnifiedTopology': true, 'useNewUrlParser':true, 'useFindAndModify': false })

db.on('err', console.error.bind(console, '连接错误:'))
db.once('open', () => {
	console.log('数据库连接成功')
})

module.exports = db
