var selectedBox = null;


var lineStartBox = null;
var lineInProgress = false;


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
		fill: "white",
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
		draggable: true
	});
	
	box.startLineArray = [];
	box.endLineArray = [];
	box.on("click", toggleSelection);
	box.on("dblclick", lineAttempt);
	box.on("dragmove", updateLines);
	
	box.add(rect);
	box.add(text);
	
	layer.add(box);
	
	return box;
}

function lineAttempt() {

	if (lineInProgress == false) {
		lineStartBox = this;
		lineInProgress = true;

	} else {
		var line = createConnector(lineStartBox, this);
		stage.draw();
		lineInProgress = false;
		lineStartBox = null;
		

	}
	
}

function createConnector(lineStartBox, lineEndBox) {
		var startPoint = {
			x: lineStartBox.getX() + lineStartBox.get(".outline")[0].getWidth() / 2,
			y: lineStartBox.getY() + lineStartBox.get(".outline")[0].getHeight() / 2
		};
		
		var endPoint = {
			x: lineEndBox.getX() + lineEndBox.get(".outline")[0].getWidth() / 2,
			y: lineEndBox.getY() + lineEndBox.get(".outline")[0].getHeight() / 2
		};

		var line = new Kinetic.Line({
			points: [startPoint, endPoint],
			stroke: 'green',
			draggable: true
		});
		
		layer.add(line);
		line.moveToBottom();
		
		lineStartBox.startLineArray.push(line);
		lineEndBox.endLineArray.push(line);
		
		return line;
}

function updateLines() {

	this.startLineArray.forEach(function(line) {
		//update start points
		var pointsArray = line.getPoints();
		pointsArray[0].x = this.getX() + this.get(".outline")[0].getWidth() / 2;
		pointsArray[0].y = this.getY() + this.get(".outline")[0].getHeight() / 2;
		line.setPoints(pointsArray);
	}, this);
	
	this.endLineArray.forEach(function(line) {
		//update end points
		var pointsArray = line.getPoints();
		pointsArray[1].x = this.getX() + this.get(".outline")[0].getWidth() / 2;
		pointsArray[1].y = this.getY() + this.get(".outline")[0].getHeight() / 2;
		line.setPoints(pointsArray);
	}, this);
	
	stage.draw();
	
}
