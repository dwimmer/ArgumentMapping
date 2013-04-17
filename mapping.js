var selected;

function startDrag(e) {
	//alert("drag");
}

function enterDrag(e) {
	
}

function leaveDrag(e) {
	//alert("leave");
}

function endDrag(e) {
//	alert("end");
}

function overDrag(e) {
	e.preventDefault();
}

function unselectLayer(layer) {
	console.log(layer);
	if (layer.data.selected) {
		$("#mainCanvas").animateLayer(layer, {
  		shadowBlur: 0,
  		shadowColor: "blue",
		}, "medium");
		
		layer.data.selected = false;
	}
}

function removeSelected() {
	$("#mainCanvas").getLayers().forEach(function(layer, index, array) { 
		if (layer.data.selected) {
			$("#mainCanvas").removeLayer(layer).drawLayers();
		}
	});
}

function selectLayer(layer) {
	$("#mainCanvas").getLayers().forEach(function(element, index, array) {
		if (element != layer) {
			unselectLayer(element)
		}
	}, layer);

	$("#mainCanvas").animateLayer(layer, {
  		shadowBlur: 20,
  		shadowColor: "blue",
		}, "medium");
		
	layer.data.selected = true;
	$("#text").val(layer.data.text);
}

function updateModel() {
	$("#mainCanvas").getLayers().forEach(function(layer, index, array) {
		if (layer.data.selected) {
			layer.data.text = $(this).val();
		}
	}, this);
}

function updateSelected() {
	updateModel.call(this);
	updateView.call(this);
}

function updateView() {
	$("#mainCanvas").drawText({
		name: "test",
		layer: true,
  fillStyle: "#9cf",
  strokeStyle: "#25a",
  strokeWidth: 2,
  x: 150, y: 100,
  font: "24pt Verdana, sans-serif",
  maxWidth: 100,
  text: $(this).val()
});
console.log($("#mainCanvas").measureText("test"));
}

function drop(e) {
	$("#mainCanvas").drawRect({
		layer:true,
		x: e.originalEvent.pageX,
		y: e.originalEvent.pageY,
		height: 100,
		width: 100,
		strokeWidth: 1,
		strokeStyle: "black",
		draggable: true,
		fromCenter: true,
		data: {
			selected: false,
			text: "hello"
		},
		click: selectLayer
	});
	// $("#mainCanvas").drawRect({
		// layer:true,
		// x: e.originalEvent.pageX,
		// y: e.originalEvent.pageY+50,
		// height: 10,
		// width: 100,
		// fillStyle: "blue",
		// draggable: true,
	// });
}

window.onload = function() {

	$("#newBox").on("dragstart", startDrag);
	$("#newBox").on("dragend", endDrag);

	$("#mainCanvas").on("dragenter", enterDrag);
	$("#mainCanvas").on("dragleave", leaveDrag);
	$("#mainCanvas").on("dragover", overDrag);
	$("#mainCanvas").on("drop", drop);

	$("#remove").on("click", removeSelected);
	$("#text").on("change", updateSelected);

}