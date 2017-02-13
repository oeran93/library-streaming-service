const mongoose = require('mongoose')
const env = process.env

module.exports = function () {
	const auth = `mongodb://${env.LSS_DB_USERNAME}:${env.LSS_DB_PASSWORD}@localhost/${env.LSS_DB_NAME}`
	mongoose.connect(auth,
		(err, res) => {
			if (err) {
				console.log(err.message);
			}
		}
	)	
}
