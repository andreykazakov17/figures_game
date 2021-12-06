// Определяем базовый класс квадратика

class Rect {
	constructor() {
		this.x = Math.floor(Math.random() * 640);
		this.y = 0;
		this.speed = Math.floor(Math.random() * (4-1) + 1);
		this.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
		this.width = 20;
		this.height = 20;
		this.isActive = true;
	}

	draw(ctx) {
		this.y += this.speed; 
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}


// Создание массива, инициализация переменных и получение элементов страницы

let rectArr = [];

let rand = Math.round(Math.random() * (6000 - 500)) + 500;
let timerID;

let startBtn = document.querySelector(".start");
let stopBtn = document.querySelector(".stop");
let canvasElem = document.getElementById("canvas");
let scoreSpan = document.getElementById("score");
let scoreCounter = 0;


// Обработчики событий

function startHandler() {
	
	scoreCounter = 0;
	scoreSpan.innerHTML = `${scoreCounter}`;

	timerID = setInterval(function() {
		let rect = new Rect();
		rectArr.push(rect);
	}, rand);
}

function stopHandler() {
	clearInterval(timerID, 1000);
	timerID = null;

	for(let obj of rectArr) {
		obj.isActive = false;
	}
}

startBtn.addEventListener("click", startHandler);
stopBtn.addEventListener("click", stopHandler);

// Обработка кликов по квадратикам

function getMousePos(canvas, evt) {
	let rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

canvasElem.addEventListener("click", (event) => {

	let pos = getMousePos(canvasElem, event);

	for(let obj of rectArr) {
		if(pos.x >= obj.x && pos.x <= (obj.x + obj.width) && pos.y >= obj.y && pos.y <= (obj.y + obj.height)) {
			obj.isActive = false;
			scoreCounter += 1;
			scoreSpan.innerHTML = `${scoreCounter}`;
		}
	}
});


// Прорисовка анимации

function animate() {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");

	ctx.clearRect(0,0, canvas.width, canvas.height);

	let filterArr = rectArr.filter((obj) => obj.isActive ===true && obj.y < canvasElem.height);


	for(let figure of filterArr) {

		if(figure.isActive === true) {
			figure.draw(ctx);
		}
		
	}
	console.log(filterArr);

	requestAnimationFrame(animate);
}

document.body.onload = animate;