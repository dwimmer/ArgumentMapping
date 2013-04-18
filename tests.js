test( "Canvas Test", function() {
  ok( document.getElementById('mainCanvas'), "Main Canvas" );
  
});

test( "Button Test", function() {
  ok( document.getElementById('boxButton'), "Box Button" );
  
});


test( "New Box", 1, function() {
	$("#mainCanvas").on("dragover", overDrag);
	$("#mainCanvas").on("drop", function(e) {
		drop(e);
		ok(true, "Dropped Box");
	});
	
	$("#mainCanvas").trigger("drop");

})

test("rectangle!!!", 1, function() {
 	var button = $("#boxButton");
 
	button.on( "click", function() {
		ok( true, "button was clicked!");
	});
		
	button.trigger("click");

});

test( 'drawMyBezier()', function() {
	ok( drawMyBezier(2, 3), "Bezier");
	//not really a test... more proof of drawing
});