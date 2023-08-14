var canvas;
var ctx;

let drawing = false;
let points = [];
let pos = {}
let mouseButtonClicked = false;
let cycle = 0;

function startDrawing(e) {
    mouseButtonClicked = true;
        // Get the current page scroll position
        scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
        scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft,
      
            // if any scroll is attempted,
            // set this to the previous value
            window.onscroll = function() {
                window.scrollTo(scrollLeft, scrollTop);
            };
    
}

function endDrawing(e) {
    drawing = false;
    getsend2(args.stop);
    window.onscroll = function() {};
}

window.addEventListener("mouseup", endDrawing);

window.addEventListener("touchend", endDrawing);

window.addEventListener("mousedown", startDrawing);

window.addEventListener("touchstart", startDrawing);

window.addEventListener("mousemove", move);

window.addEventListener("touchmove", moveTouch)

function move(e) {
    pos = getMousePos(canvas, e);
}

function moveTouch(e){
    pos = getTouchPos(canvas, e);
}

function isBetween(x,y,z){
    return x.x > y.x && x.x < z.x && x.y > y.y && x.y < z.y
}

function loop(){
    
    cycle++;
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,300,300);

    if(isBetween(pos,{x:100,y:0},{x:200,y:150})){
        ctx.fillStyle = "rgba(245, 39, 39, 1)";
        if(drawing){
            getsend2(args.forward, pos.y < 75 ? maxVel : minVel);
        }
    }
    else{
        ctx.fillStyle = "rgba(245, 39, 39, 0.51)";
    }
    ctx.fillRect(100,0,100,150);

    if(isBetween(pos,{x:0,y:0},{x:100,y:300})){
        ctx.fillStyle = "rgba(39, 245, 78, 1)";
        if(drawing){
            getsend2(args.leftturn, pos.y < 75 || pos.y > 225 ? maxVel : minVel);
        }
    }
    else{
        ctx.fillStyle = "rgba(39, 245, 78, 0.51)";
    }
    ctx.fillRect(0,0,100,300);

    if(isBetween(pos,{x:200,y:0},{x:300,y:300})){
        ctx.fillStyle = "rgba(39, 245, 78, 1)";
        if(drawing){
            getsend2(args.rightturn, pos.y < 75 || pos.y > 225 ? maxVel : minVel);
        }
    }
    else{
        ctx.fillStyle = "rgba(39, 245, 78, 0.51)";
    }
    ctx.fillRect(200,0,100,300);

    if(isBetween(pos,{x:100,y:150},{x:200,y:300})){
        ctx.fillStyle = "rgba(39, 146, 245, 1)";
        if(drawing){
            getsend2(args.reverse, pos.y > 225 ? maxVel : minVel);
        }
    }
    else{
        ctx.fillStyle = "rgba(39, 146, 245, 0.51)";
    }
    
    ctx.fillRect(100,150,100,150);

    ctx.lineWidth = 5;
    ctx.setLineDash([10,10]);
    

    ctx.moveTo(200, 0);
    ctx.lineTo(200, 300);
    
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 300);
    
    ctx.moveTo(0, 150);
    ctx.lineTo(300, 150);

    

    ctx.stroke();

    ctx.beginPath();

    ctx.lineWidth = 2;
    ctx.setLineDash([]);

    ctx.moveTo(0, 75);
    ctx.lineTo(300, 75);

    ctx.moveTo(0, 225);
    ctx.lineTo(300, 225);

    ctx.stroke();

    ctx.beginPath();

    ctx.fillStyle = "black";
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.setLineDash([]);

    if(mouseButtonClicked){
        points.push([]);
        points.push([]);
        mouseButtonClicked = false;
        drawing = true;
    }

    if(drawing){
        if(points[points.length - 1])
        {
            points[points.length - 1].push(pos);
        }
        
    }

    ctx.stroke();

    for (let y = 0; y < points.length; y++) {
        
        if(cycle % 2 == 1 || points[points.length - 1].length > 40){
            points[y].shift();
        }
        
        
        for (let i = 0; i < points[y].length; i++) {
            ctx.beginPath();
            ctx.lineWidth = i * (12 / 40);
            ctx.moveTo(points[y][i].x,points[y][i].y);
            if(i < points[y].length - 1) ctx.lineTo(points[y][i + 1].x,points[y][i + 1].y)
            else ctx.lineTo(points[y][i].x,points[y][i].y)
            ctx.stroke();
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
            x: (evt.clientX - rect.left),
            y: (evt.clientY - rect.top)
          }
    
}

function getTouchPos(canvas, evt) {
    
    var rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height;
    return {
            x: (evt.touches[0].clientX - rect.left),
            y: (evt.touches[0].clientY - rect.top)
          }
      
    
}

setInterval(loop, 1);



