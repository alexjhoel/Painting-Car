var canvas;
var ctx;

let drawing = false;
let points = [];

function startDrawing(e) {
    drawing = true;
    points.push([]);
    ctx.beginPath();
}

function endDrawing(e) {
    drawing = false;
    console.log(points)
}

window.addEventListener("mouseup", endDrawing);

window.addEventListener("mousedown", startDrawing);

window.addEventListener("mousemove", draw);

function draw(e) {
    ctx.fillStyle = "#FFFFFF"
    if (!drawing) return;

    let { x, y } = getMousePos(canvas, e);

    points[points.length - 1].push({x,y});

    ctx.lineTo(x, y);
    ctx.stroke();
}

function loop(){
    if(drawing)return;
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,350,350);
    ctx.fillStyle = "black";
    
    for (let y = 0; y < points.length; y++) {
        points[y].shift();
        
        for (let i = 0; i < points[y].length; i++) {
            ctx.moveTo(points[y][i].x,points[y][i].y);
            if(i < points[y].length - 1) ctx.lineTo(points[y][i + 1].x,points[y][i + 1].y)
            else ctx.lineTo(points[y][i].x,points[y][i].y)
        }

        if(points[y].length == 0) points.splice(y,1);
    }
    
    ctx.stroke();
}


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(),
      scaleX = canvas.width / rect.width,
      scaleY = canvas.height / rect.height;
  
    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY
    }
}

setInterval(loop, 10);



