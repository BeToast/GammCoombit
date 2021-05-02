

var defaultBoard = new Array(4);
for(var i = 0; i < 4; i++){
    defaultBoard[i] = new Array(4);
}
defaultBoard[0][0] = "0";
defaultBoard[0][1] = "0";
defaultBoard[0][2] = "bR";
defaultBoard[0][3] = "bK";
defaultBoard[1][0] = "0";
defaultBoard[1][1] = "0";
defaultBoard[1][2] = "bB";
defaultBoard[1][3] = "bR";
defaultBoard[2][0] = "wR";
defaultBoard[2][1] = "wB";
defaultBoard[2][2] = "0";
defaultBoard[2][3] = "0";
defaultBoard[3][0] = "wK";
defaultBoard[3][1] = "wR";
defaultBoard[3][2] = "0";
defaultBoard[3][3] = "0";


var chessBoard = document.getElementById("chessBoard");
for (var i=3; i>=0; i--){
    var row = chessBoard.appendChild(document.createElement("div"));
    for (var j=0; j<=3; j++){
        square = document.createElement("span");
        square.id = generateId(i, j);
        square.title = defaultBoard[i][j];
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
function settings() {
    document.getElementById("nav-link1").style.display = "active";
}

function off() {
    document.getElementById("chessBoard").style.display = "none";
}

function newBoard(newBoard){
    var board = document.getElementById("chessBoard");
    for(let e of board.getElementByTagName("span")){
        if(e.title!="0"){
            e.appendChild(newPiece(e.title));
        }
    }
}

function newPiece(piece){
    var img = e.createElement("img");
    img.setAttribute("class", ""+piece+"");
    img.setAttribute("draggable", "true");
    img.setAttribute("onDrag", getCoord());
    img.setAttribute("onDrop", movePiece());
    return img;
}



