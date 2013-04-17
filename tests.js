test( "Canvas Test", function() {
  ok( document.getElementById("mainCanvas"), "Passed!" );
});

test( 'drawDefaultBezier()', function() {
	ok( drawDefaultBezier(2, 3), "Passed!");
});