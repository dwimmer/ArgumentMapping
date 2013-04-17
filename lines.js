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