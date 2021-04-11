function login()
{
    let email = document.getElementById('emailField').value
    let password = document.getElementById('passwordField').value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // If successful redirect to a secure page
            window.location.href = "Board.html"
            console.log(user);
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}
