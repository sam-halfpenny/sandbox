#!/usr/bin/python

#Sam's script
n=1
p=-1002
x=True
while x==True:
    f=n*5
    print(n*5)
    n=n+1
    p=p+f
    if f==1000:
        x=False
n=1
x=True
while x==True:
    f=n*3
    print(n*3)
    n=n+1
    p=f+p
    if f>1000:
        x=False
print (p)
