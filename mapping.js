var selectedBox = null;


var lineStartBox = null;
var lineInProgress = false;

var id = 0;


function removeSelectedBox() {
	selectedBox.getAttrs().startLineArray.forEach(function(lineId) {
		var line = layer.get("#"+ lineId)[0];
		var endBox = layer.get("#" + line.getAttrs().endBox)[0];
		var index = endBox.getAttrs().endLineArray.indexOf(lineId);
		endBox.getAttrs().endLineArray.splice(index,1);
		line.destroy();
	});
	
	selectedBox.getAttrs().endLineArray.forEach(function(lineId) {
		var line = layer.get("#"+ lineId)[0];
		var startBox = layer.get("#" + line.getAttrs().startBox)[0];
		var index = startBox.getAttrs().startLineArray.indexOf(lineId);
		startBox.getAttrs().startLineArray.splice(index,1);
		line.destroy();
	});

	selectedBox.destroy();
	stage.draw();
	
	selectedBox = null;	
	$("#text").val("");
	$("#width").val("");
}


function unselectBox() {
	if (selectedBox !== null) {
		selectedBox.get(".outline")[0].disableShadow();
	}
	
	selectedBox = null;	
	$("#text").val("");
	$("#width").val("");
}

function selectBox(box) {

	selectedBox = box;
	selectedBox.get(".outline")[0].enableShadow();
	
		
	$("#text").val(selectedBox.get(".content")[0].getText());
	$("#text").focus();
	$("#width").val(selectedBox.get(".content")[0].getWidth());
}

function toggleSelection(box) {
	if (selectedBox === box) {
		unselectBox();
	} else {
		unselectBox();
		selectBox(box);
		box.moveToTop();
	}
	stage.draw();
}

function updateTextView(textString) {

	var text = selectedBox.get(".content")[0];
	
	text.setAttrs({
		text: textString
	});
	
	resizeText(selectedBox);
	
	stage.draw();
  	
}

function resizeText(box) {
	var textHeight = box.get(".content")[0].getHeight();
	var minHeight = box.get(".content")[0].getTextHeight() * 3;
	
	if (textHeight > minHeight) {
		box.get(".outline")[0].setHeight(textHeight);
		box.get(".background")[0].setHeight(textHeight);
	} else {
		box.get(".outline")[0].setHeight(minHeight);
		box.get(".background")[0].setHeight(minHeight);
	}
}

function updateWidth(width) {

	selectedBox.getChildren().forEach(function(child) {
		child.setWidth(width);
	},this);
	
	resizeText(selectedBox);
	updateLines(selectedBox);
	
	stage.draw();
  	
}

function createBox(x, y, type) {
	var width = 200;
	
	var text = new Kinetic.Text({
		name: "content",
		fontFamily: "Open Sans",
		fontSize: 16,
		text: "New Box Content",
		fill: "black",
		width: width,
	});
	
	var minHeight = text.getTextHeight() * 3;

	var outline = new Kinetic.Rect({
		name: "outline",
		width: width,
		height: minHeight,
		strokeWidth: 2,
		stroke: "black",
		shadowEnabled: false,
		shadowColor: "blue",
	});
	
	var color;
	if (type == "premise")
		color = "rgb(128,192,128)";
	else if (type == "rebuttal")
		color = "rgb(255,128,128)";
	
	var background = new Kinetic.Rect({
		name: "background",
		width: width,
		height: minHeight,
		fill: color
	});
	

	
	var box = new Kinetic.Group({
		x: x,
		y: y,
		draggable: true,
		type: type,
		id: id++,
		startLineArray: [],
		endLineArray: [],
	});
	
	box.on("mousedown", function(){
		toggleSelection(this);
	});
	box.on("dblclick", lineAttempt);
	box.on("dragmove", function() {
		updateLines(this);
	});
	
	box.add(outline);
	box.add(background);
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
			id: id++,
			points: [startPoint, endPoint],
			stroke: 'green',
			startBox: lineStartBox.getId(),
			endBox: lineEndBox.getId(),
		});
		
		layer.add(line);
		line.moveToBottom();
		
		lineStartBox.getAttrs().startLineArray.push(line.getId());
		lineEndBox.getAttrs().endLineArray.push(line.getId());
		
		return line;
}

function updateLines(box) {

	box.getAttrs().startLineArray.forEach(function(lineId) {
		var line = layer.get("#"+ lineId)[0];
		//update start points
		var pointsArray = line.getPoints();
		pointsArray[0].x = this.getX() + this.get(".outline")[0].getWidth() / 2;
		pointsArray[0].y = this.getY() + this.get(".outline")[0].getHeight() / 2;
		line.setPoints(pointsArray);
	}, box);
	
	box.getAttrs().endLineArray.forEach(function(lineId) {
		var line = layer.get("#"+ lineId)[0];
		//update end points
		var pointsArray = line.getPoints();
		pointsArray[1].x = this.getX() + this.get(".outline")[0].getWidth() / 2;
		pointsArray[1].y = this.getY() + this.get(".outline")[0].getHeight() / 2;
		line.setPoints(pointsArray);
	}, box);
	
	stage.draw();
	
}
