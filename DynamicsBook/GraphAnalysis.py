import matplotlib.pyplot as plt
import numpy as np

x0 = 0
c = -2
# L = 4
niter = 100
p = (1.0 + np.sqrt(1-4*c)) / 2.0
q = (1.0 - np.sqrt(1-4*c)) / 2.0
print(q,p)

def fn(x):
    return x**2 + c

x = np.linspace(-p, p, 100)
y1 = x
y2 = []
for i in x:
    y2.append(fn(i))

    
plt.close('all')
plt.figure(1)


# for 
plt.plot(x,y1, linestyle='--', color='k', zorder=1)
plt.plot(x,y2, linestyle='-', color='k', zorder=1)

x1 = x0
for _ in range(niter):
    x2 = fn(x1)
    plt.arrow(x1,x1,0,x2-x1, length_includes_head=True, head_width=0.01,facecolor='black',zorder=2)
    plt.arrow(x1,x2,x2-x1,0, length_includes_head=True, head_width=0.01,facecolor='black',zorder=2)
    x1=x2

plt.show()
