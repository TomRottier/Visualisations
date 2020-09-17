import numpy as np
import matplotlib.pyplot as plt

c1 = -2.0
c2 = 0.0

x0 = 0.4
y0 = 0.001

niter = 100

c = (c1,c2)
z0 = (x0,y0)
zx,zy = [],[]

def cmplxSum(z,y):
# Calculate sum of two complex numbers using the formula:
    return z[0]+y[0], z[1]+y[1]

def cmplxSqr(z):
# Squares a complex number using the formula:
#        x**2 - y**2 +2*x*y
# where x and y correspond to the real and imaginary parts, respectively
    x = z[0]
    y = z[1]
    return x**2-y**2, 2*x*y

def fun(z,c):
    return cmplxSum(cmplxSqr(z), c)
    # return z[0]**2 - z[1]**2 + c[0], 2.0*z[0]*z[1] + c[1]

for i in range(niter):
    print(z0[0], z0[1])
    zx.append(z0[0])
    zy.append(z0[1])
    z1 = fun(z0,c)
    if np.sqrt(z1[0]**2 + z1[1]**2) > 10.0:
        break
    z0 = z1

plt.plot(zx,zy, 'k.', ms=1.0)
plt.show()
