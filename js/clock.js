/**
 * Canvas clock.
 * Created by snowsolf(snowsolf@hotmail.com) on 2015/11/28.
 */

/**
 * 默认钟表圆心坐标
 * @type {number}
 */
var x = 105;
var y = 105;
/**
 * 钟表半径
 * @type {number}
 */
var radius = 90;
var pi = Math.PI;
window.onload = function() {
	var canvas = document.getElementById('canvas');
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	x = document.body.clientWidth / 2;
	y = document.body.clientHeight / 2;

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

/**
 * 初始化表盘，并设置表盘阴影，然后再把阴影去除。
 * @param canvas
 * @param ctx
 */
function initCanvas(canvas, ctx) {
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(canvas.width - x, canvas.height - y, x + canvas.width, y + canvas.height);
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * pi, true);
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

/**
 * 清除表盘内上一个动画内容，保留表盘刻度值
 * @param ctx
 */
function clearCanvasInside(ctx) {
	ctx.beginPath();
	ctx.arc(x, y, radius - 19, 0, 2 * pi, true);
	ctx.fillStyle = "#FFFFFF";
	ctx.fill();
}

/**
 * 表盘的中心点
 * @param ctx
 */
function drawCenterDot(ctx) {
	ctx.beginPath();
	ctx.arc(x, y, 4, 0, 2 * pi, true);
	ctx.fillStyle = "#000000";
	ctx.fill();
}

/**
 * 小时刻度
 * @param ctx
 */
function drawHourScale(ctx) {
	var hoursAngle = pi / 6;
	for(var i = 0; i < (2 * pi); i += hoursAngle) {
		drawScale(ctx, radius, i, 5, 15);
	}
}

/**
 * 分钟刻度
 * @param ctx
 */
function drawMinuteScale(ctx) {
	var minuteAngle = pi / 30;
	for(var i = 0; i < (2 * pi); i += minuteAngle) {
		drawScale(ctx, radius, i, 2, 6);
	}
}

/**
 * 刻度
 * @param ctx
 * @param radius
 * @param angle		刻度距离0角度的角度值
 * @param width		刻度宽度
 * @param length	刻度长度
 */
function drawScale(ctx, radius, angle, width, length) {
	var startX = (radius - length) * Math.sin(angle) + x;
	var startY = (radius - length) * Math.cos(angle) + y;
	var endX = radius * Math.sin(angle) + x;
	var endY = radius * Math.cos(angle) + y;

	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.lineWidth = width;
	ctx.strokeStyle = "#000000";
	ctx.stroke();

}

/**
 * 时针，以秒为单位
 * @param ctx
 * @param date
 */
function drawHourHand(ctx, date) {
	var angle = (-2) * pi *
		(date.getSeconds() + date.getMinutes() * 60 +
			(date.getHours() > 11 ? (date.getHours() - 12) : date.getHours()) * 3600
		) /	(3600 * 12);
	var endX = (radius - 40) * Math.sin(angle + pi) + x;
	var endY = (radius - 40) * Math.cos(angle + pi) + y;

	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(endX, endY);
	ctx.lineWidth = 6;
	ctx.strokeStyle = "#000000";
	ctx.stroke();
}

/**
 * 分针，以秒为单位
 * @param ctx
 * @param date
 */
function drawMinuteHand(ctx, date) {
	var angle = (-2) * pi * (date.getSeconds() + date.getMinutes() * 60) / 3600;
	var endX = (radius - 30) * Math.sin(angle + pi) + x;
	var endY = (radius - 30) * Math.cos(angle + pi) + y;

	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(endX, endY);
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#000000";
	ctx.stroke();
}

/**
 * 秒针，以毫秒为单位
 * @param ctx
 * @param date
 */
function drawSecondHand(ctx, date) {
	var angle = (-2) * pi * (date.getSeconds() * 1000 + date.getMilliseconds()) / (60 * 1000);
	var endX = (radius - 20) * Math.sin(angle + pi) + x;
	var endY = (radius - 20) * Math.cos(angle + pi) + y;

	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(endX, endY);
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#000000";
	ctx.stroke();
}