function register()
{
    let email = document.getElementById('emailField').value;
    let password = document.getElementById('passwordField').value;
    let nickname = document.getElementById("nicknameField").value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
		user.updateProfile({
            displayName: nickname
        });
		window.location.href = "index.html"
	}).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
}

