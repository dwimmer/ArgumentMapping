var selectedBox = null;

function removeSelectedBox() {
	selectedBox.destroy();
	stage.draw();
	
	selectedBox = null;	
	$("#text").val("");
}


function unselectBox() {
	if (selectedBox !== null) {
		selectedBox.get(".outline")[0].disableShadow();
		stage.draw();
	}
	
	selectedBox = null;	
	$("#text").val("");
}

function selectBox(box) {

	selectedBox = box;
	selectedBox.get(".outline")[0].enableShadow();
	stage.draw();
		
	$("#text").val(selectedBox.get(".content")[0].getText());
	$("#text").focus();
}

function toggleSelection(event) {
	if (selectedBox === this) {
		unselectBox();
	} else {
		unselectBox();
		selectBox(this);
	}
}

function updateView() {

	var text = selectedBox.get(".content")[0];
	
	text.setAttrs({
		text: $(this).val()
	});
	
	stage.draw();
  	
}

function createBox(x, y) {
	var rect = new Kinetic.Rect({
		name: "outline",
		height: 100,
		width: 200,
		strokeWidth: 1,
		stroke: "black",
		shadowEnabled: false,
		shadowColor: "blue"
	});
	
	var text = new Kinetic.Text({
		name: "content",
		fontFamily: "Open Sans",
		fontSize: 16,
		text: "New Box Content",
		fill: "black",
		width: rect.getWidth(),
		height: rect.getHeight()
		
	});
	
	var box = new Kinetic.Group({
		x: x,
		y: y,
		draggable: true,
	});
	
	box.on("click", toggleSelection);
	
	box.add(rect);
	box.add(text);
	
	layer.add(box);
	stage.draw();

}
