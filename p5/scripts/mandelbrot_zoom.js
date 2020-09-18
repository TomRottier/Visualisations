let x0 = -1.5, x1 = 1.5;
let y0 = -1.5, y1 = 1.5;
let niter_intial = 100;

let niter = niter_intial;
let range = x1 - x0;


function setup() {
    let h = windowHeight - 100;
    const canvas = createCanvas(h,h);
    canvas.parent('canvas');
    background(0)
    drawMandelbrot(x0, x1, y0, y1);
}

function windowResized() {
    let h = windowHeight - 100;
    resizeCanvas(h,h);
    drawMandelbrot(x0, x1, y0, y1);
 }

function mousePressed() {
    // Get coordinates of centre of zoom location    
    let xnew = map2(mouseX, 0, width, x0, x1);
    let ynew = map2(mouseY, 0, height, y0, y1);

    if (xnew > x1 || xnew < x0 || ynew > y1 || ynew < y0) {
        return 0;
    }


    if (mouseButton === LEFT){
        // Calculate new x0,x1,y0,y1 with half the range 
        range /= 2;
        x0 = xnew - range / 2;
        x1 = xnew + range / 2;
        y0 = ynew - range / 2;
        y1 = ynew + range / 2;
        // Increase niter if zooming in
        niter *= 1.1;
    } else if(mouseButton === RIGHT) {
        // Calculate new x0,x1,y0,y1 with double the range 
        range *= 2;
        x0 = xnew - range / 2;
        x1 = xnew + range / 2;
        y0 = ynew - range / 2;
        y1 = ynew + range / 2;
        // Decrease niter if zooming out
        niter *= 0.9;
        
    }

    print(x0, x1, range, niter);
    background(255);
    drawMandelbrot(x0, x1, y0, y1);


}

function keyPressed() {
    if (keyCode === 82) {
        x0 = -1.5, x1 = 1.5;
        y0 = -1.5, y1 = 1.5;
        range = x1 - x0;
        niter = niter_intial
        background(255);
        drawMandelbrot(x0, x1, y0, y1);
        print(x0, x1, range, niter);
    }

    if (keyCode === 78) {
        niter *= 1.5;
        background(255);
        drawMandelbrot(x0, x1, y0, y1);
        print(x0, x1, range, niter);

    }

    if (keyCode === 77) {
        niter *= 0.5;
        background(255);
        drawMandelbrot(x0, x1, y0, y1);
        print(x0, x1, range, niter);

    }

    if (keyCode === 66) {
        niter = niter_intial;
        background(255);
        drawMandelbrot(x0, x1, y0, y1);
        print(x0, x1, range, niter);

    }


}

drawMandelbrot = function(x0, x1, y0, y1) {

    loadPixels();
    for (let i = 0; i < width; i++) {
        let c1 = map2(i, 0, width, x0, x1);
        for (let j = 0; j < height; j++) {
            let c2 = map2(j, 0, height, y0, y1);
            let prnt = mandelbrot([c1,c2], niter);
            // if (prnt[0] == 1) {
                let idx = (i+j*width)*4.0;
                let col = map2(prnt[1], 1, niter, 255, 0);
                // let col = 0;
                pixels[idx]   = col;
                pixels[idx+1] = col;
                pixels[idx+2] = col;
                pixels[idx+3] = 255;

            // }
        }
    }
    updatePixels();
}

mandelbrot = function(c, niter) {
    let x0 = 0.0;
    let y0 = 0.0;
    let x1,y1;
    let n = 0;
    
    while (n < niter) {
        x1 = x0*x0 - y0*y0 + c[0];
        y1 = 2.0*x0*y0 + c[1];

        if ((x1*x1 + y1*y1) > 4.0) {
            return [0, n];
        }

        x0 = x1;
        y0 = y1;
        n++;
    }
    return [1, n];
}

map2 = function(x,x0,x1,y0,y1) {
    return y0 + ((y1-y0) / (x1-x0)) * (x-x0);
}
