var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDis = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode");




init();

function init() {
	setModeBtns();
	setSquares();
	reset();
}

function setModeBtns() {
	for(i = 0; i < modeBtns.length; i++) {
		modeBtns[i].addEventListener("click", function() {
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			this.classList.add("selected");
			//turnary operator
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			// if(this.textContent === "Easy") {
			// 	numSquares = 3;
			// } else {
			// 	numSquares = 6;
			// }
			reset();
		});
	}
}

function setSquares() {
	for (i = 0; i < squares.length; i++) {
	//add click listeners to squares
		squares[i].addEventListener("click", function(){
		//grab color of clicked square
			var clickedColor = this.style.background;
		//compare color to picked color
			if(clickedColor === pickedColor) {
				messageDis.textContent = "Correct!"
				resetBtn.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			} else {
				this.style.background = "#232323";
				messageDis.textContent = "Try Again"
			}
		});
	}
}


function reset() {
	resetBtn.textContent = "New Colors";
	messageDis.textContent = "";
	//generate new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change color display to match picked color
	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for(i=0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}


resetBtn.addEventListener("click", function() {
	reset();
})


function changeColors(color) {
	//loop through all squares
	for (i = 0; i < squares.length; i++) {
			//change each color to match given color
			squares[i].style.background = color;
	}

}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}


function generateRandomColors(num) {
	//make an array
	var arr = []
	//repeat num times
	for(i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	//return array
	return arr;
}

function randomColor() {
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 - 255
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";

}



// easyBtn.addEventListener("click", function() {
// 	hardBtn.classList.remove("selected");
// 	easyBtn.classList.add("selected");
// 	numSquares = 3;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for(i=0; i < squares.length; i++) {
// 		if(colors[i]) {
// 			squares[i].style.background = colors[i];
// 		} else {
// 			squares[i].style.display = "none";
// 		}
// 	}
// })

// hardBtn.addEventListener("click", function() {
// 	hardBtn.classList.add("selected");
// 	easyBtn.classList.remove("selected");
// 	numSquares = 6;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for(i=0; i < squares.length; i++) {
// 			squares[i].style.background = colors[i];
// 			squares[i].style.display = "block";
// 	}
// })