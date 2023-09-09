const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const MAX_RADIUS = 60;
//const MIN_RADIUS = 2;

var colorArray = [
    '#5585b5',
    '#53a8b6',
    '#79c2d0',
    '#bbe4e9',
    '#97cba9'
];

// Mouse object
let mouse = {
    x: undefined,
    y: undefined
};

// When we go over the circles
window.addEventListener('mousemove', function (event) {
    //get mouse position
    mouse.x = event.x;
    mouse.y = event.y;

});

// responsive canvas

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    init();
});

/* Class for creating many objects of the same "type". 
in this case to create various circles with different values */

class Circle {
    // every circle we declare has his own position and speed
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill()
    };

    update() {
        if(this.x + this.radius >= innerWidth || this.x - this.radius <= 0){
            this.dx = -this.dx;
        }
    
        if(this.y + this.radius >= innerHeight || this.y - this.radius <= 0){
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;
        
        // interativity, check how close is the mouse to the circle
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
           && mouse.y - this.y < 50 && mouse.y - this.y > -50
            ) {
                if(this.radius < MAX_RADIUS){
                    this.radius += 1;
                }
        }else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

// Array to hold 100 circles
var circleArr = [];

// every time we resize screen we generate the circles from 0
function init() {

    circleArr = [];

    for (let index = 0; index < 600; index++) {
        var radius = Math.random() * 3 + 1;
        // random values for position
        var x = Math.random() * (innerWidth - 100) + radius;
        var y = Math.random() * (innerHeight - 100) + radius;
        //random values for speed
        var dx = (Math.random() - 0.5) * 1;
        var dy = (Math.random() - 0.5) * 1;

        // create 100 circles and push into the array
        circleArr.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    // create loop
    requestAnimationFrame(animate);

    // clear canvas so circles move 
    ctx.clearRect(0, 0 , innerWidth, innerHeight);

    // draw in screen cirle array
    for (let index = 0; index < circleArr.length; index++) {
        circleArr[index].update();
    }
}

init();
animate();
