function register()
{
    let email = document.getElementById('emailField').value
    let password = document.getElementById('passwordField').value
    firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(function(result) {
		window.location.href = "LoginPage.html"
        return result.user.updateProfile({
			displayName: document.getElementById("nicknameField").value
        })
	})
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}

