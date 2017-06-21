$('.upload-btn').on('click', function (){
    $('#upload-input').click()
    $('.progress-bar').text('0%')
    $('.progress-bar').width('0%')
})

$('#upload-input').on('change', function(){
  var files = $(this).get(0).files
  if (files.length <= 0) return
  var formData = new FormData()
  for (var i = 0 ; i < files.length; i++) {
    formData.append('uploads[]', files[i], files[i].name)
  }
  upload_video(formData)
  register_video(files)
})

function upload_video (formData) {
  $.ajax({
    url:'/videos/upload',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: (data) => {
      $('.list_videos_btn').toggle()
    },
    xhr: () => {
      var xhr = new XMLHttpRequest()
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          var percentComplete = Math.round((evt.loaded / evt.total)*100)
          $('.progress-bar').text(percentComplete + '%')
          $('.progress-bar').width(percentComplete + '%')
          if (percentComplete === 100) $('.progress-bar').html('Done')
        }
      }, false)
      return xhr
    }
  })
}

function register_video (files) {
  for (var i = 0 ; i < files.length; i++) {
    let name = files[0].name.match(/[0-9]+/i)[0]
    $.ajax({
      url:'/videos/create',
      type: 'post',
      data: {id: name},
      success: (data) => {
        $('.message-bar').hide()
        if (!data.err) {
            $('#success-bar').text(`We found item ${name} in our records`)
            $('#success-bar').show()
        }
        else {
          $('#error-bar').text(`We did not find item ${name} in our records.`)
          $('#error-bar').show()
        }
      }
    })
  }
}
