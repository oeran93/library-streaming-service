var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Video = new Schema({
  itemID: {type: String, required: true, unique: true},
  mediaID: {type: String, required: true, unique: true},
  obfuscated_itemID: {type: String, required: true, unique: true},
  title: String,
  ares_course_ID: String,
  course_name: String,
  semester: String,
  instructor: String
})

module.exports = mongoose.model('Video', Video, 'Video')