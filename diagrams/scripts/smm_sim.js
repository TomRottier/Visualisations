let ground;
let model;

// Parameters
let k = 1000;
let L0 = 1.0;
let angle = 70;
let m = 75;
let g = 9.81;

// Initial conditions
const x0 = 0.1;
const y0 = L0;
const vx0 = 5.0;
const vy0 = 0.0;

// Time step
const dt = 0.0001;
const printint = 100;

// Unit conversion
pixel_per_metre = 80;
g = g * pixel_per_metre


// Inputs
let ang_text, stiff_text
let ang_inp, stiffness_inp, start_button, reset_button;
let stepCounts;


function setup() {
    createCanvas(windowWidth - 10, 450);
    background(255);
    noLoop();
    // frameRate(30);

    // Sliders
    ang_text = createP('Angle of attack: ');
    ang_inp = createSlider(0, 90, 10, 5);
    ang_inp.input(initalise);
    stiff_text = createP('Spring stiffness: ')
    stiff_inp = createSlider(10000, 100000, 50000, 1000);
    stiff_inp.input(initalise);

    // Start button
    start_button = createButton('Start');
    start_button.mousePressed(() => loop());

    // Reset button
    reset_button = createButton('Reset');
    reset_button.mousePressed(reset)

    // Step counter
    stepCounts = createP('Steps: ');

    initalise();

}

function draw() {
    background(255);
    ground.draw();
    for (i = 0; i < printint; i++) model.integrate(dt);
    model.draw();
    print(model.energy);


    // Update steps
    let steps = 0
    if (model.steps != steps) {
        stepCounts.html(['Steps: '] + (str(model.steps)))
    }
    // Terminate if off screen
    if (model.posX > width || model.posY > height) {
        noLoop();
    }

    // Terminate if mass lower than ground
    if (model.posY > ground.y) {
        noLoop();
    }

    // Terminate if end lower than ground (significantly)
    if (model.tipY - 10 > ground.y) {
        noLoop();
    }

}

function initalise() {

    // SLider values
    angle = radians(90 - ang_inp.value());
    k = stiff_inp.value();
    ang_text.html(['Angle of attack: '] + str(ang_inp.value()))
    stiff_text.html(['Spring stiffness: '] + str(stiff_inp.value()))


    // Ground
    const offset = 0.9;
    ground = height * offset;
    ground = new Ground(offset)
    ground.draw()

    // Model
    let pos = createVector(x0 * pixel_per_metre, ground.y - (y0 * pixel_per_metre));
    let vel = createVector(vx0 * pixel_per_metre, vy0 * pixel_per_metre);
    model = new SpringMass(pos, vel, L0 * pixel_per_metre, angle, k, m);

    // Draw
    background(255);
    ground.draw();
    model.draw();

}

function reset() {
    stepCounts.html(['Steps: '])
    initalise()
    noLoop()
}

class SpringMass {

    constructor(pos, vel, L0, theta, k, m) {

        this.posX = pos.x;
        this.posY = pos.y;
        this.velX = vel.x;
        this.velY = vel.y;

        // End of spring
        this.L0 = L0;
        this.angle = theta;
        this.tipX = this.posX + this.L0 * cos(this.angle);
        this.tipY = this.posY + this.L0 * sin(this.angle);

        // Paramteres
        this.k = k;
        this.m = m;

        this.springLength = L0;
        this.force = 0.0;

        this.contact = false;   // Starts in the air

        // Spring
        this.spring = new Spring(this.posX, this.posY, this.tipX, this.tipY, 10, 5, 20, 40);

        // Step counter
        this.steps = 0;

        // Total energy
        this.energy = this.m * (ground.y - this.posY) * g +
            0.5 * this.m * (pow(this.velX, 2) + pow(this.velY, 2)) +
            0.5 * this.k * pow(this.springLength, 2);

    }

    eom() {

        this.springLength = sqrt(pow(this.posX - this.tipX, 2) + pow(-this.posY + this.tipY, 2));
        if (this.springLength > this.L0) this.contact = false;

        if (this.contact) {
            this.force = k * (this.L0 - this.springLength)
            this.accX = (this.force / m) * (this.posX - this.tipX) / this.springLength;
            this.accY = -(this.force / m) * (-this.posY + this.tipY) / this.springLength + g;
        } else {
            this.force = 0.0;
            this.accX = 0;
            this.accY = g;
        }
    }

    integrate(dt = 0.01) {

        this.eom();
        this.posX = this.posX + this.velX * dt;
        this.posY = this.posY + this.velY * dt;
        this.velX = this.velX + this.accX * dt;
        this.velY = this.velY + this.accY * dt;

        // Update end of spring when not in contact
        if (!this.contact) {
            this.tipX = this.posX + this.L0 * cos(this.angle);
            this.tipY = this.posY + this.L0 * sin(this.angle);
        }

        // Check if contact with ground
        if (this.tipY > ground.y) {
            if (!this.contact) this.steps++;
            this.contact = true;
        }

        // Update energy
        this.energy = this.m * (ground.y - this.posY) * g +
            0.5 * this.m * (pow(this.velX, 2) + pow(this.velY, 2)) +
            0.5 * this.k * pow((this.springLength - this.L0), 2);

    }

    draw(radius = 10) {
        fill(0);
        ellipse(this.posX, this.posY, radius, radius);
        this.spring.updatePosition(this.posX, this.posY, this.tipX, this.tipY);
        this.spring.draw();
        line(this.posX, this.posY, this.spring.x1, this.spring.y1);
        line(this.spring.x2, this.spring.y2, this.tipX, this.tipY);
    }
}
