const input = document.getElementById("input");
const button = document.getElementById("sendButton");
const chat = document.getElementById("chat");

const nameInput = document.getElementById("nameInput");
const saveName = document.getElementById("saveName");

const template = "<li class=\"list-group-item\">%MESSAGE</li>";
const messages = [];

const socket = io();
let userName = "";

saveName.onclick = () => {
  const name = nameInput.value;
  if (name !== "") {
    userName = name;
  }
};

input.onkeydown = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
};

button.onclick = () => {
  const text = input.value;
  if (userName && text !== "") {
    socket.emit("message", {
      name: userName,
      text: text
    });
    input.value = "";
  }
};

socket.on("chat", (message) => {
  console.log(message);
  messages.push(message);
  render();
})
socket.on("list", (users) => {
  const userListElement = document.getElementById("userList");
  userListElement.innerHTML = '';
  users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = user.name;
      userListElement.appendChild(li);
  });
});

const render = () => {
  let html = "";
  messages.forEach((message) => {
      const row = template.replace("%MESSAGE", message);
      html += row;
  });
  chat.innerHTML = html;
  window.scrollTo(0, document.body.scrollHeight);
}