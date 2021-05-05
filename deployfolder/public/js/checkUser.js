function checkUser()
{
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {	
			var emailVerified = user.emailVerified;
			if(!emailVerified)
			{
				window.location.href = 'verification.html'
			}
		} else {
			//console.log('login not working :(');
			window.location.href = 'index.html'
		}
	});
}