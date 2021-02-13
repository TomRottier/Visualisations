let x = 3.1;
let y = 0.1;
let z = 0.1;

let dx, dy, dz;
let px, py;
const sig = 10, rho = 28, beta = 8.0 / 3.0;
const dt = 0.001;

function setup() {
    createCanvas(400, 400);
    pixelDensity(1);
}

function draw() {
    // translate(width / 2, height / 2);
    for (let i = 0; i < 100; i++) {
        px = map(x, -30, 20, 0, width);
        py = map(y, -30, 30, 0, height);
        point(px, py);
        update();

    }
    // update();
    print(x, y, z);
}

function update() {
    dx = sig * (y - x);
    dy = x * (rho - z) - y;
    dz = x * y - beta * z;

    x += dx * dt;
    y += dy * dt;
    z += dz * dt;

}