var canvas;
var canvas2;
var ctx;
var ctx2;

let drawing = false;
let points = [];
let pos = {}
let pos2 = {}
let mouseButtonClicked = false;
let mouseButtonClicked2 = false;
let mouseover2 = false;
let cycle = 0;
let nodes = [];
const forwardTime = 500;
const spinTime = 200;

function startDrawing(e) {
    
    mouseButtonClicked = true;
    if(mouseover2) mouseButtonClicked2 = true;
    console.log(nodes);
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
    pos2 = getMousePos(canvas2, e);
    
}

function moveTouch(e){
    pos = getTouchPos(canvas, e);
    pos2 = getTouchPos(canvas2, e);
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

    //////////////
    //MODO NODOS//
    //////////////

    ctx2.beginPath();
    ctx2.fillStyle = "white"
    ctx2.fillRect(0,0,300,300)
    ctx2.fillStyle = "black"
    if(mouseButtonClicked2 && isBetween(pos2,{x:0,y:0},{x:300,y:300})){
        
        if(nodes.length == 1){
            nodes.push({x:nodes[nodes.length - 1].x, y:Math.min(pos2.y,nodes[nodes.length - 1].y)})
        }else{
            nodes.push(pos2)
        }
        
        mouseButtonClicked2 = false;
    }

    if(nodes.length == 1){
        ctx2.moveTo(nodes[nodes.length - 1].x ,nodes[nodes.length - 1].y)
        ctx2.lineTo(nodes[nodes.length - 1].x, Math.min(pos2.y,nodes[nodes.length - 1].y))
    }else if(nodes.length >= 2){
        ctx2.moveTo(nodes[nodes.length - 1].x ,nodes[nodes.length - 1].y)
        ctx2.lineTo(pos2.x, pos2.y)
    }
    

    for (let i = 0; i < nodes.length; i++) {
        
        ctx2.fillRect(nodes[i].x - 5, nodes[i].y - 5,10,10)
        ctx2.moveTo(nodes[i].x ,nodes[i].y)
        if(i!=nodes.length - 1)ctx2.lineTo(nodes[i+1].x, nodes[i+1].y)
        
    }
    
    ctx2.stroke();
}


function playNodos(){
    goForward(0)
}
function goForward(i){
    getsend(args.forward);
    setTimeout(turn(i+1), forwardTime * distance(nodes[i], nodes[i+1]));
}

function turn(i){

}

function distance({x1,y1},{x2,y2}){
    Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2))
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



