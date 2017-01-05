window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame || function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();



var resizeTimeout = false;
var canvas, ctx;
var stars = [];
var maxNumber = 0;
var mouse = {
	x: 0,
	y: 0,
	moved: true
};
var moveSpeed = 0;
var moveTo = false;
var moveToState = 0;
var op = 0;

var mouseoverTimeout = false;

var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false

var mouseDetected = false;





var oldWidth = 0;

var resize = function() {

	if(iOS && window.innerWidth == oldWidth){ return;}

	oldWidth = window.innerWidth;


	ctx.clearRect(0, 0, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);

	canvas.style['height'] = '0px';
	op = 0;
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(function() {
		canvas.width = window.innerWidth * window.devicePixelRatio;
		canvas.height = window.innerHeight * window.devicePixelRatio;

		canvas.style['height'] = window.innerHeight+'px';

	}, 200);






	maxNumber = Math.round(window.innerWidth * window.innerHeight * .00020);
	createStars();
};


var createStars = function() {
	stars = [];
	var w = window.innerWidth * window.devicePixelRatio;
	var h = window.innerHeight * window.devicePixelRatio;
	var now = new Date().getTime();

	for (i = 0; i < maxNumber; i++) {
		stars.push({
			x: (-w * .1) + Math.random() * (w * 1.2),
			y: (-h * .1) + Math.random() * (h * 1.2),
			radius: .1 + Math.random() * 3.8,
			depth: .1 + Math.random() * 2,
			moveBy: false,
			lifetime: now+2000+(Math.random()*4000),
			opac:1
		});
	}


};



var easeOutCirc = function(t, b, c, d) {
	t /= d;
	t--;
	return c * Math.sqrt(1 - t * t) + b;
};
var easeInCirc = function(t, b, c, d) {
	t /= d;
	return -c * (Math.sqrt(1 - t * t) - 1) + b;
};
var easeInOutCirc = function(t, b, c, d) {
	t /= d / 2;
	if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	t -= 2;
	return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
};
var pointDistance = function(point1, point2) {
	var xs = point2.x - point1.x;
	var ys = point2.y - point1.y;
	xs = xs * xs;
	ys = ys * ys;
	return Math.sqrt(xs + ys);
};
var pointDelta = function(point1, point2) {
	var dx = point2.x - point1.x;
	var dy = point2.y - point1.y;
	return {
		x: dx,
		y: dy
	};
};
var setMoveTo = function() {
	var diagonale = pointDistance({
		x: 0,
		y: 0
	}, {
		x: window.innerWidth * window.devicePixelRatio,
		y: window.innerHeight * window.devicePixelRatio
	});

	moveSpeed = 1 / diagonale / window.devicePixelRatio;
	for (i = 0; i < stars.length; i++) {
		var maxX = window.innerWidth * window.devicePixelRatio * .05;
		var maxY = window.innerHeight * window.devicePixelRatio * .05;
		var deltaX = (mouse.x - (window.innerWidth * .5)) / (window.innerWidth * .5) *
			-maxX;
		var deltaY = (mouse.y - (window.innerHeight * .5)) / (window.innerHeight * .5) *
			-maxY;
		var x = stars[i].x + deltaX * stars[i].depth;
		var y = stars[i].y + deltaY * stars[i].depth;
		var distance = pointDistance({
			x: x,
			y: y
		}, {
			x: mouse.x * window.devicePixelRatio,
			y: mouse.y * window.devicePixelRatio
		});
		var ratio = distance / diagonale;
		var delta = pointDelta({
			x: x,
			y: y
		}, {
			x: mouse.x * window.devicePixelRatio,
			y: mouse.y * window.devicePixelRatio
		});
		delta.x = delta.x * ratio;
		delta.y = delta.y * ratio;
		stars[i].moveBy = delta;
	}
	moveTo = true;
	moveToState = .0001;
};
var removeMoveTo = function() {
	moveTo = false;
	moveOut = moveToState;
};
var moveOut = 1;
var drawStars = function() {
	//mouse.moved = false;

	var now = new Date().getTime();


	ctx.clearRect(0, 0, window.innerWidth * window.devicePixelRatio, window.innerHeight *
		window.devicePixelRatio);
	if (op < 1) {
		op = op + .01;
	}


	ctx.globalAlpha = op;
	var maxX = window.innerWidth * window.devicePixelRatio * .05;
	var maxY = window.innerHeight * window.devicePixelRatio * .05;
	var deltaX = (mouse.x - (window.innerWidth * .5)) / (window.innerWidth * .5) *
		-maxX;
	var deltaY = (mouse.y - (window.innerHeight * .5)) / (window.innerHeight * .5) *
		-maxY;
	for (i = 0; i < stars.length; i++) {
		var x = stars[i].x + deltaX * stars[i].depth;
		var y = stars[i].y + deltaY * stars[i].depth;

		if(now > stars[i].lifetime){
			if(stars[i].opac > 0){
				stars[i].opac = stars[i].opac - .01;
			}
			else{
				//stars[i].x = (-(window.innerWidth * window.devicePixelRatio) * .1) + Math.random() * ((window.innerWidth * window.devicePixelRatio) * 1.2);
				//stars[i].y = (-(window.innerHeight * window.devicePixelRatio) * .1) + Math.random() * ((window.innerHeight * window.devicePixelRatio) * 1.2);
				stars[i].radius = .1 + Math.random() * 2.5;
				stars[i].depth = .1 + Math.random() * 2;
				stars[i].lifetime = now+2000+(Math.random()*6000);

			}
		}
		else if(stars[i].opac < 1){
			stars[i].opac = stars[i].opac + .02;
		}

		if(stars[i].opac < 0){stars[i].opac = 0;}

		ctx.fillStyle = 'rgba(255,255,255,'+stars[i].opac+')';

		if (moveToState > 0) {
			if (moveTo) {
				x = x + easeOutCirc(moveToState, 0, stars[i].moveBy.x, 1);
				y = y + easeOutCirc(moveToState, 0, stars[i].moveBy.y, 1);
			} else {
				x = x + easeInCirc(moveToState, 0, stars[i].moveBy.x, moveOut);
				y = y + easeInCirc(moveToState, 0, stars[i].moveBy.y, moveOut);
			}
			if (moveTo && moveToState < 1) {
				moveToState = moveToState + moveSpeed;
			} else if (moveToState > 0) {
				moveToState = moveToState - moveSpeed;
			}

		}
		ctx.beginPath();
		ctx.arc(x, y, stars[i].radius, 0, 2 * Math.PI, false);
		ctx.fill();
	}




	mouse.moved = false;
};
var mouseMove = function(e) {
	mouseDetected = true;

	realMouse = {
		x: e.clientX,
		y: e.clientY,
		moved: true
	};

};
var draw = function() {
	window.requestAnimationFrame(draw);
	/*if (!mouse.moved && moveToState == 0 && op >= 1) {
		return;
	}*/

	if(realMouse.x != mouse.x || realMouse.y != mouse.y){
		mouse = {
			x: realMouse.x*.05+(mouse.x*.95),
			y: realMouse.y*.05+(mouse.y*.95),
			moved: true
		};
	}

	drawStars();
};
var start = function() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	window.addEventListener('resize', resize);
	window.addEventListener('mousemove', mouseMove);
	resize();
	draw();
	if(!iOS){
		var links = document.getElementsByTagName("a");
		for (i = 0; i < links.length; i++) {
			links[i].addEventListener('mouseover', function(){
				mouseoverTimeout = setTimeout(setMoveTo,250);
			});
			links[i].addEventListener('mouseout', function(){
				clearTimeout(mouseoverTimeout);
				removeMoveTo();
			});
		}
	}


	window.ondevicemotion = function(e) {
		if(mouseDetected){ return;}

	   		previousVal = mouse;

	      mouse = {
	      	x: (e.accelerationIncludingGravity.x * 90)*.05 + (previousVal.x*.95),
	      	y: (e.accelerationIncludingGravity.y * 90)*.05 + (previousVal.y*.95),
	      	moved: true
	      };


	}


};

var previousVal = mouse;
var realMouse = mouse;
window.addEventListener('load', start);




var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-15955779-2']);
_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') +
		'stats.g.doubleclick.net/dc.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();
