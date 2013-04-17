function drawDefaultBezier(a1, b1) {
$("#mainCanvas").drawBezier({
  strokeStyle: "#000",
  strokeWidth: 5,
  x1: a1, y1: b1, // Start point
  cx1: 200, cy1: 50, // Control point
  cx2: 50, cy2: 150, // Control point
  x2: 200, y2: 150, // Start/end point
  //cx3: 300, cy3: 150, // Control point
  //cx4: 150, cy4: 1, // Control point
  //x3: 350, y3: 50 // Start/end point
});
}

function drawLine() {
var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
context.moveTo(0, 0);
context.lineTo(400, 400);
context.strokeStyle = "#ff0000";
context.stroke();
}

function draw(){
  var ctx = document.getElementById('mainCanvas').getContext('2d');
  ctx.fillRect(25,25,100,100);
  ctx.clearRect(45,45,60,60);
  ctx.strokeRect(50,50,50,50);
}