t=True
while t==True:
    n=int(input ())
    q=True
    while q==True:
        p=2
        h=True
        while h==True:
            if n%p==0:
                if n/p==1:
                    print(str(n))
                    q=False
                    h=False
                else:
                    n=n/p
                    h=False
            else:
                p=p+1
    
