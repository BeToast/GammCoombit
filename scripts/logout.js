function logout()
{
	firebase.auth().signOut().then(() => {
			// Sign-out successful.
			window.location.href = "login.html"
		}).catch((error) => {
			// An error happened.
		});

}