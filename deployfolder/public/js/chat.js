window.onload = function() {
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
}
