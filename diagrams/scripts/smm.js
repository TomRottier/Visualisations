let x = 50;
let y = 50;
let sign = 1;

function setup() {
    createCanvas(400, 400);
    background(255);
}

function draw() {
    background(255);
    // drawModel();
    ellipse(x, y, 20, 20)
    x += 0.001
    y += 1 * sign;

    if (y > height - 100) {
        sign *= -1;
    }

    if (y < 0) {
        sign *= -1;
    }
}

function drawModel() {
    // Ground
    const ground = new Ground(width, height);
    ground.draw();

    // Leg and point mass parameters
    const angle = radians(70);      // Relative to left horizontal
    const length = 200;             // Leg length
    const radius = 20;              // Point mass radius
    // Sliders
    // const angle = radians(ang_slider.value());
    // const length = len_slider.value();

    // Leg positions
    const xbase = width / 2;
    const ybase = ground.y - ground.offset;
    const xtop = xbase - length * cos(angle);
    const ytop = ybase - length * sin(angle);


    // Point mass
    fill(0);
    ellipse(xtop, ytop, radius, radius, 0);

    // Spring
    strokeWeight(2);
    const offsetT = 30, offsetB = 30;
    const spring = new Spring(xtop, ytop, xbase, ybase, 10, 5, offsetT, offsetB);
    spring.draw();

    // Leg
    strokeWeight(2);
    line(xtop, ytop, spring.x1, spring.y1);
    line(xbase, ybase, spring.x2, spring.y2);


    // Force vector
    spring_force = new Vector(xbase, ybase, 120, 3 * HALF_PI + angle);
    weight = new Vector(10, height / 2, 50, -PI);
    strokeWeight(3);
    spring_force.draw();
    weight.draw();

    // Base
    fill(255);
    strokeWeight(2)
    ellipse(xbase, ybase, 10, 10);
}