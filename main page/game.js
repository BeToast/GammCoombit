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

console.log(defaultBoard);