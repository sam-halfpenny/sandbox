a=2
i=0
z=int(input())
while i<z:
    f=True
    x=2
    while f==True:
        if x==a:
            print (a)
            i=i+1
            f=False
        elif a%x!=0:
            x=x+1
        else:
            f=False
    a=a+1
