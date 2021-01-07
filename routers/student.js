const router = require('express').Router()
const { resolveSuccessData, resolveErrorData, getServerTime } = require('../utils')
const { ThrowError, ErrorCode } = require('../utils/throwError')
const idsModel = require('../model/idsModel')
const studentModel = require('../model/studentModel')

router.route('/student').post(async (req, res, next) => {
  try {
    const { name, contact, degree } = req.body
    if (!contact) throw new ThrowError(ErrorCode.param, { message: '联系方式不能为空', status: 400 })
    const studentId = await idsModel.get_id_by_model('studentId')
    const options = {
      studentId,
      contact,
      name,
      degree,
      createTime: getServerTime()
    }
    await (new studentModel(options)).save()
    resolveSuccessData(res)
  } catch (error) {
    next(error)
  }
})

router.route('/student').get(async (req, res, next) => {
  try {
    const { page, size, name, contact, degree, remark } = req.query
    const resData = await studentModel.list({
      page: parseInt(page),
      size: parseInt(size),
      name,
      contact,
      degree,
      remark
    })
    resolveSuccessData(res, resData)
  } catch (error) {
    next(error)
  }
})

router.route('/student/remark/:id').put(async (req, res, next) => {
  try {
    const { id } = req.params
    const { remark } = req.body
    if (!id) throw new ThrowError(ErrorCode.param, { message: 'id不能为空', status: 400 })
    const newItem = await studentModel.findOneAndUpdate({ studentId: id }, { remark }, { new: true }).exec()
    resolveSuccessData(res, {
      id: newItem.studentId,
      name: newItem.name,
      contact: newItem.contact,
      degree: newItem.degree,
      createTime: newItem.createTime,
      remark: newItem.remark
    })
  } catch (error) {
    next(error)
  }
})

router.route('/student/:id').delete(async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) throw new ThrowError(ErrorCode.param, { message: 'id不能为空', status: 400 })
    await studentModel.findOneAndDelete({ studentId: id }).exec()
    resolveSuccessData(res)
  } catch (error) {
    next(error)
  }
})

module.exports = router