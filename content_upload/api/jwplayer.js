const external_db = require('../../database/external_db.js')()
const Video = require('../../database/video.js')
const _ = require('underscore')
const sha1 = require('sha1')
const env = process.env
const jwtools = require('jwplayer-node')({api_key: env.LSS_JWPLAYER_API_KEY, api_secret: env.LSS_JWPLAYER_API_SECRET})

module.exports = {

	create_video: function (req, res) {
    external_db.get_movie(req.body.id)
    .then(records => {
			if (!records[0]) {
				res.json({err: true})
			} else {
				Video.findOne({itemID: records[0].ItemID}, (err, video) => {
						jwtools.call_api({
							method: "post",
							path: "/v1/videos/delete"
						}, {
							video_key: video ? video.mediaID : "XXXXXXXX"
						})
						.then(data => {
							jwtools.call_api({
								method: 'post',
								path: '/v1/videos/create'
							},{
								title: records[0].ItemID,
								sourcetype: 'url',
								sourceformat: 'mp4',
								sourceurl: `rtmp://${env.WOWZA_SERVER}/reserves/${req.body.id}.mp4`
							})
							.then(data => {
								Video.update(
									{itemID: records[0].ItemID},
									{
										itemID: req.body.id,
										mediaID: data.data.video.key,
										obfuscated_itemID: sha1(req.body.id),
										title: records[0].Title,
										subtitles: records[0].Subtitles,
										ares_course_ID: records[0].AresCourseID,
										course_name: records[0].CourseName,
										semester: records[0].Semester,
										instructor: records[0].Instructor
									},
									{upsert: true},
									(err) => {
										if (err) res.status(500)
										res.send({})
									})
							}).catch(err => console.log('jwplayer upload err: ', err))
						}).catch(err => console.log(err))
			    })
				}
			}).catch(err => console.log('external_db err: ', err))
  },

	delete_video: function (req,res) {
		jwtools.call_api({
			method: "post",
			path: "/v1/videos/delete"
		},{
			video_key: ""+req.body.video_key+""
		})
		.then(data => {console.log(data);res.send({error: false})} )
		.catch(data => {console.log(data); res.send({error: true})} )
	}

}
