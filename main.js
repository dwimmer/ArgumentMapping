$(window).on("load", function() {

	$("#newBox").on("dragstart", startDrag);
	$("#newBox").on("dragend", endDrag);

	$("#mainCanvas").on("dragenter", enterDrag);
	$("#mainCanvas").on("dragleave", leaveDrag);
	$("#mainCanvas").on("dragover", overDrag);
	$("#mainCanvas").on("drop", drop);

	$("#remove").on("click", removeSelected);
	$("#text").on("change", updateSelected);

});