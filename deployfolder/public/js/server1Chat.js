  firebase.initializeApp( {
    apiKey: "AIzaSyAgH3rk-JsYHUGzNBBOLxdrVEW5ZO2KCO8",
    authDomain: "ourgame-c7b54.firebaseapp.com",
    databaseURL: "https://ourgame-c7b54.firebaseio.com",
    projectId: "ourgame-c7b54",
    storageBucket: "ourgame-c7b54.appspot.com",
    messagingSenderId: "831553997906",
    appId: "1:831553997906:web:84333aedfbf82e1d1f238b"
  });
  let email = "";
  let username = "";
  firebase.auth().onAuthStateChanged(function(user) {
		if (user) {	
			email = user.email;
			username = user.displayName;
		} else {
			
		}
	});
  const msgScreen = document.getElementById("messages");
  const msgForm = document.getElementById("messageForm");
  const msgInput = document.getElementById("msg-input");
  const msgBtn = document.getElementById("msg-btn");

  const db = firebase.database();
  const msgRef = db.ref("/server1Chat");

  function init() {
      msgBtn.addEventListener("click", sendMessage);
      msgRef.on('child_added', updateMsgs);
  }
  const updateMsgs = data => {
    const {email:userEmail,username, text} = data.val();
    var outputText = text;
    const msg = `<li class="${email == userEmail ? "msg my": "msg"}"><span class = "msg-span">
      <i class = "name">${username}: </i>${outputText}
      </span>
    </li>`
    msgScreen.innerHTML += msg;
    document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight;
  }

  function sendMessage(e) {
    e.preventDefault();
    const text = msgInput.value;
      if(!text.trim()) return;
        const msg = {
		    email,
		    username,
        text: text
      };
      msgRef.push(msg);
      msgInput.value = "";
  }

  function getUserName(){
    return username;
  }
  document.addEventListener('DOMContentLoaded',init);

