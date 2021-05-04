function verifyemail()
{
	firebase.auth().onAuthStateChanged(function(user) {
		if(user != null){
		user.sendEmailVerification().then(function() {
			// Email sent.
		}).catch(function(error) {
			alert(error.message);
		});
		}
		else{
			alert('Oops you aren\'t logged in');
		}
	});
}

function confirmverify()
{
	firebase.auth().onAuthStateChanged(function(user) {
		if(user != null){
			if(user.emailVerified){
				alert('Email succesfully verified');
				window.location.href = 'index.html'
			}
			else{
				alert('Email has not been verified, try again');
			}
		}
	});
}