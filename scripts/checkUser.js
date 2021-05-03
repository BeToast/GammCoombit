function checkUser()
{
	var user = firebase.auth().currentUser;
	var emailVerified;
	if (user) {	
		emailVerified = user.emailVerified;
		if(!emailVerified)
		{
			window.location.href = 'verification.html'
		}
	} else {
		window.location.href = 'LoginPage.html'
	}
}