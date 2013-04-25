var stage;
var layer;

$(window).on("load", function() {

	$("#newBox").on("dragstart", function(e) {
		e.originalEvent.dataTransfer.setData("text/plain", "Text to drag");
	});

	$("#stage-container").on("dragover", function(e) {
		e.preventDefault();
	});
	
	$("#stage-container").on("drop", function(e) {
		e.preventDefault();
		var x = e.originalEvent.pageX - $(e.target).offset().left;
		var y = e.originalEvent.pageY - $(e.target).offset().top;
		createBox(x, y);
		stage.draw();
	});

	$("#remove").on("click", removeSelectedBox);
	$("#text").on("keyup", updateView);
	
	$('a[href="#export"]').on("click", function(e) {
		unselectBox();
		stage.toDataURL({
			callback: function(dataURL) {
				window.open(dataURL, "Canvas Image");
			}
		});
		return false;
	});

	stage = new Kinetic.Stage({
		container: 'stage-container',
		width: 1024,
		height: 768,
		draggable: true
	});
	
	layer = new Kinetic.Layer();
	
	stage.add(layer);

});
