var stage;
var layer;

$(window).on("load", function() {

	$("#newPremise").on("dragstart", function(e) {
		e.originalEvent.dataTransfer.setData("Color", "rgb(128,192,128)");
	});
	
	$("#newRebuttal").on("dragstart", function(e) {
		e.originalEvent.dataTransfer.setData("Color", "rgb(255,128,128)");
	});

	$("#stage-container").on("dragover", function(e) {
		if (e.originalEvent.dataTransfer.getData("Color")) {
			e.preventDefault();
		}
	});
	
	$("#stage-container").on("drop", function(e) {
		e.preventDefault();
		var x = e.originalEvent.pageX - $(e.target).offset().left;
		var y = e.originalEvent.pageY - $(e.target).offset().top;
		var color = e.originalEvent.dataTransfer.getData("Color");
		createBox(x, y, color);
		stage.draw();
	});

	$("#remove").on("click", removeSelectedBox);
	$("#text").on("keyup", function() {
		updateTextView($(this).val());
	});
	$("#width").on("change", function(){
		updateWidth($(this).val());
	});
	
	$('a[href="#export"]').on("click", function(e) {
		unselectBox();
		stage.draw();
		stage.toDataURL({
			callback: function(dataURL) {
				var link = document.createElement("a");
				link.download = "canvas.png";
				link.href = dataURL;
				link.target = "_blank";
				
				var evObj = document.createEvent("MouseEvent");
				evObj.initEvent("click", true, false);
				
				link.dispatchEvent(evObj);
/* 				link.click(); */
			}
		});
		return false;
	});

	stage = new Kinetic.Stage({
		container: 'stage-container',
		width: 2560,
		height: 1600,
	});
	
	layer = new Kinetic.Layer();
	
	stage.add(layer);

});
