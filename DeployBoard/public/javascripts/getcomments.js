// GET comments
function getComments()
{
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://us-central1-ourgame-c7b54.cloudfunctions.net/getcomments');

// Track the state changes of the request.
xhr.onreadystatechange = function () {
	var DONE = 4; // readyState 4 means the request is done.
	var OK = 200; // status 200 is a successful return.
	if (xhr.readyState == DONE) {
		if (xhr.status == OK) {
			var sHTML = "";
			var data = JSON.parse(xhr.responseText);
			for(var i=0; i<data.length; i++)
			{
			sHTML += "<p>" + data[i].user+": " + data[i].comment+ "</p>";
			}
		comments.innerHTML = sHTML;
		} else {
			console.log('Error: ' + xhr.status); // An error occurred during the request.
		}}};
// Send the request to https://us-central1-my-web-app-620f9.cloudfunctions.net/getcomments
xhr.send(null);
}
//Invokes getComments every minute
//setInterval(getComments, 60000);