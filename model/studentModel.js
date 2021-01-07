const mongoose = require('mongoose')
const db = require('./db')

const studentScheam = new mongoose.Schema({
  studentId: { type: Number },
  name: { type: String, default: '' },
  contact: { type: String, default: '' },
  degree: { type: String, default: '' },
  createTime: { type: String, default: '' },
  remark: { type: String, default: '' }
})

studentScheam.path('studentId').required(true, '学生id不能为空')

studentScheam.statics = {
  list: async function (options) {
    let { page = 1, size = 10, name = '', contact = '', degree = '', remark = '' } = options
    const query = {
      name: { $regex: (new RegExp(name, 'i')) },
      contact: { $regex: (new RegExp(contact, 'i')) },
      degree: { $regex: (new RegExp(degree, 'i')) },
      remark: { $regex: (new RegExp(remark, 'i')) }
    }
    const total = await this.countDocuments(query).exec()
    const dbData = await this.find(query).limit(size).skip(size * (page - 1)).exec()
    const list = dbData.map(item => {
      return {
        id: item.studentId,
        name: item.name,
        contact: item.contact,
        degree: item.degree,
        createTime: item.createTime,
        remark: item.remark
      }
    })
    return {
      total,
      list
    }
  }
}

const studentModel = db.model('student', studentScheam)

module.exports = studentModel