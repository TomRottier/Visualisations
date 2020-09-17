import matplotlib.pyplot as plt
import numpy as np

c_range = np.linspace(-2, 0.25, 360)
x0 = 0
niter = 200
Y = []
C = []

def fn(x,c):
    return x**2 + c

for c in c_range:
    x = x0
    for i in range(niter):
        x = fn(x,c)
        if i > 100:
            C.append(c)
            Y.append(x)


plt.plot(C,Y, 'k.', ms=0.5)
plt.show()