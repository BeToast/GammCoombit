const msgBtn = document.getElementById("logout-button");
function init() {
	msgbtn.addEventListener("click", logout);
}
function logout() {
	firebase.auth().signOut().then(() => {
			// Sign-out successful.
			document.cookie = "accessToken= ";
			window.location.href = "login.html"
		}).catch((error) => {
			// An error happened.
		});
}
document.addEventListener('DOMContentLoaded',init);