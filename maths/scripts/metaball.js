let blobs = [];
const nblobs = 10;
// const factor = 100; // Controls width of bright bit

let bright_slider, blob_slider;
let bright_text, blob_text;

function setup() {
    createCanvas(640, 480);
    pixelDensity(1);
    background(255);
    bright_text = createP('Blob brightness');
    bright_slider = createSlider(100, 500, 300);
    blob_text = createP('Number of blobs');
    blob_slider = createSlider(1, 10, 5);

    createBlobs()
}

function draw() {
    loadPixels();
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let pixel = (x + y * width) * 4;
            // console.log(pixel);

            let sum = 0;
            blobs.forEach(blob => {
                sum += blob.brightness * blob.r / blob.dist(x, y);
            });

            pixels[pixel + 0] = sum;
            pixels[pixel + 1] = sum;
            pixels[pixel + 2] = sum;
            pixels[pixel + 3] = 255;
        }
    }
    updatePixels();

    blobs.forEach(blob => {
        blob.update();
        // blob.show();
        // blob.print();
    });

    // Event listeners
    blob_slider.input(createBlobs);
    bright_slider.input(changeBrightness);
}

function createBlobs() {
    blobs = [];
    for (let i = 0; i < blob_slider.value(); i++) {
        blobs[i] = new Blob(random(-30, 20), random(-30, 30), random(0, 50), random(20, 20), bright_slider.value());
        // blobs[i] = new Blob(0.1, 0.1, 3.1, 20);
    }

}

function changeBrightness() {
    blobs.forEach(blob => {
        blob.brightness = bright_slider.value();
    });
}

class Blob {

    constructor(_x, _y, _z, _r, _bright) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.r = _r;
        this.brightness = _bright;
        // this.velx = random(1, 5);
        // this.vely = random(1, 5);
        this.px = tr_map(this.x, -30, 30, 0, width);
        this.py = tr_map(this.y, -40, 40, 0, height);
    }

    update() {
        // this.x += this.velx;
        // this.y += this.vely;

        // if (this.x > width || this.x < 0) {
        //     this.velx *= -1;
        // }

        // if (this.y > height || this.y < 0) {
        //     this.vely *= -1;
        // }

        // Lorenz DE's
        const sig = 10, rho = 28, beta = 8.0 / 3.0;
        const dt = 0.01;

        const dx = sig * (this.y - this.x);
        const dy = this.x * (rho - this.z) - this.y;
        const dz = this.x * this.y - beta * this.z;

        // Integrate
        this.x += dx * dt / 2;
        this.y += dy * dt / 2;
        this.z += dz * dt / 2;

        // Scale to canvas size
        this.px = tr_map(this.x, -30, 20, 0, width);
        this.py = tr_map(this.y, -30, 30, 0, height);

    }

    dist(x, y) {
        return Math.sqrt(Math.pow(x - this.px, 2) + Math.pow(y - this.py, 2));
    }

    show() {
        ellipse(this.px, this.py, this.r, this.r)
    }

    print() {
        // print(this.px, this.py);
        print(this.x, this.y, this.z);
    }
}

