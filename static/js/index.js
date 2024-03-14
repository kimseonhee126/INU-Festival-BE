const socket = io()

/* 서버로부터 데이터 받은 경우 */
socket.on('update', function(data) {
  // 받은 데이터(메세지)를 화면에 표시
  const chat = document.getElementById('chat')
  const message = document.createElement('div')
  const node = document.createTextNode(`${data.emoji}:${data.studentId}: ${data.content}`)

  message.classList.add('me')
  message.appendChild(node)
  chat.appendChild(message)
})

/* 메시지 전송 함수 */
function send() {
  // 입력되어있는 데이터 가져오기
  var content = document.getElementById('test').value
  
  // 가져왔으니 데이터 빈칸으로 변경
  document.getElementById('test').value = ''

  fetch("http://localhost:4000/shout/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      content: content,
      emoji: "happy",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // 내가 전송할 메시지 클라이언트에게 표시
      let chat = document.getElementById('chat')
      let msg = document.createElement('div')
      let node = document.createTextNode(`${data.emoji}: ${data.studentId}: ${data.content}`)
      msg.classList.add('me')
      msg.appendChild(node)
      chat.appendChild(msg)
      // 서버로 message 이벤트 전달 + 데이터와 함께
      socket.emit('message', data)
    })
    .catch((error) => console.error("Error:", error));
}