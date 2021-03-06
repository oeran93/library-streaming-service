const sql      = require('mssql');
const env = process.env

module.exports = function () {

  let pub = {}

  let config = {
    server   : env.LSS_EXTERNAL_DB_HOST,
    user     : env.LSS_EXTERNAL_DB_USERNAME,
    password : env.LSS_EXTERNAL_DB_PASSWORD
  }

  pub.get_movie = function (movie_id) {
    return new Promise ((resolve, reject) => {
      sql.connect(config, (err) => {
        new sql.Request()
        .input('itemID', sql.Int, movie_id)
        .query("SELECT ItemID, Title, Items.Description, Author, PubDate, Items.CourseID AS AresCourseID, Courses.Name AS CourseName, Courses.Semester, Courses.Instructor FROM Items JOIN Courses ON Items.CourseID = Courses.CourseID WHERE ItemID = @itemID")
        .then(resolve)
        .catch(reject)
      })
    })
  }

  return pub

}