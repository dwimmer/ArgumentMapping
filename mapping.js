var selectedBox = null;

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

function removeSelected() {
	$("#mainCanvas").removeLayer(selectedBox).drawLayers();
}


function unselectLayer() {
	if (selectedBox !== null) {
		this.animateLayer(selectedBox, {
	  		shadowBlur: 0,
	  		shadowColor: "blue",
		}, "medium");
	}

	selectedBox = null;	
}

function selectLayer(layer) {
	selectedBox = layer;
	this.animateLayer(layer, {
  		shadowBlur: 20,
  		shadowColor: "blue",
		}, "medium");
		
	
	$("#text").val(layer.data.text);
}

function toggleSelection(layer) {
	//alert("click");
	if (layer.data.moving === true) {
		return;
	}
	var canvas = $(this);
	if (selectedBox === layer) {
		unselectLayer.call(canvas);
	} else {
		unselectLayer.call(canvas);
		selectLayer.call(canvas, layer);
	}
}

function updateModel() {
	selectedBox.data.text = $(this).val();
}

function updateSelected() {
	updateModel.call(this);
	updateView.call(this);
}

function updateView() {
	$("#mainCanvas").removeLayer("TextForBox" + selectedBox.id);
	
	$("#mainCanvas").drawText({
		name: "TextForBox" + selectedBox.id,
		layer: true,
		fillStyle: "#9cf",
		strokeStyle: "#25a",
		strokeWidth: 2,
		x: selectedBox.x, y: selectedBox.y,
		font: "16pt Verdana, sans-serif",
		maxWidth: selectedBox.width,
		text: $(this).val()
	});
	selectedBox.data.textview = $("#mainCanvas").getLayer("TextForBox" + selectedBox.id);
	
	$("#mainCanvas").setLayer(selectedBox, {
		width: $("#mainCanvas").measureText("TextForBox" + selectedBox.id).width + 5,
		height: $("#mainCanvas").measureText("TextForBox" + selectedBox.id).height + 5,
  	}).drawLayers();
  	
console.log($("#mainCanvas").measureText("TextForBox" + selectedBox.id));
}

function drop(e) {
	$(e.target).drawRect({
		layer:true,
		x: e.originalEvent.pageX - $(e.target).offset().left,
		y: e.originalEvent.pageY - $(e.target).offset().top,
		height: 100,
		width: 200,
		strokeWidth: 1,
		strokeStyle: "black",
		draggable: true,
		fromCenter: true,
		data: {
			text: "hello",
			moving: false,
		},
		drag: function(layer) {
			layer.data.moving = true;
			layer.data.textview.x = layer.x;
			layer.data.textview.y = layer.y;
			//$(this).drawLayer(layer.data.textview);
		},
		dragstop: function(layer) {
			//alert("done");
			layer.data.moving = false;
		},
		click: toggleSelection
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