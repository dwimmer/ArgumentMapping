function drawBox(){
$("#mainCanvas").drawRect({
  strokeStyle: "#36a",
  strokeWidth: 3,
  x: 150, y: 100,
  width: 200,
  height: 100,
  cornerRadius: 10,
  draggable: true,
  fromCenter: true,
});
}