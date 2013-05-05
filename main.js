var stage;
var layer;

$(window).on("load", function() {

	$("#newPremise").on("dragstart", function(e) {
		e.originalEvent.dataTransfer.setData("Type", "premise");
	});
	
	$("#newRebuttal").on("dragstart", function(e) {
		e.originalEvent.dataTransfer.setData("Type", "rebuttal");
	});

	$("#stage-container").on("dragover", function(e) {
		if (e.originalEvent.dataTransfer.getData("Type")) {
			e.preventDefault();
		}
	});
	
	$("#stage-container").on("drop", function(e) {
		e.preventDefault();
		var x = e.originalEvent.pageX - $(e.target).offset().left;
		var y = e.originalEvent.pageY - $(e.target).offset().top;
		var type = e.originalEvent.dataTransfer.getData("Type");
		createBox(x, y, type);
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
	
	$('a[href="#save"]').on("click", function(e) {
	    var json = stage.toJSON();
    	var textFileAsBlob = new Blob([json], {type:'text/json'});
	    var link = document.createElement("a");
	    link.download = "File.json";
	    link.href = window.webkitURL.createObjectURL(textFileAsBlob);
	 
	    link.target = "_blank";
				
	    var evObj = document.createEvent("MouseEvent");
	    evObj.initEvent("click", true, false);
					
	    link.dispatchEvent(evObj);
	});
	    

    $('a[href="#load"]').on("click", function(e) {
		stage.remove();
    	var fileToLoad = document.getElementById("fileToLoad").files[0];
    	var fileReader = new FileReader();
    	fileReader.onload = function(fileLoadedEvent) {
        	var textFromFileLoaded = fileLoadedEvent.target.result;

    		stage = Kinetic.Node.create(textFromFileLoaded, 'stage-container');
    		layer = stage.getChildren()[0];
    	
    		layer.getChildren().forEach(function(box) {
    			box.on("mousedown", toggleSelection);
				box.on("dblclick", lineAttempt);
				box.on("dragmove", function() {
						updateLines(this);
				});
    		});
    	
    		stage.draw();
    	};
    	fileReader.readAsText(fileToLoad, "UTF-8");
   });
	 
	  
	stage = new Kinetic.Stage({
		container: 'stage-container',
		width: 2560,
		height: 1600,
	});
	
	layer = new Kinetic.Layer();
	
	stage.add(layer);

});
