const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp();

exports.getcomments = functions.https.onRequest((request, response) => {

		// 1. Connect to our Firestore database
		cors(request, response, () => {
			
			let myData = []
			return admin.firestore().collection('comments').orderBy("timestamp", "asc").get().then((snapshot) => {

						if (snapshot.empty) {
								console.log('No matching documents.');
								response.send('No data in database');
								return;
						}
						
						snapshot.forEach((doc) => {
								let docObj = {};
								docObj.id = doc.id;
								myData.push(Object.assign(docObj, doc.data()));
						});
						
						// 2. Send data back to client
						response.send(myData);
					})
			})
}); 

exports.postcomments = functions.https.onRequest((request, response) => {
	
	console.log("Request body", request.body);
	cors(request, response, () => {
		// your function body here - use the provided req and res from cors
		
		//Create a timestamp to add to the comment document
		const currentTime = admin.firestore.Timestamp.now();
		request.body.timestamp = currentTime;
		
		admin.firestore().collection('comments').add(request.body).then(()=>{
			response.send("Saved in the database");
		});
	})
});