//create 2d array to be the boardState
var boardState = new Array(4);
for(var i = 0; i < 4; i++){
    boardState[i] = new Array(4);
}
boardState[0][0] = "0";
boardState[0][1] = "0";
boardState[0][2] = "bR";
boardState[0][3] = "bK";
boardState[1][0] = "0";
boardState[1][1] = "0";
boardState[1][2] = "bB";
boardState[1][3] = "bR";
boardState[2][0] = "wR";
boardState[2][1] = "wB";
boardState[2][2] = "0";
boardState[2][3] = "0";
boardState[3][0] = "wK";
boardState[3][1] = "wR";
boardState[3][2] = "0";
boardState[3][3] = "0";

//draw the board and give titles and ids
var chessBoard = document.getElementById("chessBoard");
var row = chessBoard.appendChild(document.createElement("div"));
var toggle = true;
row.setAttribute("class", "row no-gutters");
for (var i=3; i>=0; i--){
    for (var j=0; j<=3; j++){
        var col = row.appendChild(document.createElement("div"));
        col.setAttribute("class", "col-3");
        square = document.createElement("span");
        square.style.backgroundColor = getColor(toggle);
        toggle = !toggle;
        square.id = generateId(i, j);
        square.title = boardState[i][j];
        square.setAttribute("ondrop","drop(event)");
        square.setAttribute("ondragover","allowDrop(event)");
        col.appendChild(square);
    }
    toggle = !toggle;
}
//display pieces on board
newBoard();
//reset to proper titles
for (var i=3; i>=0; i--){
    for (var j=0; j<=3; j++){
        var square = document.getElementById(generateId(i,j));
        square.title = square.id;
    }
}
function getColor(toggle){
    if(toggle)
        return "orange";
    return "white";
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

function newBoard(){
    var i = 0;
    var board = document.getElementById("chessBoard");
    for(let e of board.getElementsByTagName("span")){
        if(e.title=="wR"||"bR"||"wK"||"bK"||"wB"||"bB"){
            e.appendChild(newPiece(e.title, i));
            i++;
        }
    }
}

function newPiece(piece, i){
    var img = document.createElement("img");
    img.setAttribute("class", ""+piece+"");
    img.setAttribute("id", "piece"+i+"");
    img.setAttribute("draggable", "true");
    img.setAttribute("onDragStart", "drag(event)");
    //img.setAttribute("onDrop", movePiece());
    return img;
}

function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}



