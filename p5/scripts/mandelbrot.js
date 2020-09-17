const niter = 30;
let cx,cy;
const xmin = -1.5, ymin = -1.5;
const xmax = 1.5, ymax = 1.5;
const canvW = canvH = 500; 

let canvas1 = function(p) {

    p.setup = function() {
        p.createCanvas(canvW,canvH);
        p.pixelDensity(1);
        p.background(255);
        p.drawMandelbrot(p.width, p.height);
    };

    p.draw = function() {
        cx = p.map(p.mouseX, 0, p.width, xmin, xmax);
        cy = p.map(p.mouseY, 0, p.height, ymin,ymax);
    }

    p.drawMandelbrot = function(imgx, imgy) {

        p.loadPixels();
        for (let i = 0; i < imgx; i++) {
            let c1 = p.map(i, 0, imgx, xmin, xmax);
            for (let j = 0; j < imgy; j++) {
                let c2 = p.map(j, 0, imgy, ymin, ymax);
                let prnt = p.mandelbrot([c1,c2], niter);
                // if (prnt[0] == 1) {
                    let idx = (i+j*imgx)*4.0;
                    let col = p.map(prnt[1], 0, niter, 255, 0);
                    p.pixels[idx]   = col;
                    p.pixels[idx+1] = col;
                    p.pixels[idx+2] = col;
                    p.pixels[idx+3] = 255;
    
                // }
            }
        }
        p.updatePixels();
    }
    
    p.mandelbrot = function(c, niter) {
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
    
        
    
};

let canvas2 = function(p) {

    p.setup = function() {
        canv = p.createCanvas(canvW,canvH);
        p.pixelDensity(1);
        canv.position(canvas1.width,0);
        p.background(255);
    };

    p.draw = function() {
        p.background(255);
        p.drawJulia(p.width,p.height);
    };

    p.drawJulia = function(imgx, imgy) {
        // let cx = p.map(mouseX, 0, imgx, -2 , 2);
        // let cy = p.map(mouseY, 0, imgy, -2, 2);
        // print(cx,cy);
    
    
        p.loadPixels();
        for (let i = 0; i < imgx; i++) {
            let x0 = p.map(i, 0, imgx, xmin, xmax);
            for (let j = 0; j < imgy; j++) {
                let y0 = p.map(j, 0, imgy, ymin, ymax);
                let prnt = p.julia([x0,y0], [cx,cy], niter);
                // if (prnt[0] == 1) {
                    let idx = (i+j*imgx)*4.0;
                    let col = p.map(prnt[1], 0, niter, 255, 0);
                    p.pixels[idx]   = col;
                    p.pixels[idx+1] = col;
                    p.pixels[idx+2] = col;
                    p.pixels[idx+3] = 255;
    
                // }
            }
        }
        p.updatePixels();
    };
    
    p.julia = function(z, c, niter) {
        let x0 = z[0];
        let y0 = z[1];
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
    };
        

    
};

let mandel = new p5(canvas1);
let julia = new p5(canvas2);





