# Fractal binary tree
import turtle
axiom = '0'
rules = {'1': '11', '0': '1[0]0', '[': '[', ']': ']'}

recursion = 9
distance = 1.1
angle = 45

tim = turtle.Turtle()
plot = turtle.Screen()
plot.setworldcoordinates(-250,0,250,500)
tim.left(90)
tim.speed(0)
tim.hideturtle()
tim.turtlesize(0.1)

def transform(axiom, rules):
    return ''.join(rules.get(c,c) for c in axiom)

def production(axiom,rule,iter):
    new = axiom
    for _ in range(iter):
        new = transform(new, rules)
    return new

def draw(turtle,instructions):
    statex = []
    statey = []
    stateh = []
    for cmd in instructions:
        if cmd == '1':
            turtle.forward(distance)
        elif cmd =='0':
            turtle.forward(distance)
            turtle.stamp()
        elif cmd =='[':
            statex.append(turtle.xcor())
            statey.append(turtle.ycor())
            stateh.append(turtle.heading())
            turtle.left(angle)
        elif cmd == ']':
            turtle.penup()
            turtle.setx(statex.pop())
            turtle.sety(statey.pop())
            turtle.setheading(stateh.pop())
            turtle.pendown()
            turtle.right(angle)

instructions = production(axiom,rules, recursion)
print(instructions)
draw(tim,instructions)
plot.exitonclick()