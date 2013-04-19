var selectedBox = null;
var boxId = 1;

function startDrag(e) {
	e.originalEvent.dataTransfer.setData("text/plain", "Text to drag");
}

function enterDrag(e) {
}

function leaveDrag(e) {
}

function endDrag(e) {
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
	$("#text").val("No Selection.");
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
	$("#mainCanvas").removeLayer("TextForBox" + selectedBox.data.id);
	
	$("#mainCanvas").drawText({
		name: "TextForBox" + selectedBox.data.id,
		layer: true,
		fillStyle: "#9cf",
		strokeStyle: "#25a",
		strokeWidth: 2,
		x: selectedBox.x, y: selectedBox.y,
		font: "16pt Verdana, sans-serif",
		maxWidth: selectedBox.width,
		text: $(this).val()
	});
	selectedBox.data.textview = $("#mainCanvas").getLayer("TextForBox" + selectedBox.data.id);
	
	$("#mainCanvas").setLayer(selectedBox, {
		width: $("#mainCanvas").measureText("TextForBox" + selectedBox.data.id).width + 15,
		height: $("#mainCanvas").measureText("TextForBox" + selectedBox.data.id).height + 15,
  	}).drawLayers();
  	
}

function drop(e) {
	e.preventDefault();

	$(e.target).drawRect({
		layer:true,
		x: e.originalEvent.pageX - $(e.target).offset().left,
		y: e.originalEvent.pageY - $(e.target).offset().top,
		height: 100,
		width: 200,
		strokeWidth: 1,
		strokeStyle: "black",
		shadowColor: "white",
		draggable: true,
		fromCenter: true,
		data: {
			moving: false,
			textview: null,
			id: ++boxId
		},
		dragstart: function(layer) {
			/* layer.data.moving = true; */
		},
		drag: function(layer) {
			layer.data.moving = true;
			if (layer.data.textview !== null) {
				layer.data.textview.x = layer.x;
				layer.data.textview.y = layer.y;
			}
		},
		dragstop: function(layer) {
			/* layer.data.moving = false; */
		},
		click: function(layer) {
			if (layer.data.moving === false) {
				toggleSelection.call(this, layer);
			} else {
				layer.data.moving = false;
			}
			
		}
	});
}
