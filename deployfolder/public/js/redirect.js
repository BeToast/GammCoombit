const msgBtn = document.getElementById("logout-button");

function init() {
	msgBtn.addEventListener('click', logout);
}
function logout() {
			window.location.href = "login.html";
	
}
document.addEventListener('DOMContentLoaded',init);