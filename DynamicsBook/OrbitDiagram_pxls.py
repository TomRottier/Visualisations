from PIL import Image
import numpy as np

x0 = 0.1
n = 2500
imx,imy = 800,800
a0,a1 = -2, 0.25
b0,b1 = 2, -2
niter = 200
c_range = np.linspace(a0, a1, n)
Y = []
C = []
im = Image.new('RGB', (imx+1,imy+1), color='white')


def fn(x,c):
    return x**2 + c

for c in c_range:
    x = x0
    for i in range(niter):
        x = fn(x,c)
        if i > 100:
            # C.append(c)
            # Y.append(x)
            ix = (c-a0)*(imx/(a1-a0))
            iy = (x-b0)*(imy/(b1-b0))
            im.putpixel((int(ix),int(iy)),0)

im.show()

