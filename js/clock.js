/**
 * Created by snowsolf(snowsolf@hotmail.com) on 2015/11/28.
 */

window.onload = function() {
	var canvas = document.getElementById('canvas');
	canvas.height = document.body.clientHeight;
	canvas.width = document.body.clientWidth;

	var context = canvas.getContext("2d");
	context.fillStyle = "#000000";
	context.fillRect(0, 0, canvas.width, canvas.height);
};