const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp();

exports.authorizedendpoint = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        console.log('Check if request is authorized with Firebase ID token');
        if ((!request.headers.authorization || !request.headers.authorization.startsWith('Bearer '))) {
            console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
                'Make sure you authorize your request by providing the following HTTP header:',
                'Authorization: Bearer <Firebase ID Token>');
            response.status(403).send('Unauthorized');
            return;
        }
        let idToken;
        if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
            console.log('Found "Authorization" header');
            // Read the ID Token from the Authorization header.
            idToken = request.headers.authorization.split('Bearer ')[1];
        } else {
            // No cookie
            response.status(403).send('Unauthorized');
            return;
        }

        try {
            const decodedIdToken = admin.auth().verifyIdToken(idToken).then((token) => {
                console.log('ID Token correctly decoded', token);
				response.status(200).send("Welcome to the secure section " + token);

            });
        } catch (error) {
            console.error('Error while verifying Firebase ID token:', error);
            response.status(403).send('Unauthorized');
            return;
        }
    });
});
/*
const database = firebase.database();
const server1white = database.ref("/lobbybase/server1/white");
const server1black = database.ref("/lobbybase/server1/black");
const server2white = database.ref("/lobbybase/server2/white");
const server2black = database.ref("/lobbybase/server2/black");
const server3white = database.ref("/lobbybase/server3/white");
const server3black = database.ref("/lobbybase/server3/black");
const server4white = database.ref("/lobbybase/server4/white");
const server4black = database.ref("/lobbybase/server4/black");
const server5white = database.ref("/lobbybase/server5/white");
const server5black = database.ref("/lobbybase/server5/black");
const defboard = "OOOObRbKOOOObBbRwRwBOOOOwKwROOOOWW";
const defmove = "ffff";


server1white.on("value", (white) => {
    server1black.once("value", (black) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server1/board').set(defboard);
            database.ref('lobbybase/server1/move').set(defmove);
        }
    });
});
server1black.on("value", (black) => {
    server1white.once("value", (white) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server1/board').set(defboard);
            database.ref('lobbybase/server1/move').set(defmove);
        }
    });
});

server2white.on("value", (white) => {
    server2black.once("value", (black) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server1/board').set(defboard);
            database.ref('lobbybase/server1/move').set(defmove);
        }
    });
});
server2black.on("value", (black) => {
    server2white.once("value", (white) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server2/board').set(defboard);
            database.ref('lobbybase/server2/move').set(defmove);
        }
    });
});

server3white.on("value", (white) => {
    server3black.once("value", (black) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server3/board').set(defboard);
            database.ref('lobbybase/server3/move').set(defmove);
        }
    });
});
server3black.on("value", (black) => {
    server3white.once("value", (white) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server3/board').set(defboard);
            database.ref('lobbybase/server3/move').set(defmove);
        }
    });
});

server4white.on("value", (white) => {
    server4black.once("value", (black) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server4/board').set(defboard);
            database.ref('lobbybase/server4/move').set(defmove);
        }
    });
});
server4black.on("value", (black) => {
    server4white.once("value", (white) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server4/board').set(defboard);
            database.ref('lobbybase/server4/move').set(defmove);
        }
    });
});

server5white.on("value", (white) => {
    server5black.once("value", (black) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server5/board').set(defboard);
            database.ref('lobbybase/server5/move').set(defmove);
        }
    });
});
server5black.on("value", (black) => {
    server5white.once("value", (white) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server5/board').set(defboard);
            database.ref('lobbybase/server5/move').set(defmove);
        }
    });
});
*/