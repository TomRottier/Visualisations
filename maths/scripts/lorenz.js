let x = 3.1;
let y = 0.1;
let z = 0.1;

let dx, dy, dz;
const sig = 10, rho = 28, bet = 8.0 / 3.0;
const dt = 0.01;

function setup() {
    const h = windowHeight - 100;
    createCanvas(h, h, WEBGL);
    pixelDensity(1);
    background(255);
    translate(x, y, z);
    camera(0, 0, (height) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
    rotateY(PI / 4);
}

function draw() {
    // Update derivatives
    derivative(x, y, z);

    // Integrate;
    x += dx * dt;
    y += dy * dt;
    z += dz * dt;

    // Plot
    // scale(5);
    translate(dx, dy, dz)
    sphere(1);
    // console.log(x,y,z);

}

function derivative(x, y, z) {
    dx = sig * (y - x);
    dy = x * (rho - z) - y;
    dz = x * y - bet * z;
}