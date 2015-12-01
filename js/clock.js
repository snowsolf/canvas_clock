/**
 * Canvas clock.
 * Created by snowsolf(snowsolf@hotmail.com) on 2015/11/28.
 */

var radius = 90;
var pi = Math.PI;
window.onload = function() {
	var canvas = document.getElementById('canvas');
	canvas.height = 210;
	canvas.width = 210;

	var ctx = canvas.getContext("2d");
	initCanvas(canvas, ctx);
	drawHourScale(ctx);
	drawMinuteScale(ctx);

	setInterval(function () {
		clearCanvasInside(ctx);
		drawCenterDot(ctx);
		var date = new Date();
		drawHourHand(ctx, date);
		drawMinuteHand(ctx, date);
		drawSecondHand(ctx, date);
	}, 50);
};

function initCanvas(canvas, ctx) {
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.arc(105, 105, radius, 0, 2 * pi, true);
	ctx.shadowOffsetX = 5;
	ctx.shadowOffsetY = 5;
	ctx.shadowBlur = 20;
	ctx.shadowColor = "#494844";
	ctx.fillStyle = "#FFFFFF";
	ctx.fill();
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
	ctx.shadowBlur = 0;
	ctx.shadowColor = "#FFFFFF";
}

function clearCanvasInside(ctx) {
	ctx.beginPath();
	ctx.arc(105, 105, radius - 19, 0, 2 * pi, true);
	ctx.fillStyle = "#FFFFFF";
	ctx.fill();
}

function drawCenterDot(ctx) {
	ctx.beginPath();
	ctx.arc(105, 105, 4, 0, 2 * pi, true);
	ctx.fillStyle = "#000000";
	ctx.fill();
}

function drawHourScale(ctx) {
	var hoursAngle = pi / 6;
	for(var i = 0; i < (2 * pi); i += hoursAngle) {
		drawScale(ctx, radius, i, 5, 15);
	}
}

function drawMinuteScale(ctx) {
	var minuteAngle = pi / 30;
	for(var i = 0; i < (2 * pi); i += minuteAngle) {
		drawScale(ctx, radius, i, 2, 6);
	}
}

function drawScale(ctx, radius, angle, width, length) {
	var startX = (radius - length) * Math.sin(angle) + 105;
	var startY = (radius - length) * Math.cos(angle) + 105;
	var endX = radius * Math.sin(angle) + 105;
	var endY = radius * Math.cos(angle) + 105;

	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.lineWidth = width;
	ctx.strokeStyle = "#000000";
	ctx.stroke();

}

function drawHourHand(ctx, date) {
	var angle = (-2) * pi *
		(date.getSeconds() + date.getMinutes() * 60 +
			(date.getHours() > 11 ? (date.getHours() - 12) : date.getHours()) * 3600
		) /	(3600 * 12);
	var endX = (radius - 40) * Math.sin(angle + pi) + 105;
	var endY = (radius - 40) * Math.cos(angle + pi) + 105;

	ctx.beginPath();
	ctx.moveTo(105, 105);
	ctx.lineTo(endX, endY);
	ctx.lineWidth = 6;
	ctx.strokeStyle = "#000000";
	ctx.stroke();
}

function drawMinuteHand(ctx, date) {
	var angle = (-2) * pi * (date.getSeconds() + date.getMinutes() * 60) / 3600;
	var endX = (radius - 30) * Math.sin(angle + pi) + 105;
	var endY = (radius - 30) * Math.cos(angle + pi) + 105;

	ctx.beginPath();
	ctx.moveTo(105, 105);
	ctx.lineTo(endX, endY);
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#000000";
	ctx.stroke();
}

function drawSecondHand(ctx, date) {
	var angle = (-2) * pi * (date.getSeconds() * 1000 + date.getMilliseconds()) / (60 * 1000);
	var endX = (radius - 20) * Math.sin(angle + pi) + 105;
	var endY = (radius - 20) * Math.cos(angle + pi) + 105;

	ctx.beginPath();
	ctx.moveTo(105, 105);
	ctx.lineTo(endX, endY);
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#000000";
	ctx.stroke();
}