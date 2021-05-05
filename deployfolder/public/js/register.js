function register()
{
    let email = document.getElementById('emailField').value
    let password = document.getElementById('passwordField').value
    firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(function(user){
		user.updateProfile({
        displayName: document.getElementById("nicknameField").value
    })
	}
        return result.user.updateProfile({
			displayName: document.getElementById("nicknameField").value
        })
		window.location.href = "login.html"
	})
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}

