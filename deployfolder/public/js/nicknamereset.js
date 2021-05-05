function nicknameReset()
{
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			user.updateProfile({
				displayName: document.getElementById("nicknameField").value
			})
		} else {
			//console.log('login not working :(');
			alert('Not logged in');
		}
	});
}