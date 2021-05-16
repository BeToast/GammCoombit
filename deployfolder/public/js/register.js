function register()
{
    let email = document.getElementById('emailField').value
    let password = document.getElementById('passwordField').value
    firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(function(user){
		var user = firebase.auth().currentUser;
		user.updateProfile({
        displayName: document.getElementById("nicknameField").value
    });
		window.location.href = "index.html"
	}).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}

