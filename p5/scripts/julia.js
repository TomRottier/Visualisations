var c1 = -1.0;
var c2 = 0.0;
const niter = 50;
var range = 4;
var x0 = -1;
var x1= 1;
var y0 = -1;
var y1 = 1;

var c = [c1, c2];
var p 

function setup() {
    pixelDensity(1);
    createCanvas(800,800);
    background(255);
    drawJulia(c1, c2, x0, x1, y0, y1);
    p = createP('test'); 
}
 

function draw() {
    // background(255)
    // drawJulia(c1,c2, -2, 2);
    // // c1 = map(mouseX, 0, width, -1, 1);
    // // c2 = map(mouseY, 0, height, -1, 1); 
    // ellipse(mouseX, mouseY, 100, 100)
    p.html(map(mouseX, 0, width, x0, x1))

}

function mousePressed() { 
    // Draws Julia set across new range of values determined from mouse location
    // at half the scale
    range = range / 2;
    var xnew = map(mouseX, 0, width, x0, x1);
    var ynew = map(mouseY, 0, height, y0, y1);
    x0 = xnew - range/2;
    x1 = xnew + range/2;
    y0 = ynew + range/2;
    y1 = ynew + range/2;
    background(255);
    drawJulia(c1, c2, x0, x1, y0, y1);
    print(xnew, ynew)
    print(x0,x1,x0,y1) 
}

function drawJulia(c1, c2, x0, x1, y0, y1) {
    // Draws Julia set for given imaginary number C on the imaginary domain x0,x1
    //  y0,y1
    var c = [c1, c2];
    loadPixels();
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            var x = map(i, 0, width, x0 , x1);
            var y = map(j, 0, height, y0, y1)
            var z0 = [x, y];
            var prnt = julia(z0, c, niter);
            if (prnt == 1) {
                // set(i, j, 0) 
                var idx = (i+j*width)*4.0;
                pixels[idx]   = 0;
                pixels[idx+1] = 0;
                pixels[idx+2] = 0;
                pixels[idx+3] = 255;
            }
        }
    }
    updatePixels();

}
function julia(z0, c, niter) {
    for (i = 0; i < niter; i++) {
        z1 = func(z0, c);
        var mag = z1[0]*z1[0] + z1[1]*z1[1];
        if (mag > 4.0) {
            return 0
        }
        z0 = z1;
    }
    return 1
}

function func(z, c) {
    // Returns complex number = z^2 + c
    var zx = z[0]*z[0] - z[1]*z[1] + c[0];
    var zy = 2.0*z[0]*z[1] + c[1];
    return [zx, zy]
}
