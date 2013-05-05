var stage;
var layer;

module( "Canvas", {
	setup: function() {
		stage = new Kinetic.Stage({
        	container: 'stage-container',
        	width: 1024,
        	height: 768,
        	draggable: true
        });

        layer = new Kinetic.Layer();
      
        stage.add(layer);
	},
	teardown: function() {
		// clean up after each test
	}
});

test( "Canvas Test", function() {
	ok(stage, "does stage exist?");  
});


test("Box Creation Test", function() {
	var premise = createBox(20,20);
	
	ok(premise, "Box object exists.");
	notEqual(layer.getChildren().indexOf(premise), -1, "Box is on the canvas.");
	equal(premise.getX(), 20, "Box x coordinate.")
	equal(premise.getY(), 20, "Box y coordinate.")
})

test( "Line Creation Test", function() {
	var box1 = createBox(0,0);
	var box2 = createBox(100,100);
	var line = createConnector(box1,box2);
	
	var box1centerx = 0 + box1.get(".outline")[0].getWidth() / 2;
	var box1centery = 0 + box1.get(".outline")[0].getHeight() / 2;
	var box2centerx = 100 + box2.get(".outline")[0].getWidth() / 2;
	var box2centery = 100 + box2.get(".outline")[0].getHeight() / 2;
	
	ok(line, "Line object exists.");
	notEqual(layer.getChildren().indexOf(line), -1, "Line is on the canvas.");
	equal(line.getPoints()[0].x, box1centerx, "Line start x value.")
	equal(line.getPoints()[0].y, box1centery, "Line start y value.")
	equal(line.getPoints()[1].x, box2centerx, "Line end x value.")
	equal(line.getPoints()[1].y, box2centery, "Line end y value.")
});

test("Box Removal Test", function() {
    var box = createBox(0,0);
    
    selectBox(box);
    equal(selectedBox, box, "Box is selected");
    removeSelectedBox()
    equal(layer.getChildren().indexOf(box), -1, "Box is deleted");
});

test("Box Toggle Test", function() {
    var box1 = createBox(20,20);
    var box2 = createBox(20,20);
    
    equal(selectedBox, null, "Box 1 is not selected");
    equal(box1.getZIndex(), 0, "Box 1 is not in the front.")
    
    toggleSelection(box1);
    
    equal(selectedBox, box1, "Box 1 is selected");
    equal(box1.getZIndex(), 1, "Box 1 is in the front.")
    
    toggleSelection(box1);
    
    equal(selectedBox, null, "Box 1 is unselected");
});

test("Line Drag Test", function() {
	var box1 = createBox(0,0);
	var box2 = createBox(100,100);
	var line = createConnector(box1,box2);
	
	box1.setX(53);
	box1.setY(27);
	
	var box1centerx = 53 + box1.get(".outline")[0].getWidth() / 2;
	var box1centery = 27 + box1.get(".outline")[0].getHeight() / 2;
	
	updateLines(box1);
	equal(line.getPoints()[0].x, box1centerx, "Line start x coordinate");
	equal(line.getPoints()[0].y, box1centery, "Line start y coordinate");
});

test("Box Resize Test", 3, function() {
	var box = createBox(0,0);
	selectBox(box);
	updateWidth(300);
	
	selectedBox.getChildren().forEach(function(child) {
		equal(child.getWidth(), 300, child.getName() + " width matches input");
	},this);
	
});

test( "Update Text View Test", function() {
	var box = createBox(0,0);
	selectBox(box);
	//make sure textHeight < minHeight is still minHeight
	updateTextView("line1");
	fontSize = selectedBox.get('.content')[0].getFontSize();
	selectedBox.getChildren().forEach(function(child) {
		if (child.getName() == "content")
			equal(child.getHeight(), fontSize * 1, child.getName() + " height is one line");
		else
			equal(child.getHeight(), fontSize * 3, child.getName() + " height is minHeight when content is one line");
	},this);
	
	//make sure size can be bigger than minHeight
	updateTextView("line1\nline2\nline3\nline4");
	selectedBox.getChildren().forEach(function(child) {
		equal(child.getHeight(), fontSize * 4, child.getName() + " height greater than minHeight when content is 4 lines");
	},this);
	
});
test("Edit Box Text Test:", 2, function() {
	var box1 = createBox(0,0);
	equal(box1.get(".content")[0].getText(), "New Box Content","Initial Text is 'New Box Content'" );
	selectBox(box1);
	updateTextView("Hello")
	equal(box1.get(".content")[0].getText(), "Hello","Updated text not equal to 'Hello'" );


});
