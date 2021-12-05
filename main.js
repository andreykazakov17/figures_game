// Определяем базовые классы

class Rect {
	constructor() {
		this.x = Math.floor(Math.random() * 640);
		this.y = 0;
		this.speed = Math.floor(Math.random() * (4-1) + 1);
		this.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
		this.width = 20;
		this.height = 20;
	}

	draw(ctx) {
		this.y += this.speed; 
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

// class Canvas {
// 	constructor(id) {
// 		this.canvas = document.getElementById(id);
		
// 	}

// 	add(...figures) {

// 		let ctx = this.canvas.getContext("2d");
// 		ctx.globalAlpha = 0.5;

// 		for(let figure of figures) {
// 			figure.draw(ctx);
// 		}
// 	}
// }


let rectArr = [];

// function updateArr() {
// 	let rect = new Rect();
// 	rectArr.push(rect);
// 	//console.log(rectArr);
// 	//return rectArr;
// }

//-- генерация рандомного числа фукцией

// function randomTime(min, max) {
// 	return (max-min)*Math.random() + min;
// }

//--


let rand = Math.round(Math.random() * (6000 - 500)) + 500;
//let timerID = setInterval(updateArr, rand);
let timerID;

let startBtn = document.querySelector(".start");
let stopBtn = document.querySelector(".stop");
let canvasElem = document.getElementById("canvas");

// function startHandler() {
// 	timerID = setTimeout(function() {
// 		updateArr();
// 		startHandler();
// 	}, rand);
// }

function startHandler() {
	
	timerID = setInterval(function() {
		let rect = new Rect();
		rectArr.push(rect);
		
		//startHandler();
	}, rand);
}

function stopHandler() {
	clearInterval(timerID, 1000);
	timerID = null;
}

startBtn.addEventListener("click", startHandler);
stopBtn.addEventListener("click", stopHandler);


// function callDraw() {
// 	rectArr.forEach(obj => {
// 		obj.draw();
// 	});
// }
// callDraw();


//-- IIFE 

// (function loop() {
// 	let rand = Math.round(Math.random() * (6000 - 500)) + 500;
// 	setTimeout(function() {
// 		updateArr();
// 		loop();  
// 	}, rand);
// }());

//--


// function draw() {
// 	ctx.clearRect(0,0, canvas.width, canvas.height);
// 	ball.draw();
// 	ball.x += ball.vx;
// 	ball.y += ball.vy;
// 	raf = window.requestAnimationFrame(draw);
// }

canvasElem.addEventListener("click", (event) => {

	let eventX = event.offsetX;
	let eventY = event.offsetY;

	for(let obj of rectArr) {
		if((obj.x < eventX < obj.x + obj.width) && (obj.y < eventY < obj.y + obj.height)) {
			for(let value of rectArr) {
				rectArr.splice(rectArr.indexOf(value), 1);
			}
		}
	}
});

function animate() {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");

	ctx.clearRect(0,0, canvas.width, canvas.height);
	// тут может находиться ваш код


	let filterArr = rectArr.filter((obj) => {
		if(obj.y > canvasElem.height) {
			rectArr.splice(rectArr.indexOf(obj), 1);
		}
	});
	console.log(filterArr);




	if(rectArr.length !== 0) {
		for(let figure of rectArr) {
			figure.draw(ctx);
			//figure.y = figure.y + figure.speed;
			// canvasElem.addEventListener("click", (event) => {

			// 	let eventX = event.offsetX;
			// 	let eventY = event.offsetY;
			
			// 	if((figure.x < eventX < figure.x + figure.width) && (figure.y < eventY < figure.y + figure.height)) {
			// 		rectArr.splice(rectArr.indexOf(figure), 1);
			// 	}
			// });
		}
		console.log(rectArr);
	}

	
	// for(let figure of rectArr) {
	// 	figure.draw(ctx);
	// 	//console.log(figure);
		
	// }
	// console.log(rectArr);

	requestAnimationFrame(animate);
}

// тут может находиться ваш код

document.body.onload = animate;