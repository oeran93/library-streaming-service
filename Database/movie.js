const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema({
  course_ID: String,
  name: String,
  semester: String,
  department: String,
  instructor: String,
  course_number: String,
  item_ID: {type: String, required: true},
  secret_token: String,
  jwmedia_ID: String,
  course_ID: String,
  current_status: String,
  call_number: String,
  title: {type: String, required: true},
  author: String,
  publisher: String,
  pub_place: String,
  pub_date: String,
  Edition: String,
  ISXN: String,
  ESPN_number: String,
  DOI: String,
  article_title: String,
  shelf_location: String,
  document_type: String,
  item_format: String
})

module.exports = mongoose.model('Movie', Movie, 'Movie')
