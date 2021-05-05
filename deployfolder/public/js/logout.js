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