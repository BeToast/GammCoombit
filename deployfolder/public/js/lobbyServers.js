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
const testserver = database.ref("/lobbybase/testserver");
const defboard = "OOOObRbKOOOObBbRwRwBOOOOwKwROOOOWW";
const defmove = "ffff";

function resetlobbybase(){
    for(var i = 1; i < 6; i++){
        firebase.database().ref('lobbybase/server'+i+'').set({
            white: "",
            black: "",
            board: "OOOObRbKOOOObBbRwRwBOOOOwKwROOOOWW",
            move: "ffff"
        });
        firebase.database().ref('lobbybase/server'+i+'spec').remove();
    }
}

function joingame(server, color){
    var user = firebase.auth().currentUser;
    if(user!==null&&user!==undefined){
        if(color === "white" || color === "black"){
            var rat = document.getElementById(color+server).innerHTML.trim();
            if(rat === "Join White" || rat === "Join Black"){
                firebase.database().ref('lobbybase/server'+server+'/'+color).set(user.displayName);
                window.location.href = 'server'+server+'.html';
            }else{
                document.getElementById("lobbyalert").innerHTML = `
                <div class="col">
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Whoops!</strong> There is already a player on that team.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                </div>
                `;
            }
        }else if(color==="spec"){
            /*
            const newSpec = {
                spec: user.displayName
            };
            firebase.database().ref('lobbybase/server'+server+'spec').push(newSpec);
            window.location.href = 'server'+server+'.html';  
        */
        }
    }else{
        checkUser();
    }
}

//lobbybase update listeners
server1white.on("value", (white) => {
    var rat = document.getElementById("white1");
    if(white.val() === ""){
        rat.innerHTML = "Join White";
    }else{
        rat.innerHTML = "@"+white.val();
    }
    server1black.once("value", (black) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server1/board').set(defboard);
            database.ref('lobbybase/server1/move').set(defmove);
        }
    });
});
server1black.on("value", (black) => {
    var rat = document.getElementById("black1");
    if(black.val() === ""){
        rat.innerHTML = "Join Black";
    }else{
        rat.innerHTML = "@"+black.val();
    }
    server1white.once("value", (white) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server1/board').set(defboard);
            database.ref('lobbybase/server1/move').set(defmove);
        }
    });
});

server2white.on("value", (white) => {
    var rat = document.getElementById("white2");
    if(white.val() === ""){
        rat.innerHTML = "Join White";
    }else{
        rat.innerHTML = "@"+white.val();
    }
    server2black.once("value", (black) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server1/board').set(defboard);
            database.ref('lobbybase/server1/move').set(defmove);
        }
    });
});
server2black.on("value", (black) => {
    var rat = document.getElementById("black2");
    if(black.val() === ""){
        rat.innerHTML = "Join Black";
    }else{
        rat.innerHTML = "@"+black.val();
    }    
    server2white.once("value", (white) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server2/board').set(defboard);
            database.ref('lobbybase/server2/move').set(defmove);
        }
    });    
});

server3white.on("value", (white) => {
    var rat = document.getElementById("white3");
    if(white.val() === ""){
        rat.innerHTML = "Join White";
    }else{
        rat.innerHTML = "@"+white.val();
    }  
    server3black.once("value", (black) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server3/board').set(defboard);
            database.ref('lobbybase/server3/move').set(defmove);
        }
    });  
});
server3black.on("value", (black) => {
    var rat = document.getElementById("black3");
    if(black.val() === ""){
        rat.innerHTML = "Join Black";
    }else{
        rat.innerHTML = "@"+black.val();
    }    
    server3white.once("value", (white) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server3/board').set(defboard);
            database.ref('lobbybase/server3/move').set(defmove);
        }
    });
});

server4white.on("value", (white) => {
    var rat = document.getElementById("white4");
    if(white.val() === ""){
        rat.innerHTML = "Join White";
    }else{
        rat.innerHTML = "@"+white.val();
    }
    server4black.once("value", (black) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server4/board').set(defboard);
            database.ref('lobbybase/server4/move').set(defmove);
        }
    });        
});
server4black.on("value", (black) => {
    var rat = document.getElementById("black4");
    if(black.val() === ""){
        rat.innerHTML = "Join Black";
    }else{
        rat.innerHTML = "@"+black.val();
    }
    server4white.once("value", (white) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server4/board').set(defboard);
            database.ref('lobbybase/server4/move').set(defmove);
        }
    });
});

server5white.on("value", (white) => {
    var rat = document.getElementById("white5");
    if(white.val() === ""){
        rat.innerHTML = "Join White";
    }else{
        rat.innerHTML = "@"+white.val();
    }
    server5black.once("value", (black) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server5/board').set(defboard);
            database.ref('lobbybase/server5/move').set(defmove);
        }
    });       
});
server5black.on("value", (black) => {
    var rat = document.getElementById("black5");
    if(black.val() === ""){
        rat.innerHTML = "Join Black";
    }else{
        rat.innerHTML = "@"+black.val();
    }
    server5white.once("value", (white) => {
        if(white.val()===""&&black.val()===""){
            database.ref('lobbybase/server5/board').set(defboard);
            database.ref('lobbybase/server5/move').set(defmove);
        }
    });      
});