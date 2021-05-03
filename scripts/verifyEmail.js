function verifyEmail()
{
	var user = firebase.auth().currentUser;
	if(user != null){
	user.sendEmailVerification().then(function() {
		// Email sent.
	}).catch(function(error) {
		alert(error.message);
	});
}
	else{
		alert('We fucked up you aint logged in boi');
	}
	
}