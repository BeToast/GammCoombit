var yourColor;
var opponentColor;
var whiteTurn = true;
var blackTurn = false;
var checkFrom = "";
var attackedSquares = [];
var gameInProgress = false;

const database = firebase.database();
const server1white = database.ref("/lobbybase/server1/white");
const server1black = database.ref("/lobbybase/server1/black");
const boardstring = database.ref("/lobbybase/server1/board")
const boardRef = database.ref("/Board1");
const boardRefLast = database.ref("/Board1").limitToLast(1);

server1white.on("value", (data) => {
    var rat = document.getElementById("whiteplayer");
    if(data.val() === ""){
        rat.innerHTML = "Waiting for white player...";
    }else{
        rat.innerHTML = "@"+data.val();
    }
    if(data.val()!=="" && document.getElementById("blackplayer").innerHTML !== "Waiting for black player..."){
        startGame();
    }
});
server1black.on("value", (data) => {
    var rat = document.getElementById("blackplayer");
    if(data.val() === ""){
        rat.innerHTML = "Waiting for black player...";
    }else{
        rat.innerHTML = "@"+data.val();
    }
    if(data.val()!=="" && document.getElementById("blackplayer").innerHTML !== "Waiting for white player..."){
        startGame();
    }
});

function sendMoveToServer(moveString){
    console.log("movestring: "+moveString+"");
    //TODO: call firebase function that runs recieveMoveFromServer(moveString) on other players client
	const move = moveString;
	const newMove = {
		move: move
	};
	boardRef.push(newMove);
    sendBoard();
}

function recieveMoveFromServer(){
	boardRefLast.on('child_added', (data) => {
        var moveString = data.val().move;
        console.log(moveString);
        if(((yourColor === "spec")||(yourColor==="white" && blackTurn)||(yourColor==="black" && whiteTurn))&&gameInProgress){
            var from = moveString.substring(0,2);
            var to = moveString.substring(2,4);
            document.getElementById(to).className = document.getElementById(from).className;
            document.getElementById(from).className = "OO";
            toggleTurn();
        }
    });
}

function startGame(){
    if(document.getElementById("whiteplayer").innerHTML==="@"+getUserName())
        yourColor="white";
    else if(document.getElementById("blackplayer").innerHTML==="@"+getUserName())
        yourColor="black";
    allowMove();
}

function sendBoard(){
    var string = ""
    for(var j=3; j>=0; j--){
        for(var i=1; i<=4; i++){
            string+=document.getElementById(generateId(i,j)).className;
        }
    }
    if(whiteTurn)
        string+='WW';
    else if(blackTurn)
        string+='BB';
    boardstring.set(string);
}

/*	
function joinWhite(){
    yourColor = "white";
    opponentColor = "black";
    waitingMenu(yourColor);
    //TODO: we need to add yourEmail=yourColor to the firebase database for current game
    //maybe store you are in a game with cookie so refresing doesnt end the game?
	startGame();
}
function joinBlack(){
    yourColor = "black";
    opponentColor = "white";
    waitingMenu(yourColor);
    //TODO: we need to add yourEmail=yourColor to the firebase database for current game
	startGame();
}
function joinRandom(){
    var h = Math.random();
    if(Math.random() < .5){
        yourColor = "white";
        opponentColor = "black";
    } else {
        yourColor = "black";
        opponentColor = "white";
    }
    waitingMenu(yourColor);
    //TODO: we need to add yourEmail=yourColor to the firebase database for current game
	startGame();
}
*/

function forceGameEnd(){
    if(opponentColor==="white"){
        sendMoveToServer(""+document.getElementsByClassName("wK")[0].id+"d4");
    }else if(opponentColor==="black"){
        sendMoveToServer(""+document.getElementsByClassName("bK")[0].id+"a1");
    }
}

function gameEnd(winner){
    gameInProgress = false;
    endMenu(winner);
    setTimeout(() => {
        boardRef.remove();
        boardstring.set("OOOObRbKOOOObBbRwRwBOOOOwKwROOOOWW");
        server1white.set("");
        server1black.set("");
        window.location.href = "lobby.html";
    },5000);
	
}

function toggleTurn(){
    allowMove(false);
    whiteTurn = !whiteTurn;
    blackTurn = !blackTurn;
    checkFrom = isCheck();
    getAttackedSquares();
    if(document.getElementById("a1").className === "bK")
        gameEnd("black");
    else if(document.getElementById("d4").className === "wK")
        gameEnd("white");
    //isCheckMate()
    allowMove(true);
    if(whiteTurn)  
        document.getElementById("moveinfo").innerHTML = "White to move.";
    else if(blackTurn)
        document.getElementById("moveinfo").innerHTML = "Black to move.";
}

function getAttackedSquares(){
    attackedSquares = [];
    var chessBoard = document.getElementById("chessBoard"), i = 0;
    if(whiteTurn){
        var R = chessBoard.getElementsByClassName("bR");
        var B = chessBoard.getElementsByClassName("bB");
    }else if(blackTurn) {
        var R = chessBoard.getElementsByClassName("wR");
        var B = chessBoard.getElementsByClassName("wB");
    }
    for(var index = 0; index < R.length; index++) {
        colVal = R[index].id.charCodeAt(0), rowVal = parseInt(R[index].id.charAt(1));
        attackedSquares[i] = (String.fromCharCode(colVal-1)+rowVal); i++;
        attackedSquares[i] = (String.fromCharCode(colVal+1)+rowVal); i++;
        attackedSquares[i] = (String.fromCharCode(colVal)+(rowVal-1)); i++;
        attackedSquares[i] = (String.fromCharCode(colVal)+(rowVal+1)); i++;        
    }
    if(B[0] !== undefined){
        colVal = B[0].id.charCodeAt(0), rowVal = parseInt(B[0].id.charAt(1));
        attackedSquares[i] = (String.fromCharCode(colVal-1)+(rowVal-1)); i++;
        attackedSquares[i] = (String.fromCharCode(colVal-1)+(rowVal+1)); i++;
        attackedSquares[i] = (String.fromCharCode(colVal+1)+(rowVal-1)); i++;
        attackedSquares[i] = (String.fromCharCode(colVal+1)+(rowVal+1)); i++;
    }
}

function makeDropabble(el, pieceColor){
    if(el.className.charAt(0) !== pieceColor){
      el.setAttribute("ondrop","drop_handler(event)");
      el.setAttribute("ondragover","dragover_handler(event)");
      el.classList.add("moveable");
    }
}

function resetDroppable(){
    var chessBoard = document.getElementById("chessBoard");
    var el = new Array(16);
    var el = chessBoard.getElementsByTagName("span");
    for(var i = 0; i <= 15; i++){
        el[i].removeAttribute("ondrop");
        el[i].removeAttribute("ondragover");
        el[i].classList.remove("moveable");
    }
}

function allowMove(bool){
    //if your white and white turn
    if(whiteTurn && (yourColor === "white")){
        var R = chessBoard.getElementsByClassName("wR");
        for(var index = 0; index < R.length; index++) {
            R[index].setAttribute("draggable",bool);
            R[index].setAttribute("onDragStart", "dragstart_handler(event)");
        }
        var B = chessBoard.getElementsByClassName("wB");
        if(B.length !== "0" && B[0] !== undefined){
            B[0].setAttribute("draggable",bool);
            B[0].setAttribute("onDragStart", "dragstart_handler(event)");
        }
        var K = chessBoard.getElementsByClassName("wK");
        K[0].setAttribute("draggable",bool);
        K[0].setAttribute("onDragStart", "dragstart_handler(event)");
    //if your black and black turn
    }else if(blackTurn && (yourColor === "black")) {
        var R = chessBoard.getElementsByClassName("bR");
        for(var index = 0; index < R.length; index++) {
            R[index].setAttribute("draggable",bool);
            R[index].setAttribute("onDragStart", "dragstart_handler(event)");
        }
        var B = chessBoard.getElementsByClassName("bB");
        if(B.length !== "0" && B[0] !== undefined){
            B[0].setAttribute("draggable",bool);
            B[0].setAttribute("onDragStart", "dragstart_handler(event)");
        }
        var K = chessBoard.getElementsByClassName("bK");
        K[0].setAttribute("draggable",bool);
        K[0].setAttribute("onDragStart", "dragstart_handler(event)");
    }
}

function isAttacked(square){
    if(whiteTurn && square.id === "d4"){
        return true;
    } else if(blackTurn && square.id === "a1"){
        return true;
    }
    for(var i = 0; i < attackedSquares.length; i++){
        if(square.id !== attackedSquares[i]){
        } else {
            return false;
        }
    }
    return true;
}

function drop_handler(ev) {
    var data = ev.dataTransfer.getData("text");
    var prev = document.getElementById(data);
    prev.removeAttribute("draggable");
    prev.removeAttribute("onDragStart");
    prev.removeAttribute("onDragEnd");
    ev.preventDefault();
    resetDroppable();
    ev.target.className = prev.className;
    ev.target.setAttribute("ondragend", "dragend_handler()");
    prev.className = "OO";
    sendMoveToServer(""+data+ev.target.id+"");
    toggleTurn();
}

function dragstart_handler(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    getPossibleMoves(ev.target.id, ev.target.className);
}

function dragend_handler(){
    resetDroppable();
}

function dragover_handler(ev) {
    ev.preventDefault();
}
  
function settings() {
    document.getElementById("nav-link1").style.display = "active";
}
  
function off() {
    document.getElementById("chessBoard").style.display = "none";
}

function isCheck(){
    if(whiteTurn){
        var el = document.getElementsByClassName("wK");
        var checkColor = "b";
    } else if(blackTurn){
        var el = document.getElementsByClassName("bK");
        var checkColor = "w";
    }
    colVal = el[0].id.charCodeAt(0), rowVal = parseInt(el[0].id.charAt(1)), pieceType = el[0].className.charAt(1), pieceColor = el[0].className.charAt(0);
    if((colVal-1) >= 97){
        var target = document.getElementById(String.fromCharCode(colVal-1)+rowVal)
        if(target.className === ""+checkColor+"R"){
            return target.id;
        }
    }
    if((colVal+1) <= 100){
        var target = document.getElementById(String.fromCharCode(colVal+1)+rowVal);
        if(target.className === ""+checkColor+"R"){
            return target.id;
        }
    }
    if((rowVal-1) >= 1){
        var target = document.getElementById(String.fromCharCode(colVal)+(rowVal-1))
        if(target.className === ""+checkColor+"R"){
            return target.id;
        }
    }
    if((rowVal+1) <= 4){
        var target = document.getElementById(String.fromCharCode(colVal)+(rowVal+1));
        if(target.className === ""+checkColor+"R"){
            return target.id;
        }
    }
    if((colVal-1) >= 97 && (rowVal-1) >= 1){
        var target = document.getElementById(String.fromCharCode(colVal-1)+(rowVal-1));
        if(target.className === ""+checkColor+"B"){
            return target.id;
        }
    }
    if((colVal-1) >= 97 && (rowVal+1) <= 4){
        var target = document.getElementById(String.fromCharCode(colVal-1)+(rowVal+1));
        if(target.className === ""+checkColor+"B"){
            return target.id;
        }
    }
    if((colVal+1) <= 100 && (rowVal-1) >= 1){
        var target = document.getElementById(String.fromCharCode(colVal+1)+(rowVal-1));
        if(target.className === ""+checkColor+"B"){
            return target.id;
        }
    }
    if((colVal+1) <= 100 && (rowVal+1) <= 4){
        var target = document.getElementById(String.fromCharCode(colVal+1)+(rowVal+1));
        if(target.className === ""+checkColor+"B"){
            return target.id;
        }
    }
    return "";
}

function getPossibleMoves(id, piece){
    colVal = id.charCodeAt(0), rowVal = parseInt(id.charAt(1)), pieceType = piece.charAt(1), pieceColor = piece.charAt(0);
    if(checkFrom === ""){
        switch(pieceType){
            case "R":
                if((colVal-1) >= 97){
                    makeDropabble(document.getElementById(String.fromCharCode(colVal-1)+rowVal),pieceColor);
                }
                if((colVal+1) <= 100){
                    makeDropabble(document.getElementById(String.fromCharCode(colVal+1)+rowVal),pieceColor);
                }
                if((rowVal-1) >= 1){
                    makeDropabble(document.getElementById(String.fromCharCode(colVal)+(rowVal-1)),pieceColor);
                }
                if((rowVal+1) <= 4){
                    makeDropabble(document.getElementById(String.fromCharCode(colVal)+(rowVal+1)),pieceColor);
                }
                break;
            case "B":
                if((colVal-1) >= 97){
                    var target = document.getElementById(String.fromCharCode(colVal-1)+rowVal);
                    if(target.className === "OO"){
                        makeDropabble(target,pieceColor);
                    }
                }
                if((colVal+1) <= 100){
                    var target = document.getElementById(String.fromCharCode(colVal+1)+rowVal);
                    if(target.className === "OO"){
                        makeDropabble(target,pieceColor);
                    }
                }
                if((rowVal-1) >= 1){
                    var target = document.getElementById(String.fromCharCode(colVal)+(rowVal-1));
                    if(target.className === "OO"){
                        makeDropabble(target,pieceColor);
                    }
                }
                if((rowVal+1) <= 4){
                    var target = document.getElementById(String.fromCharCode(colVal)+(rowVal+1));
                    if(target.className === "OO"){
                        makeDropabble(target,pieceColor);
                    }
                }
                if((colVal-1) >= 97 && (rowVal-1) >= 1){
                    makeDropabble(document.getElementById(String.fromCharCode(colVal-1)+(rowVal-1)),pieceColor);
                }
                if((colVal-1) >= 97 && (rowVal+1) <= 4){
                    makeDropabble(document.getElementById(String.fromCharCode(colVal-1)+(rowVal+1)),pieceColor);
                }
                if((colVal+1) <= 100 && (rowVal-1) >= 1){
                    makeDropabble(document.getElementById(String.fromCharCode(colVal+1)+(rowVal-1)),pieceColor);
                }
                if((colVal+1) <= 100 && (rowVal+1) <= 4){
                    makeDropabble(document.getElementById(String.fromCharCode(colVal+1)+(rowVal+1)),pieceColor);
                }
                break;
            case "K":
                if((colVal-1) >= 97){
                    var target = document.getElementById(String.fromCharCode(colVal-1)+rowVal);
                    if(target.className !== "wR" && target.className !== "bR" && target.className !== "wK" && target.className !== "bK"){
                        if(isAttacked(target)){
                            makeDropabble(target,pieceColor);
                        }
                    }
                }
                if((colVal+1) <= 100){
                    var target = document.getElementById(String.fromCharCode(colVal+1)+rowVal);
                    if(target.className !== "wR" && target.className !== "bR" && target.className !== "wK" && target.className !== "bK"){
                        if(isAttacked(target)){
                            makeDropabble(target,pieceColor);
                        }
                    }
                }
                if((rowVal-1) >= 1){
                    var target = document.getElementById(String.fromCharCode(colVal)+(rowVal-1));
                    if(target.className !== "wR" && target.className !== "bR" && target.className !== "wK" && target.className !== "bK"){
                        if(isAttacked(target)){
                            makeDropabble(target,pieceColor);
                        }
                    }
                }
                if((rowVal+1) <= 4){
                    var target = document.getElementById(String.fromCharCode(colVal)+(rowVal+1));
                    if(target.className !== "wR" && target.className !== "bR" && target.className !== "wK" && target.className !== "bK"){
                        if(isAttacked(target)){
                            makeDropabble(target,pieceColor);
                        }
                    }
                }
                if((colVal-1) >= 97 && (rowVal-1) >= 1){
                    var target = document.getElementById(String.fromCharCode(colVal-1)+(rowVal-1));
                    if(target.className !== "wB" && target.className !== "bB" && target.className !== "wK" && target.className !== "bK"){
                        if(isAttacked(target)){
                            makeDropabble(target,pieceColor);
                        }
                    }
                }
                if((colVal-1) >= 97 && (rowVal+1) <= 4){
                    var target = document.getElementById(String.fromCharCode(colVal-1)+(rowVal+1));
                    if(target.className !== "wB" && target.className !== "bB" && target.className !== "wK" && target.className !== "bK"){
                        if(isAttacked(target)){
                            makeDropabble(target,pieceColor);
                        }
                    }
                }
                if((colVal+1) <= 100 && (rowVal-1) >= 1){
                    var target = document.getElementById(String.fromCharCode(colVal+1)+(rowVal-1));
                    if(target.className !== "wB" && target.className !== "bB" && target.className !== "wK" && target.className !== "bK"){
                        if(isAttacked(target)){
                            makeDropabble(target,pieceColor);
                        }
                    }
                }
                if((colVal+1) <= 100 && (rowVal+1) <= 4){
                    var target = document.getElementById(String.fromCharCode(colVal+1)+(rowVal+1));
                    if(target.className !== "wB" && target.className !== "bB" && target.className !== "wK" && target.className !== "bK"){
                        if(isAttacked(target)){
                            makeDropabble(target,pieceColor);
                        }
                    }
                }
                break;
        }
    } else {
        switch(pieceType){
            case "R":
                if((String.fromCharCode(colVal-1)+rowVal)===checkFrom){
                    makeDropabble(document.getElementById(checkFrom),pieceColor);
                }else if((String.fromCharCode(colVal+1)+rowVal)===checkFrom){
                    makeDropabble(document.getElementById(checkFrom),pieceColor);
                }else if((String.fromCharCode(colVal)+(rowVal-1))===checkFrom){
                    makeDropabble(document.getElementById(checkFrom),pieceColor);
                }else if((String.fromCharCode(colVal)+(rowVal+1))===checkFrom){
                    makeDropabble(document.getElementById(checkFrom),pieceColor);
                }
                break;
            case "B":
                if((String.fromCharCode(colVal-1)+(rowVal-1))===checkFrom){
                    makeDropabble(document.getElementById(checkFrom),pieceColor);
                }else if((String.fromCharCode(colVal-1)+(rowVal+1))===checkFrom){
                    makeDropabble(document.getElementById(checkFrom),pieceColor);
                }else if((String.fromCharCode(colVal+1)+(rowVal-1))===checkFrom){
                    makeDropabble(document.getElementById(checkFrom),pieceColor);
                }else if((String.fromCharCode(colVal+1)+(rowVal+1))===checkFrom){
                    makeDropabble(document.getElementById(checkFrom),pieceColor);
                }
                break;
            case "K":
                if((colVal-1) >= 97){
                    var target = document.getElementById(String.fromCharCode(colVal-1)+rowVal);
                    if(target.className.charAt(1) !== "R" && target.className.charAt(1) !== "K"){
                        if(isAttacked(target)){
                            makeDropabble(target,pieceColor);
                        }
                    }
                }
                if((colVal+1) <= 100){
                    var target = document.getElementById(String.fromCharCode(colVal+1)+rowVal);
                    if(target.className.charAt(1) !== "R" && target.className.charAt(1) !== "K"){
                        if(isAttacked(target)){
                            makeDropabble(target,pieceColor);
                        }
                    }
                }
                if((rowVal-1) >= 1){
                    var target = document.getElementById(String.fromCharCode(colVal)+(rowVal-1));
                    if(target.className.charAt(1) !== "R" && target.className.charAt(1) !== "K"){
                        if(isAttacked(target)){
                            makeDropabble(target,pieceColor);
                        }
                    }
                }
                if((rowVal+1) <= 4){
                    var target = document.getElementById(String.fromCharCode(colVal)+(rowVal+1));
                    if(target.className.charAt(1) !== "R" && target.className.charAt(1) !== "K"){
                        if(isAttacked(target)){
                            makeDropabble(target,pieceColor);
                        }
                    }
                }
                if((colVal-1) >= 97 && (rowVal-1) >= 1){
                    var target = document.getElementById(String.fromCharCode(colVal-1)+(rowVal-1));
                    if(target.className.charAt(1) !== "B" && target.className.charAt(1) !== "K"){
                        if(isAttacked(target)){
                            makeDropabble(target,pieceColor);
                        }
                    }
                }
                if((colVal-1) >= 97 && (rowVal+1) <= 4){
                    var target = document.getElementById(String.fromCharCode(colVal-1)+(rowVal+1));
                    if(target.className.charAt(1) !== "B" && target.className.charAt(1) !== "K"){
                        if(isAttacked(target)){
                            makeDropabble(target,pieceColor);
                        }
                    }
                }
                if((colVal+1) <= 100 && (rowVal-1) >= 1){
                    var target = document.getElementById(String.fromCharCode(colVal+1)+(rowVal-1));
                    if(target.className.charAt(1) !== "B" && target.className.charAt(1) !== "K"){
                        if(isAttacked(target)){
                            makeDropabble(target,pieceColor);
                        }
                    }
                }
                if((colVal+1) <= 100 && (rowVal+1) <= 4){
                    var target = document.getElementById(String.fromCharCode(colVal+1)+(rowVal+1));
                    if(target.className.charAt(1) !== "B" && target.className.charAt(1) !== "K"){
                        if(isAttacked(target)){
                            makeDropabble(target,pieceColor);
                        }
                    }
                }
                break;
        }
    }
}
function isCheckMate(checkFrom){
    //TODO: bruh noone ever checkmates this isint worth it. You can always just resign/leave if you get checkmated.
}

function generateId (i, j) {
    var id = "";
    switch(j) {
        case 0:
            return(id = ("a"+(i)+""));
        case 1:
            return(id = ("b"+(i)+""));
        case 2:
            return(id = ("c"+(i)+""));
        case 3:
            return(id = ("d"+(i)+""));
    }
}

window.onload = function loadBoard() {
    var chessBoard = document.getElementById("chessBoard");
    boardstring.once("value", (data) => {
        var boardstring = data.val();
        var boardstate = new Array(17);
        var index = 0;
        for(var i = 0; i <= 32; i+=2){
            boardstate[index] = boardstring.substring(i,i+2);
            index++;
        }
        index=0;
        for(var i=4; i>=1; i--){
            var row = chessBoard.appendChild(document.createElement("div"));
            for (var j=0; j<=3; j++){
                square = document.createElement("span");
                square.id = generateId(i, j);
                square.title = generateId(i, j);
                square.className = boardstate[index];
                index++;
                row.appendChild(square);
            }
        }
    });
    //TODO: gameInProgress = true;
}

document.addEventListener('DOMContentLoaded',recieveMoveFromServer);