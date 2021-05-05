function login()
{
    let email = document.getElementById('emailField').value
    let password = document.getElementById('passwordField').value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // If successful redirect to a secure page
			document.cookie = "accessToken=" + user.za;
            window.location.href = "lobby.html"
            console.log(user);
            // ...
        })
        .catch((error) => {
            alert(error.message);
        });
}
