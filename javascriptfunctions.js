var lineInProgress = false;
var beginX, beginY, endX, endY;

function drawBox(){
$("#mainCanvas").drawRect({
  layer: true,
  strokeStyle: "#36a",
  strokeWidth: 3,
  x: 150, y: 100,
  width: 200,
  height: 100,
  cornerRadius: 10,
  draggable: true,
  fromCenter: true,
  
  // to draw a connector: double click on one box, then double click on another
  dblclick: function(layer){
	if(lineInProgress == false)
	{
		beginX = layer.eventX;
		beginY = layer.eventY;
		lineInProgress = true;
		alert("lineInProgress is" + lineInProgress);
	} else {
		endX = layer.eventX;
		endY = layer.eventY;
		$("#mainCanvas").drawLine({
		  layer: true,
		  strokeStyle: "#000",
		  strokeWidth: 10,
		  x1: beginX, y1: beginY,
		  x2: endX, y2: endY
		});
		lineInProgress = false;
	}
  }


})}

function drawMyBezier(a1, b1) {

$("#mainCanvas").drawBezier({
  layer: true,
  strokeStyle: "#000",
  strokeWidth: 10,
  x1: a1, y1: b1, // Start point
  cx1: 200, cy1: 50, // Control point
  cx2: 50, cy2: 150, // Control point
  x2: 200, y2: 150, // Start/end point
  //cx3: 300, cy3: 150, // Control point
  //cx4: 150, cy4: 1, // Control point
  //x3: 350, y3: 50 // Start/end point
  draggable: true,
  
  /*
  click: function(layer) {
    // Spin star
    $(this).animateLayer(layer, {
      rotate: '+=360'
    });
  }
  */


});
  }


