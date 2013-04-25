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
	ok( stage, "does stage exist?" );  
});

test( "Line Creation Test", function() {
	box1 = createBox(0,0);
	box2 = createBox(100,100);
	
	ok(!lineInProgress, "line not in progress");
	lineAttempt.call(box1);
	ok(lineInProgress, "line in progress");
	lineAttempt.call(box2);
	ok(!lineInProgress, "line finished");
});