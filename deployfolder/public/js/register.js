function register()
{
    let email = document.getElementById('emailField').value;
    let password = document.getElementById('passwordField').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            user.updateProfile({displayName: document.getElementById("nicknameField").value}).then(() => {
                // If successful redirect to a secure page
			    document.cookie = "accessToken=" + user.za;
                window.location.href = "verification.html";
            });  
        })
        .catch((error) => {
            alert(error.message);
        });
	}).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
}

