//This stuff is setup shit

$(function(){
    const canvas = document.getElementById("gameCanvas");
    const c = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.font = "30px Arial";
    ctx.fillText("Hello World",10,50);
});


function createClearBoard() {
    var toggleColor = true; //boolean for alternating the color the squares are painted
    whiteCanvas();
    console.log("this does work :)");
    for(x = 0; x < 4; x++){
        for(y = 0; y < 4; y++){
            drawRectangle(x * (width/4), y * (height/4), width/4, height/4, (function(){
                if(toggleColor){
                    return "#74bec1";
                } else {
                    return "#adebbe";
                }
                toggleColor != toggleColor;
            }));
        }
    }

    /*
    this listener is here if we decide to implement a way to resize the board.
    If we want to resize we should have a few sizes to choose from that are multiples of 64 so the math is easy to start.
    if we implemented a drag to resize feature we would have to be able to scale the piece img sizes. Im totally down if yall want to add that at some point.   
    */
    addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    })
}

function drawRectangle(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.draw = () => {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}

function whiteCanvas() {
    c.drawRectangle(0, 0, 512, 512, white);
}