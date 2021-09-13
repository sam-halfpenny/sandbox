a=3
i=0
k=int(input())
while a<k:
    f=True
    x=2
    while f==True:
        if x==a:
            i=i+a
            f=False
        elif a%x!=0:
            x=x+1
        else:
            f=False
    a=a+2
print(i+2)
