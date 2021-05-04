//functions uphere will get called throughout the program
function dragstart_handler(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    getPossibleMoves(ev.target.id, ev.target.className);
}

function drop_handler(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var prev = document.getElementById(data);
    ev.target.className = prev.className;
    ev.target.setAttribute("draggable","true");
    ev.target.setAttribute("onDragStart", "dragstart_handler(event)");
    prev.className = "O";
    prev.removeAttribute("draggable");
    prev.removeAttribute("onDragStart");
    resetDroppable();
}

function dragover_handler(ev) {
    ev.preventDefault();
}
  
function getPossibleMoves(id, piece){
    colVal = id.charCodeAt(0), rowVal = parseInt(id.charAt(1)), pieceType = piece.charAt(1), pieceColor = piece.charAt(0);
    if((colVal-1) >= 97){
    makeDropabble(document.getElementById(""+String.fromCharCode(colVal-1)+rowVal+""),pieceColor);
    }
    if((colVal+1) <= 100){
    makeDropabble(document.getElementById(""+String.fromCharCode(colVal+1)+rowVal+""),pieceColor);
    }
    if((rowVal-1) >= 1){
    makeDropabble(document.getElementById(""+String.fromCharCode(colVal)+(rowVal-1)+""),pieceColor);
    }
    if((rowVal+1) <= 4){
    makeDropabble(document.getElementById(""+String.fromCharCode(colVal)+(rowVal+1)+""),pieceColor);
    }
    if(pieceType === "K" || pieceType === "B") {
        if((colVal-1) >= 97 && (rowVal-1) >= 1){
            makeDropabble(document.getElementById(""+String.fromCharCode(colVal-1)+(rowVal-1)+""),pieceColor);
        }
        if((colVal-1) <= 100 && (rowVal+1) <= 4){
            makeDropabble(document.getElementById(""+String.fromCharCode(colVal-1)+(rowVal+1)+""),pieceColor);
        }
        if((colVal+1) >= 97 && (rowVal-1) >= 1){
            makeDropabble(document.getElementById(""+String.fromCharCode(colVal+1)+(rowVal-1)+""),pieceColor);
        }
        if((colVal+1) <= 100 && (rowVal+1) <= 4){
            makeDropabble(document.getElementById(""+String.fromCharCode(colVal+1)+(rowVal+1)+""),pieceColor);
        }
    }
}
  
function makeDropabble(el, pieceColor){
    if(el.className.charAt(0) !== pieceColor){
      el.setAttribute("ondrop","drop_handler(event)");
      el.setAttribute("ondragover","dragover_handler(event)");
      //el.classList.add("moveable");
    }
}
  
function resetDroppable(){ //this only works if the board is the only span tags.
    var chessBoard = document.getElementById("chessBoard");
    var el = new Array(16);
    var el = chessBoard.getElementsByTagName("span");
    for(var i = 0; i <= 16; i++){
        el[i].removeAttribute("ondrop");
        el[i].removeAttribute("ondragover");
        //el[i].classList.remove("moveable");
    }
}
  
function settings() {
    document.getElementById("nav-link1").style.display = "active";
}
  
function off() {
    document.getElementById("chessBoard").style.display = "none";
}

window.onload = function() {
    //I added this shit in the onload cuz it only makes sense.
    //create 2d array to be the boardState
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
            square.setAttribute("draggable", "true");
            square.setAttribute("onDragStart", "dragstart_handler(event)");
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