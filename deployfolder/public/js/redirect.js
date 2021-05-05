const msgBtn = document.getElementById("logout-button");

function init() {
	msgBtn.addEventListener('click', logout);
}
function logout() {
			window.location.href = "lobby.html";
	
}

function lobby() {
	window.location.href = "lobby.html";

}
document.addEventListener('DOMContentLoaded',init);