//const msgButton = document.getElementById("logout-button");
//function init() {
//	msgButton.addEventListener("click", logout);
//}
function logout() {
	firebase.auth().signOut().then(() => {
			// Sign-out successful.
			document.cookie = "accessToken= ";
			window.location.href = "index.html"
		}).catch((error) => {
			// An error happened.
		});
}
document.addEventListener('DOMContentLoaded',init);