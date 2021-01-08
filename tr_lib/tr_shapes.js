// Extra drawing objects built on p5.js library
// Mainly for free-body diagrams
// Contains:
//      - Ground: draws ground object at an offset from height
//      - Spring: draws spring between two points with specified width and number of coils
//      - Vector: draws vector (arrow) at a point with specified magnitude and direction
// 
// Tom Rottier 2020

class Ground {
    constructor(offset = 0.9) {
        // Offset from bottom of canvas
        this.offset = offset;
        this.y = height * offset;
    }
    draw(col = 0) {

        // Draw ground line
        stroke(col);
        strokeWeight(2);
        line(0, this.y, width, this.y);

        // Draw other lines
        strokeWeight(1);
        const lineDensity = 4;  // Number of pixels between lines
        let nlines = windowWidth / lineDensity;
        const lineL = 15;
        const angle = QUARTER_PI;
        for (let i = 0; i < nlines; i++) {
            let posx1 = map(i, 0, nlines - 3, 0, width);
            let posy1 = this.y;
            let posx2 = posx1 - lineL * cos(angle);
            let posy2 = this.y + lineL * sin(angle);
            line(posx1, posy1, posx2, posy2);
        }

    }
}

class Spring {
    constructor(x1, y1, x2, y2, width, Ncoils, offsetT, offsetB) {
        // x1,y1 start of spring, x2,y2 end of spring
        const theta = Math.atan2((y2 - y1), (x2 - x1));
        const offsetTx = offsetT * cos(theta);
        const offsetTy = offsetT * sin(theta);
        const offsetBx = offsetB * cos(theta);
        const offsetBy = offsetB * sin(theta);

        this.x1 = x1 + offsetTx;
        this.y1 = y1 + offsetTy;
        this.x2 = x2 - offsetBx;
        this.y2 = y2 - offsetBy;

        this.width = width;
        this.Ncoils = Ncoils;
        this.offsetT = offsetT;
        this.offsetB = offsetB;


    };

    updatePosition(x1, y1, x2, y2) {
        const theta = Math.atan2((y2 - y1), (x2 - x1));
        const offsetTx = this.offsetT * cos(theta);
        const offsetTy = this.offsetT * sin(theta);
        const offsetBx = this.offsetB * cos(theta);
        const offsetBy = this.offsetB * sin(theta);

        this.x1 = x1 + offsetTx;
        this.y1 = y1 + offsetTy;
        this.x2 = x2 - offsetBx;
        this.y2 = y2 - offsetBy;
    }

    draw(col = 0) {
        // Copied from https://stackoverflow.com/questions/35777581/drawing-a-zigzag-spring-in-java
        let inv = 0.25 / this.Ncoils;
        let dx = (this.x2 - this.x1) * inv,
            dy = (this.y2 - this.y1) * inv;

        // perpendicular direction
        let inv2 = this.width / sqrt(dx * dx + dy * dy);
        let px = dy * inv2,
            py = -dx * inv2;

        // loop
        stroke(col);
        let x = this.x1, y = this.y1;
        for (let i = 0; i < this.Ncoils; i++) {
            line(x, y, x + dx + px, y + dy + py);
            line(x + dx + px, y + dy + py, x + 3.0 * dx - px, y + 3.0 * dy - py);
            line(x + 3.0 * dx - px, y + 3.0 * dy - py, x + 4.0 * dx, y + 4.0 * dy);
            x += 4.0 * dx;
            y += 4.0 * dy;
        }

    }
}

class Vector {
    constructor(xbase, ybase, mag, angle) {
        this.x1 = xbase;
        this.y1 = ybase;
        this.x2 = xbase;
        this.y2 = ybase - mag;      // Initially draw vertically

        this.mag = mag;
        this.angle = angle;
    }

    draw(col = 0) {

        // Body
        // line(this.x1, this.y1, this.x2, this.y2);

        // Tip
        const theta = radians(60);
        const tipL = this.mag / 15;
        const dx = tipL * cos(theta);
        const dy = tipL * sin(theta);

        let tipLx = this.x2 - dx;
        let tipLy = this.y2 + dy;
        let tipRx = this.x2 + dx;
        let tipRy = this.y2 + dy;

        // line(this.x2, this.y2, tipLx, tipLy);
        // line(this.x2, this.y2, tipRx, tipRy);

        //  Rotate
        [this.x2, this.y2] = rotate(this.x1, this.y1, this.x2, this.y2, this.angle);
        [tipLx, tipLy] = rotate(this.x1, this.y1, tipLx, tipLy, this.angle);
        [tipRx, tipRy] = rotate(this.x1, this.y1, tipRx, tipRy, this.angle);

        stroke(col);
        line(this.x1, this.y1, this.x2, this.y2);
        // line(this.x2, this.y2, tipLx, tipLy);
        // line(this.x2, this.y2, tipRx, tipRy);
        beginShape();
        vertex(this.x2, this.y2);
        vertex(tipLx, tipLy);
        vertex(tipRx, tipRy);
        endShape(CLOSE);


        function rotate(_xbase, _ybase, _x, _y, theta) {
            // Local position
            const vx = _x - _xbase;
            const vy = _y - _ybase;

            // Rotate
            let x = vx * cos(theta) - vy * sin(theta);
            let y = vx * sin(theta) + vy * cos(theta);

            // Global position
            x = x + _xbase;
            y = y + _ybase;

            return [x, y]
        }

    }
}