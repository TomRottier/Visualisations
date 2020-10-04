let m = 0, n = 0;
let x,y,q;
const rad = 1;
const x0 = -2.182, x1 = 2.6558;
const y0 = 0; y1 = 9.9983;

let f1 = {a:  0.00, b:  0.00, c:  0.00, d:  0.16, e:  0.00, f:  0.00};
let f2 = {a:  0.85, b:  0.04, c: -0.04, d:  0.85, e:  0.00, f:  1.60};
let f3 = {a:  0.20, b: -0.26, c:  0.23, d:  0.22, e:  0.00, f:  1.60};
let f4 = {a: -0.15, b:  0.28, c:  0.26, d:  0.24, e:  0.00, f:  0.44};

function setup() {
    createCanvas(800,800);
    background(255);
    // stroke(0,255,0);
}

function draw() {
    for (let i = 0; i < 100; i++) {
        q = random();

        if (q < 0.01) {
            [m,n] = transform(m,n,f1);

        } else if (q < 0.86) {
            [m,n] = transform(m,n,f2);

        } else if (q < 0.92) {
            [m,n] = transform(m,n,f3);

        } else {
            [m,n] = transform(m,n,f4);

        }
        x = map2(m,x0,x1,0,width);
        y = map2(n,y0,y1,height,0);
        ellipse(x,y,rad);
    }
}

function transform(x0,y0,fn){
    let a = fn.a;
    let b = fn.b;
    let c = fn.c;
    let d = fn.d;
    let e = fn.e;
    let f = fn.f;

    let x1 = x0*a + y0*b + e;
    let y1 = x0*c + y0*d + f;

    return [x1, y1]
}

function map2 (x,x0,x1,y0,y1) {
    return y0 + ((y1-y0) / (x1-x0)) * (x-x0);
}
