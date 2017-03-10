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
    success: (data) => {},
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
    $.ajax({
      url:'/videos/create',
      type: 'post',
      data: {id: files[0].name.match(/[0-9]+/i)[0]},
      success: (data) => {}
    })
  }
}