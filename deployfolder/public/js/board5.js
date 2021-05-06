var yourColor;
var opponentColor;
var whiteTurn = true;
var blackTurn = false;
var checkFrom = "";
var attackedSquares = [];
var gameInProgress = false;
var forceEnd = false;

const database = firebase.database();
const boardRef = database.ref("/Board5");
const boardRefLast = database.ref("/Board5").limitToLast(1);

function init(){
	boardRefLast.on('child_added', (data) => {
	var moveString = data.val().move;
	console.log(moveString);
	if(((yourColor==="white" && !whiteTurn)||(yourColor==="black" && whiteTurn))&&gameInProgress){
		var from = moveString.substring(0,2);
		var to = moveString.substring(2,4);
		document.getElementById(to).className = document.getElementById(from).className;
		document.getElementById(from).className = "O";
		toggleTurn();
	}
});
}

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

function sendMoveToServer(moveString){
    console.log("movestring: "+moveString+"");
    //TODO: call firebase function that runs recieveMoveFromServer(moveString) on other players client
	const move = moveString;
	const newMove = {
		move: move
	};
	boardRef.push(newMove);
}

function gameEnd(winner){
    //TODO: call function here to clear the moves database
	gameInProgress = false;
	boardRef.remove();
    endMenu(winner);
}

function forceGameEnd(){
    if(opponentColor==="white"){
        sendMoveToServer(""+document.getElementsByClassName("wK")[0].id+"d4");
    }else if(opponentColor==="black"){
        sendMoveToServer(""+document.getElementsByClassName("bK")[0].id+"a1");
    }
}

function toggleTurn(){
    allowMove(false);
    if(document.getElementById("a1").className === "bK"){
        gameEnd("black");
        return;
    }else if(document.getElementById("d4").className === "wK"){
        gameEnd("white");
        return;
    }
    //isCheckMate()
    whiteTurn = !whiteTurn;
    blackTurn = !blackTurn;
    checkFrom = isCheck();
    getAttackedSquares();
    allowMove(true);
    if(whiteTurn)  
        console.log("white to move");
    else if(blackTurn)
        console.log("black to move");
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
    prev.className = "O";
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
                    if(target.className === "O"){
                        makeDropabble(target,pieceColor);
                    }
                }
                if((colVal+1) <= 100){
                    var target = document.getElementById(String.fromCharCode(colVal+1)+rowVal);
                    if(target.className === "O"){
                        makeDropabble(target,pieceColor);
                    }
                }
                if((rowVal-1) >= 1){
                    var target = document.getElementById(String.fromCharCode(colVal)+(rowVal-1));
                    if(target.className === "O"){
                        makeDropabble(target,pieceColor);
                    }
                }
                if((rowVal+1) <= 4){
                    var target = document.getElementById(String.fromCharCode(colVal)+(rowVal+1));
                    if(target.className === "O"){
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

function startGame() {
    document.getElementById("startmenu").remove();
    var defaultBoard = new Array(4);
    for(var i = 0; i < 4; i++){
        defaultBoard[i] = new Array(4);
    }
    defaultBoard[0][0] = "wK";
    defaultBoard[0][1] = "wR";
    defaultBoard[0][2] = "O";
    defaultBoard[0][3] = "O";
    defaultBoard[1][0] = "wR";
    defaultBoard[1][1] = "wB";
    defaultBoard[1][2] = "O";
    defaultBoard[1][3] = "O";
    defaultBoard[2][0] = "O";
    defaultBoard[2][1] = "O";
    defaultBoard[2][2] = "bB";
    defaultBoard[2][3] = "bR";
    defaultBoard[3][0] = "O";
    defaultBoard[3][1] = "O";
    defaultBoard[3][2] = "bR";
    defaultBoard[3][3] = "bK";

    var chessBoard = document.getElementById("chessBoard");
    for (var i=3; i>=0; i--){
        var row = chessBoard.appendChild(document.createElement("div"));
        for (var j=0; j<=3; j++){
        square = document.createElement("span");
        square.id = generateId(i, j);
        square.title = generateId(i, j);
        var tempClass = defaultBoard[i][j];
        square.className = tempClass;
        if(tempClass==="wR"||tempClass==="bR"||tempClass==="wK"||tempClass==="bK"||tempClass==="wB"||tempClass==="bB"){
            if((yourColor==="white") && (tempClass==="wR"||tempClass==="wK"||tempClass==="wB")){
                square.setAttribute("draggable", "true");
                square.setAttribute("onDragStart", "dragstart_handler(event)");
            }
            square.setAttribute("ondragend", "dragend_handler()");
        }else{
            square.className = "O";
        }
        row.appendChild(square);
        }
    }
    function generateId (i, j) {
        var id = "";
        switch(j) {
            case 0:
                return(id = ("a"+(i+1)+""));
            case 1:
                return(id = ("b"+(i+1)+""));
            case 2:
                return(id = ("c"+(i+1)+""));
            case 3:
                return(id = ("d"+(i+1)+""));
        }
    }
}
document.addEventListener('DOMContentLoaded',init);