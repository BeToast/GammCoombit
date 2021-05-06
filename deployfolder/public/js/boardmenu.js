function colorMenu(){ //change the colorMenu buttons if you like.
    var chessBoard = document.getElementById("chessBoard");
    var startmenu = document.getElementById("startmenu");
    startmenu.classList.add("btn-group-vertical");
    startmenu.innerHTML = `
    <button class="btn btn-lg btn-light" onclick="joinWhite()">white</button>
    <button class="btn btn-lg btn-dark" onclick="joinBlack()">black</button>
    <button class="btn btn-lg btn-primary" onclick="joinRandom()">random</button>
    `;
}

//change waiting menu styling if you want
function waitingMenu(yourColor){
    if(yourColor==="white"){
        document.getElementById("startmenu").innerHTML = `
        <div class='card bg-light'>
            <div class='card-body'>playing as: WHITE<br>waiting for opponent...</div>
        </div>   
        `;
    } else if(yourColor==="black"){
        document.getElementById("startmenu").innerHTML = `
        <div class='card text-white bg-dark'>
            <div class='card-body'>playing as: BLACK<br>waiting for opponent...</div>
        </div>
        `;
    }
}
function newMenu(){
    document.getElementById("chessBoard").innerHTML = "";
    startmenu = document.createElement("div");
    startmenu.classList.add("menu");
    startmenu.id = "startmenu";
    //put menu on board
    chessBoard.appendChild(startmenu);
    if(yourColor){
        waitingMenu(yourColor);
    } else {
        colorMenu();
    }
}
window.onload = function(){
    newMenu();
};

