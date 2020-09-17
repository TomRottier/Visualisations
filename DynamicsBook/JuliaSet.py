from PIL import Image
import random as rnd

c1 = 0.360284
c2 = 0.100376
imx,imy = 500,500
xup,xlw = 1.5,-1.5
yup,ylw = -1.5,1.5
niter = 50
R = 4.0

c = (c1,c2)

im = Image.new('RGB', (imx,imy), color='white')

def fun(z,c):
# Calculates z**2 + c where z and c are complex numbers (2 element arrays)
    return z[0]**2 - z[1]**2 + c[0], 2.0*z[0]*z[1] + c[1]

# def colFun(x):
    # x0 = 0
    # x1 = R
    # y0 = 0
    # y1 = 255
    # out = (x-x0) / (x1-x0) * (y1-y0) + y0
    # return int(out), int(out), int(out)
def colFun(iters, niters):    
    x0 = 1
    x1 = niters
    y0 = 0
    y1 = 255
    out = (iters-x0) / (x1-x0) * (y1-y0) + y0
    return int(out), int(out), int(out)


for m in range(imx):
    x0 = m*(xup - xlw)/imx + xlw
    for n in range(imy):
        y0 = n*(yup - ylw)/imy + ylw
        z0 = (x0,y0)
        mag = x0**2 + y0**2
        iters = 0

        while mag < R and iters < niter:
            z1 = fun(z0,c)
            mag = z1[0]**2 + z1[1]**2
            z0 = z1
            iters += 1

        # if iters == niter:
        col = colFun(iters,niter)
            # col = (0,0,0)
            # col = (col,col,col)
        im.putpixel((m,n), col)



im.show()
            