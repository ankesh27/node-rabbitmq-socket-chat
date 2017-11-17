var chatSocket = io('/chat')

$(document).ready(function() {
  $('#modal').modal('show')
})

$('#chatNameForm').on('submit', function(e) {
  e.preventDefault()
  var name = $('#chatName').val()
  
  $('#name').val(name)
  getMessages()
})

function updateFeed (message, method) {
  var newMessage = '<div><p>' + JSON.stringify(message) + '</p></div>'
  
  
  
  if (method === 'append') {
    $('.response_data').append(newMessage)
  } else if (method === 'prepend') {
    $('.response_data').prepend(newMessage)
  } 
}

function getMessages() {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: '/api/chat',
    success: function(response) {
      if (response.messages) {
        response.messages.reverse().map(function(message){
          updateFeed(message, 'prepend')
          $('#modal').modal('hide')
        })
      } else {
        $('#modal').modal('hide')
      }
      
      chatSocket.on('chat', function(message) {
        message = JSON.parse(message)
        updateFeed(message, 'append')
      })
    }
  })
}

$('#messageForm').on('submit', function(e) {
  e.preventDefault()
  var data = $('#messageForm').serialize()
  $.ajax({
    type: 'POST',
    url: '/api/chat',
    processData: false,
    data: data
  })
})
