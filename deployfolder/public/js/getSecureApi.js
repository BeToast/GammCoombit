function getSecureApi(){
	firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log(firebase.auth().currentUser);
        } else {
            // No user is signed in.
        }
    });
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://us-central1-ourgame-c7b54.cloudfunctions.net/authorizedendpoint');

// Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK|| xhr.status == 304) {
				console.log('Token successful');
            }
        } else {
            console.log('Error: ' + xhr.status); // An error occurred during the request.
			window.location.href = "login.html"
        }
    };
    // Set the Authorization header
    xhr.setRequestHeader('Authorization', 'Bearer ' + getCookie('accessToken'))
    xhr.send(null);
}

// W3C Schools
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
