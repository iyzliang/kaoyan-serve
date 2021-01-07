const mongoose = require('mongoose')
const db = require('./db')

const IdsScheam = new mongoose.Schema({
  model: String,
  count: Number
})

IdsScheam.statics = {
  get_id_by_model: async function (model) {
    try {
      const idItem = await this.findOne({ model }).exec()
      if (idItem) {
        const newItem = await this.updateOne(({ _id: idItem._id }), { count: idItem.count + 1 })
        return idItem.count + 1
      } else {
        const m = new this({
          model,
          count: 1
        })
        const newItem = await m.save()
        return newItem.count
      }
    } catch (error) {
      throw error
    }
  }
}

const IdsModel = db.model('Id', IdsScheam)

module.exports = IdsModel
