//window.onload = function(){
  //create 2d array to be the boardState
  var defaultBoard = new Array(4);
  for(var i = 0; i < 4; i++){
      defaultBoard[i] = new Array(4);
  }
  defaultBoard[0][0] = "O";
  defaultBoard[0][1] = "O";
  defaultBoard[0][2] = "bR";
  defaultBoard[0][3] = "bK";
  defaultBoard[1][0] = "O";
  defaultBoard[1][1] = "O";
  defaultBoard[1][2] = "bB";
  defaultBoard[1][3] = "bR";
  defaultBoard[2][0] = "wR";
  defaultBoard[2][1] = "wB";
  defaultBoard[2][2] = "O";
  defaultBoard[2][3] = "O";
  defaultBoard[3][0] = "wK";
  defaultBoard[3][1] = "wR";
  defaultBoard[3][2] = "O";
  defaultBoard[3][3] = "O";

  var chessBoard = document.getElementById("chessBoard");
  for (var i=3; i>=0; i--){
    var row = chessBoard.appendChild(document.createElement("div"));
    for (var j=0; j<=3; j++){
      square = document.createElement("span");
      square.id = generateId(i, j);
      var tempClass = defaultBoard[i][j];
      square.className = tempClass;
      square.setAttribute("ondrop","drop_handler(event)");
      square.setAttribute("ondragover","dragover_handler(event)");
      if(tempClass==="wR"||tempClass==="bR"||tempClass==="wK"||tempClass==="bK"||tempClass==="wB"||tempClass==="bB"){
        square.setAttribute("draggable", "true");
        square.setAttribute("onDragStart", "dragstart_handler(event)");
      }else{
        square.className = "O";
      }
      row.appendChild(square);
    }
  }
  function dragstart_handler(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop_handler(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var prev = document.getElementById(data);
    ev.target.className = prev.className;
    ev.target.setAttribute("draggable","true");
    ev.target.setAttribute("onDragStart", "dragstart_handler(event)");
    prev.className = "O";
    prev.removeAttribute("draggable");
    prev.removeAttribute("onDragStart");
  }

  function dragover_handler(ev) {
    ev.preventDefault();
  }

function generateId (i, j) {
    var id = "";
    switch(j) {
        case 0:
            return(id = ("a"+(i+1)+""));
        case 1:
            return(id = ("b"+(i+1)+""));
        case 2:
            return(id = ("c"+(i+1)+""));
        case 3:
            return(id = ("d"+(i+1)+""));
    }
}
function settings() {
    document.getElementById("nav-link1").style.display = "active";
}

function off() {
    document.getElementById("chessBoard").style.display = "none";
}
var firebaseConfig = {
  apiKey: "AIzaSyAgH3rk-JsYHUGzNBBOLxdrVEW5ZO2KCO8",
  authDomain: "ourgame-c7b54.firebaseapp.com",
  databaseURL: "https://ourgame-c7b54.firebaseio.com",
  projectId: "ourgame-c7b54",
  storageBucket: "ourgame-c7b54.appspot.com",
  messagingSenderId: "831553997906",
  appId: "1:831553997906:web:84333aedfbf82e1d1f238b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let email = "";
let name = "";
const msgScreen = document.getElementById("messages");
const msgForm = document.getElementById("messageForm");
const msgInput = document.getElementById("msg-input");
const msgBtn = document.getElementById("msg-btn");

const db = firebase.database();
const msgRef = db.ref("/msgs"); //save in msgs folder in database

function init(){
    msgForm.addEventListener('submit', sendMessage);
    msgRef.on('child_added', updateMsgs);
}
const updateMsgs = data =>{

  const {email: userEmail , name, text} = data.val();
  var outputText = text;
 
  //load messages
  const msg = `<li class="${email == userEmail ? "msg my": "msg"}"><span class = "msg-span">
    <i class = "name">${name}: </i>${outputText}
    </span>
  </li>`
  msgScreen.innerHTML += msg;
  document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight;
  //auto scroll to bottom
}

function sendMessage(e){
  e.preventDefault();
  const text = msgInput.value;

    if(!text.trim()) return alert('Palese tpye yuor mesagse.'); //no msg submitted
    const msg = {
        text: text
    };

    msgRef.push(msg);
    msgInput.value = "";

}
document.addEventListener('DOMContentLoaded',init);

