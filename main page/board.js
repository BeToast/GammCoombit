var chessBoard = document.getElementById("chessBoard");
for (var i=4; i>=1; i--){
    var row = chessBoard.appendChild(document.createElement("div"));
    for (var j=4; j>=1; j--){
        square = document.createElement("span");
        square.id = generateId(i, j);
        row.appendChild(square);
    }
}

function generateId (i, j) {
    var id = "";
    switch(j) {
        case 4:
            return(id = ("a"+i+""));
        case 3:
            return(id = ("b"+i+""));
        case 2:
            return(id = ("c"+i+""));
        case 1:
            return(id = ("d"+i+""));
    }
}