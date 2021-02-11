let blobs = [];
const nblobs = 5;
const factor = 600; // Controls width of bright bit

function setup() {
    createCanvas(600, 600);
    pixelDensity(1);
    background(255);

    class Blob {

        constructor(_x, _y, _r) {
            this.x = _x;
            this.y = _y;
            this.r = _r;
            this.velx = random(1, 5);
            this.vely = random(1, 5);
        }

        update() {
            this.x += this.velx;
            this.y += this.vely;

            if (this.x > width || this.x < 0) {
                this.velx *= -1;
            }

            if (this.y > height || this.y < 0) {
                this.vely *= -1;
            }

        }

        dist(x, y) {
            return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
        }

        show() {
            ellipse(this.x, this.y, this.r, this.r)
        }
    }

    for (let i = 0; i < nblobs; i++) {
        blobs[i] = new Blob(random(width), random(height), random(20, 20));
    }
}

function draw() {
    loadPixels();
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let pixel = (x + y * width) * 4;
            // console.log(pixel);

            let sum = 0;
            blobs.forEach(blob => {
                sum += factor * blob.r / blob.dist(x, y);
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
    });
}
