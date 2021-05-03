//POST comments
function postComment() {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://us-central1-ourgame-c7b54.cloudfunctions.net/postcomments');
	
	xhr.setRequestHeader("Content-type", "application/json");
	// Track the state changes of the request.
	xhr.onreadystatechange = function () {
		var DONE = 4; // readyState 4 means the request is done.
		var OK = 200; // status 200 is a successful return.
		if (xhr.readyState === DONE) {
			if (xhr.status === OK) {
				getComments(); // 'Call get comments to retrieve the latest'
			} else {
				console.log('Error: ' + xhr.status); //An error occurred during the request.
			}
		}
	};
	
	xhr.send(JSON.stringify({"user": document.getElementById('user').value, "comment": document.getElementById('comment').value}));
	}