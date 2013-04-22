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
	$("#mainCanvas").removeLayerGroup(selectedBox.group).drawLayers();
}


function unselectLayer() {
	if (selectedBox !== null) {
		$(this).animateLayer(selectedBox, {
	  		shadowBlur: 0,
	  		shadowColor: "blue",
		}, "medium");
	}
	
	selectedBox = null;	
	$("#text").val("No Selection.");
}

function selectLayer(layer) {
	selectedBox = layer;
	$(this).animateLayer(layer, {
  		shadowBlur: 20,
  		shadowColor: "blue",
		}, "medium");
		
	var text = $(this).getLayerGroup(selectedBox.group)[0];
	$("#text").val(text.text);
}

function toggleSelection(layer) {
	if (selectedBox === layer) {
		unselectLayer.call(this);
	} else {
		unselectLayer.call(this);
		selectLayer.call(this, layer);
	}
}

function updateView() {

	var text = $("#mainCanvas").getLayerGroup(selectedBox.group)[0];
	
	$("#mainCanvas").setLayer(text, {
		maxWidth: selectedBox.width,
		text: $(this).val(),
	});
	
	$("#mainCanvas").setLayer(selectedBox, {
		width: $("#mainCanvas").measureText(text).width + 15,
		height: $("#mainCanvas").measureText(text).height + 15,
  	}).drawLayers();
  	
}

function drop(e) {
	e.preventDefault();

	var curBoxId = boxId++;

	$(e.target).addLayer({
		name: "TextForBox" + curBoxId,
		group: "Box" + curBoxId,
		type: "text",
		fillStyle: "black",
		fontSize: "16pt",
		fontFamily: "Open Sans, sans-serif",
		maxWidth: 200,
		text: ""

	})

	$(e.target).addLayer({
		type: "rectangle",
		group: "Box" + curBoxId,
		height: 100,
		width: 200,
		strokeWidth: 1,
		strokeStyle: "black",
		shadowColor: "white",
		draggable: true,
		fromCenter: true,
		data: {
			moving: false,
		},
		drag: function(layer) {
			layer.data.moving = true;
			var text = $(this).getLayerGroup(layer.group)[0];
			$(this).setLayer(text, {
				x: layer.x,
				y: layer.y
			});
		},
		click: function(layer) {
			if (layer.data.moving === false) {
				toggleSelection.call(this, layer);
			} else {
				layer.data.moving = false;
			}
			
		}
	});
	
	$(e.target).setLayerGroup("Box" + curBoxId, {
		x: e.originalEvent.pageX - $(e.target).offset().left,
		y: e.originalEvent.pageY - $(e.target).offset().top,
	})
	
}
