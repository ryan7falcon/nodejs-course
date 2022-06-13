const socket = io()

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.on('message', (message) => {
  console.log(message)
  const { text, createdAt } = message
  const html = Mustache.render(messageTemplate, { username: message.username, text, createdAt: moment(createdAt).format('h:mm a') })
  $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (message) => {
  console.log(message)
  const { url, createdAt } = message
  const html = Mustache.render(locationTemplate, { username: message.username, url, createdAt: moment(createdAt).format('h:mm a') })
  $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('roomData', ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  })

  document.querySelector('#sidebar').innerHTML = html
})

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault()

  $messageFormButton.setAttribute('disabled', 'disabled')

  const msg = e.target.elements.message.value
  socket.emit('sendMessage', msg, (error) => {
    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()

    if (error) {
      return console.log(error)
    }
    return console.log('Message delivered!')
  })
})

$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('geolocation is not supported by your browser')
  }
  $sendLocationButton.setAttribute('disabled', 'disbled')

  return navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position)
      const { latitude, longitude } = position.coords
      socket.emit(
        'sendLocation',
        { latitude, longitude },
        (message) => {
          console.log('Location was shared')
          $sendLocationButton.removeAttribute('disabled')
        },
      )
    },
    (error) => {
      console.log(error)
      $sendLocationButton.removeAttribute('disabled')
    },
    { timeout: 5000, enableHighAccuracy: false },
  )
})

socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error)
    location.href = '/'
  }
})
