
function passwordReset(){
	var auth = firebase.auth();
	var emailAddress = document.getElementById('emailField').value

	auth.sendPasswordResetEmail(emailAddress).then(function() {
	alert('Reset password email has been sent. Please check your email.');
	}).catch(function(error) {
	alert('Could not send password reset email');
	});
}