test( "Canvas Test", function() {
  ok( document.getElementById('mainCanvas'), "Passed!" );
  
});

test( "Canvas Test", function() {
  ok( document.getElementById('boxButton'), "Button!" );
  
});

test("rectangle!!!", function() {
 var $button = $("boxButton");
	$button.on( "click", function() {
		ok( true, "button was clicked!");
		});
		
	$button.trigger("click");

  ok( document.getElementById("mainCanvas"), "Passed!" );
});

test( 'drawDefaultBezier()', function() {
	ok( drawDefaultBezier(2, 3), "Passed!");
	//not really a test... more proof of drawing
});