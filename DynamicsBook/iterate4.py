import numpy as np

x0 = 1.0
y0 = 1.0

niter = 100

def fun(x,y):
    x1 = x**2 - y**2
    y1 = 2*x*y
    return x1,y1

for i in range(niter):
    print(x0,y0)
    x1,y1 = fun(x0,y0)
    x0,y0 = x1,y1

