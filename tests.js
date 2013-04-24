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
