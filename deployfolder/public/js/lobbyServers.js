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

function resetlobbybase(){
    for(var i = 1; i < 6; i++){
        firebase.database().ref('lobbybase/server'+i+'').set({
            white: "",
            black: "",
            board: "OOOObRbKOOOObBbRwRwBOOOOwKwROOOOWW",
            move: "ffff"
        });
    }
}

function joingame(server, color){
    if(color === "white" || color === "black"){
        var rat = document.getElementById(color+server).innerHTML;
        if(rat === "Join White" || rat === "Join Black"){
            firebase.database().ref('lobbybase/server'+server+'/'+color).set(firebase.auth().currentUser.displayName);
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
    } else {
        window.location.href = 'server'+server+'.html';
    }
}

//lobbybase update listeners
server1white.on("value", (data) => {
    var rat = document.getElementById("white1");
    if(data.val() === ""){
        rat.innerHTML = "Join White";
    }else{
        rat.innerHTML = "@"+data.val();
    }
});
server1black.on("value", (data) => {
    var rat = document.getElementById("black1");
    if(data.val() === ""){
        rat.innerHTML = "Join Black";
    }else{
        rat.innerHTML = "@"+data.val();
    }
});

server2white.on("value", (data) => {
    var rat = document.getElementById("white2");
    if(data.val() === ""){
        rat.innerHTML = "Join White";
    }else{
        rat.innerHTML = "@"+data.val();
    }
});
server2black.on("value", (data) => {
    var rat = document.getElementById("black2");
    if(data.val() === ""){
        rat.innerHTML = "Join Black";
    }else{
        rat.innerHTML = "@"+data.val();
    }        
});

server3white.on("value", (data) => {
    var rat = document.getElementById("white3");
    if(data.val() === ""){
        rat.innerHTML = "Join White";
    }else{
        rat.innerHTML = "@"+data.val();
    }    
});
server3black.on("value", (data) => {
    var rat = document.getElementById("black3");
    if(data.val() === ""){
        rat.innerHTML = "Join Black";
    }else{
        rat.innerHTML = "@"+data.val();
    }    
});

server4white.on("value", (data) => {
    var rat = document.getElementById("white4");
    if(data.val() === ""){
        rat.innerHTML = "Join White";
    }else{
        rat.innerHTML = "@"+data.val();
    }        
});
server4black.on("value", (data) => {
    var rat = document.getElementById("black4");
    if(data.val() === ""){
        rat.innerHTML = "Join Black";
    }else{
        rat.innerHTML = "@"+data.val();
    }     
});

server5white.on("value", (data) => {
    var rat = document.getElementById("white5");
    if(data.val() === ""){
        rat.innerHTML = "Join White";
    }else{
        rat.innerHTML = "@"+data.val();
    }       
});
server5black.on("value", (data) => {
    var rat = document.getElementById("black5");
    if(data.val() === ""){
        rat.innerHTML = "Join Black";
    }else{
        rat.innerHTML = "@"+data.val();
    }      
});
/*
testserver.on('value', (data) => {
    var white = data.val().white;
    var black = data.val().black;
    var board = data.val().board;
});
*/
