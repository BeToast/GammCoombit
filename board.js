var x=4;
var y=4;

var chessBoard = document.getElementById("chessBoard");

for (var i=0; i<y; i++){
    var row = chessBoard.appendChild(document.createElement("div"));
    for (var j=0; j<x; j++){
        row.appendChild(document.createElement("span"));
    }
}