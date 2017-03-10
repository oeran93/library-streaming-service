var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Video = new Schema({
  itemID: {type: String, required: true},
  mediaID: {type: String, required: true},
  obfuscated_itemID: {type: String, required: true},

})

module.exports = mongoose.model('Video', Video, 'Video')
