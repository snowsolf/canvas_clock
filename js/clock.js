/**
 * Created by snowsolf(snowsolf@hotmail.com) on 2015/11/28.
 */

var radius = 100;
window.onload = function() {
	var canvas = document.getElementById('canvas');
	canvas.height = document.body.clientHeight;
	canvas.width = document.body.clientWidth;

	var ctx = canvas.getContext("2d");

	setInterval(function () {
		initCanvas(canvas, ctx);
		drawCenterDot(ctx);
		drawHourScale(ctx);
		drawMinuteScale(ctx);
		var date = new Date();
		drawHourHand(ctx, date);
		drawMinuteHand(ctx, date);
		drawSecondHand(ctx, date);
	}, 1000);
};

function initCanvas(canvas, ctx) {
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.arc(200, 200, radius, 0, 2 * Math.PI, true);
	ctx.shadowOffsetX = 8;
	ctx.shadowOffsetY = 8;
	ctx.shadowBlur = 20;
	ctx.shadowColor = "#494844";
	ctx.fillStyle = "#000000";
	ctx.fill();
}

function drawCenterDot(ctx) {
	ctx.beginPath();
	ctx.arc(200, 200, 4, 0, 2 * Math.PI, true);
	ctx.fillStyle = "#FFFFFF";
	ctx.fill();
}

function drawHourScale(ctx) {
	var hoursAngle = Math.PI / 6;
	for(var i = 0; i < (2 * Math.PI); i += hoursAngle) {
		drawScale(ctx, radius, i, 5, 15);
	}
}

function drawMinuteScale(ctx) {
	var minuteAngle = Math.PI / 30;
	for(var i = 0; i < (2 * Math.PI); i += minuteAngle) {
		drawScale(ctx, radius, i, 2, 6);
	}
}

function drawScale(ctx, radius, angle, width, length) {
	var startX = (radius - length) * Math.sin(angle) + 200;
	var startY = (radius - length) * Math.cos(angle) + 200;
	var endX = radius * Math.sin(angle) + 200;
	var endY = radius * Math.cos(angle) + 200;

	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.lineWidth = width;
	ctx.strokeStyle = "#FFFFFF";
	ctx.stroke();

}

function drawHourHand(ctx, date) {
	var angle = (-2) * Math.PI *
		(date.getSeconds() + date.getMinutes() * 60 +
			(date.getHours() > 11 ? (date.getHours() - 12) : date.getHours()) * 3600
		) /
		(3600 * 12);
	var endX = (radius - 50) * Math.sin(angle + Math.PI) + 200;
	var endY = (radius - 50) * Math.cos(angle + Math.PI) + 200;

	ctx.beginPath();
	ctx.moveTo(200, 200);
	ctx.lineTo(endX, endY);
	ctx.lineWidth = 6;
	ctx.strokeStyle = "#FFFFFF";
	ctx.stroke();
}

function drawMinuteHand(ctx, date) {
	var angle = (-2) * Math.PI * (date.getSeconds() + date.getMinutes() * 60) / 3600;
	var endX = (radius - 30) * Math.sin(angle + Math.PI) + 200;
	var endY = (radius - 30) * Math.cos(angle + Math.PI) + 200;

	ctx.beginPath();
	ctx.moveTo(200, 200);
	ctx.lineTo(endX, endY);
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#FFFFFF";
	ctx.stroke();
}

function drawSecondHand(ctx, date) {
	var angle = (-1) * Math.PI * date.getSeconds() / 30;
	var endX = (radius - 20) * Math.sin(angle + Math.PI) + 200;
	var endY = (radius - 20) * Math.cos(angle + Math.PI) + 200;

	ctx.beginPath();
	ctx.moveTo(200, 200);
	ctx.lineTo(endX, endY);
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#FFFFFF";
	ctx.stroke();
}