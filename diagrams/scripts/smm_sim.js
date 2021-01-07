let ground;
let model;

// Initial conditions
let x0 = 10;
let y0 = 120;
let vx0 = 20;
let vy0 = 0;


// Parameters
const k = 120;
const L0 = 100;
const angle = 75;
const m = 75;
const g = 9.81;

// Inputs
let ang_inp, stiffness_inp, start_button, reset_button;


function setup() {
    createCanvas(600, 400);
    background(255);
    noLoop();

    // Sliders
    ang_inp = createInput("Angle of attack:", 75);
    ang_inp.input(initalise);
    stiffness_inp = createInput('Spring stiffness:', 100);
    stiffness_inp.input(initalise);

    // Start button
    start_button = createButton('Start');
    start_button.mousePressed(() => loop());

    // Reset button
    reset_button = createButton('Reset');
    reset_button.mousePressed(reset)

    initalise();

}

function draw() {
    background(255);
    ground.draw();
    model.integrate(0.05);
    model.draw();


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
    // Ground
    const offset = 0.9;
    ground = height * offset;
    ground = new Ground(offset)
    ground.draw()

    // Model
    let pos = createVector(x0, ground.y - y0);
    let vel = createVector(vx0, vy0);
    model = new SpringMass(pos, vel, L0, radians(angle));

    // Draw
    background(255);
    ground.draw();
    model.draw();

}

function reset() {
    initalise()
    noLoop()
}

class SpringMass {

    constructor(pos, vel, L0, theta) {

        this.posX = pos.x;
        this.posY = pos.y;
        this.velX = vel.x;
        this.velY = vel.y;

        // End of spring
        this.L0 = L0;
        this.angle = theta;
        this.tipX = this.posX + this.L0 * cos(this.angle);
        this.tipY = this.posY + this.L0 * sin(this.angle);

        this.springLength = L0;
        this.force = 0.0;

        this.contact = false;   // Starts in the air

        // Spring
        this.spring = new Spring(this.posX, this.posY, this.tipX, this.tipY, 10, 5, 40, 20);

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
            this.contact = true;
        }

    }

    draw(radius = 10) {
        fill(0);
        ellipse(this.posX, this.posY, radius, radius);
        this.spring.updatePosition(this.posX, this.posY, this.tipX, this.tipY);
        this.spring.draw();
        line(this.posX, this.posY, this.tipX, this.tipY);
    }
}
