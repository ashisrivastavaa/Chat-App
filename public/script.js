
    var socket = io();

    const sendBtn = document.getElementById('sendBtn');
    const messageInput = document.getElementById('message');
    const chatBox = document.getElementById("chat-box");

    // Ask username
    const username = prompt("Enter your name:") || "Anonymous";
    socket.emit("set-username", username);

    // Receive message
    socket.on("message", (data) => {
      const div = document.createElement('div');
      div.classList.add('msg');
      
      if (data.id === socket.id) {
        div.classList.add('me');
        div.textContent = "You: " + data.text;
      } else {
        div.classList.add('other');
        div.textContent = data.username + ": " + data.text;
      }

      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
    });

    // Send message
    function sendMessage() {
      const message = messageInput.value;
      if(message.trim() !== ""){
        socket.emit('user-message', message);
        messageInput.value = "";
      }
    }

    sendBtn.addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  